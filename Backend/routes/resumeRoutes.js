import express from "express";
import upload from "../middleware/upload.js";
import { analyzeResume } from "../controllers/resumeController.js";

const router = express.Router();
router.post("/analyze", upload.single("resume"), analyzeResume);
export default router;
