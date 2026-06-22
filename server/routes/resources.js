import express from "express";
import upload from "../middleware/upload.js";
import {
  uploadResource,
  getResources,
  deleteResource,
} from "../controllers/resourceController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// "file" must match the FormData field name used by the frontend.
router.post("/upload", auth, upload.single("file"), uploadResource);

// Fetch the global feed of resources.
router.get("/resources", getResources);

router.delete("/resource/:id", auth, deleteResource);
export default router;
