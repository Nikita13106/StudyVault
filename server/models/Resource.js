import mongoose from "mongoose";

/**
 * Schema for a single uploaded resource.
 * We store the Cloudinary URL (not the file bytes) plus useful metadata.
 */
const resourceSchema = new mongoose.Schema(
  {
    fileUrl: { type: String, required: true }, // Secure Cloudinary URL
    publicId: { type: String, required: true }, // Cloudinary id (needed for future deletes)
    fileName: { type: String, required: true }, // Original file name
    fileType: { type: String }, // MIME type, e.g. "application/pdf"
    fileSize: { type: Number }, // Size in bytes
    description: { type: String, trim: true, default: null }, // User-provided description (optional)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    year: {
      type: String,
      required: true,
    },

    semester: {
      type: String,
      required: true,
    },

    branch: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },
    module: {
      type: [Number], // array of numbers
      default: [],
    },
    category: {
      type: String,
      enum: ["notes", "ppt", "qb", "other"],
      required: true,
    },

    qbYear: {
      type: String, // only if category = qb
    },

    otherCategory: {
      type: String, // only if category = other
    },
  },
  { timestamps: true }, // automatically adds createdAt + updatedAt
);

export default mongoose.model("Resource", resourceSchema);
