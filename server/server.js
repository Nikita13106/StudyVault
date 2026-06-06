import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import resourceRoutes from "./routes/resources.js";

// Load environment variables before anything else uses them.
dotenv.config();
// Connect to MongoDB.
connectDB();

const app = express();

// --- Middleware ---
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

// --- Routes ---
app.use("/api", resourceRoutes);

// Simple health check.
app.get("/", (req, res) => res.send("StudyVault API is running 🚀"));

/**
 * Global error handler.
 * Catches file-size / file-type errors thrown by the upload middleware
 * and returns a clean JSON message instead of an HTML stack trace.
 */
app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res
      .status(400)
      .json({ message: "File too large. Max size is 10 MB." });
  }
  if (err.message?.includes("Unsupported file type")) {
    return res.status(400).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: "Something went wrong on the server." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
