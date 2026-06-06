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
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true } // automatically adds createdAt + updatedAt
);

export default mongoose.model("Resource", resourceSchema);
