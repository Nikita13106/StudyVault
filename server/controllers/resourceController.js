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
    // Validate inputs
    if (!req.file) {
      return res.status(400).json({ message: "No file provided." });
    }
    if (!req.body.description?.trim()) {
      return res.status(400).json({ message: "Description is required." });
    }

    // 1. Upload the in-memory buffer to Cloudinary
    const result = await streamUpload(req.file.buffer);

    // 2. Persist the metadata in MongoDB
    const resource = await Resource.create({
      fileUrl: result.secure_url,
      publicId: result.public_id,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      description: req.body.description.trim(),
    });

    // 3. Return the saved document so the frontend can render it instantly
    res.status(201).json(resource);
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
    const resources = await Resource.find().sort({ createdAt: -1 });
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
