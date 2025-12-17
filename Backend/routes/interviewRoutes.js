import express from "express";
import multer from "multer";
import { uploadResumeAndStartInterview } from "../controllers/interviewController.js";

const router = express.Router();
const upload = multer();

router.post(
  "/upload-resume",
  upload.single("resume"),
  uploadResumeAndStartInterview
);

export default router;
