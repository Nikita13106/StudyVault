import multer from "multer";

/**
 * Multer middleware.
 * We keep the file in memory as a Buffer so it can be streamed straight
 * to Cloudinary without ever touching the local disk.
 */

// Store the uploaded file in memory (req.file.buffer)
const storage = multer.memoryStorage();

// --- Bonus: file type validation ---
// Only allow common document + image types.
const ALLOWED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/vnd.ms-powerpoint", // .ppt
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
  "text/plain", // .txt
];

const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    // Passing an Error rejects the upload; caught by the global error handler.
    cb(new Error("Unsupported file type. Allowed: PDF, images, Word, PPT, TXT."));
  }
};

// --- Bonus: file size limit (10 MB) ---
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

export default upload;
