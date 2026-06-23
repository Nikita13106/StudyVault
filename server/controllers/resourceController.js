import cloudinary from "../config/cloudinary.js";
import Resource from "../models/Resource.js";
import mongoose from "mongoose";

/**
 * Helper: stream a file Buffer to Cloudinary and resolve with the result.
 * resource_type "auto" lets Cloudinary handle PDFs, images, docs, etc.
 */
const streamUpload = (buffer) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: "studyvault" },
      (error, result) => (result ? resolve(result) : reject(error)),
    );
    uploadStream.end(buffer);
  });

/**
 * POST /api/upload
 * Receives a file (via multer) + description, pushes the file to Cloudinary,
 * then saves the returned URL and metadata in MongoDB.
 */
export const uploadResource = async (req, res) => {
  try {
    console.log(req.body);
    const {
      description,
      year,
      semester,
      branch,
      subject,
      module,
      category,
      qbYear,
      otherCategory,
    } = req.body;

    // Validate inputs
    if (!req.file) {
      return res.status(400).json({ message: "No file provided." });
    }

    let moduleArray = [];

    if (module) {
      if (Array.isArray(module)) {
        moduleArray = module.map(Number);
      } else if (typeof module === "string") {
        moduleArray = module
          .split(",")
          .map((m) => Number(m.trim()))
          .filter((m) => !isNaN(m));
      }
    }

    // ✅ Validate required fields
    if (!year || !semester || !branch || !subject || !category || moduleArray.length === 0) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    // ✅ Extra validation for conditional fields
    if (category === "qb" && !qbYear) {
      return res.status(400).json({
        message: "QB year is required for Question Bank.",
      });
    }

    if (category === "other" && !otherCategory?.trim()) {
      return res.status(400).json({
        message: "Please specify the category.",
      });
    }

    // if (!req.body.description?.trim()) {
    //   return res.status(400).json({ message: "Description is required." });
    // }

    // 1. Upload the in-memory buffer to Cloudinary
    const result = await streamUpload(req.file.buffer);

    // 2. Persist the metadata in MongoDB
    const resource = await Resource.create({
      fileUrl: result.secure_url,
      publicId: result.public_id,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      description: description?.trim() || null,
      user: req.user.id,
      year,
      semester,
      branch,
      subject,
      module: moduleArray,
      category,
      qbYear: category === "qb" ? qbYear : null,
      otherCategory: category === "other" ? otherCategory : null,
    });

    const populated = await Resource.findById(resource._id).populate(
      "user",
      "name email",
    );

    // 3. Return the saved document so the frontend can render it instantly
    res.status(201).json(populated);
  } catch (error) {
    console.error("Upload error:", error.message);
    res.status(500).json({ message: "Upload failed. Please try again." });
  }
};

/**
 * GET /api/resources
 * Returns all resources, newest first.
 */
export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(resources);
  } catch (error) {
    console.error("Fetch error:", error.message);
    res.status(500).json({ message: "Could not fetch resources." });
  }
};

/**
 * DELETE /api/resource/:id
 * Deletes file from Cloudinary + MongoDB
 */

export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found." });
    }

    if (resource.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(resource.publicId);

    // Delete from MongoDB
    await Resource.findByIdAndDelete(id);

    res.status(200).json({ message: "Resource deleted successfully." });
  } catch (error) {
    console.error("FULL ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
