import express from "express";
import multer from "multer";
import { startInterview, getNextQuestion, submitAnswer } from "../controllers/interviewController.js";

const router = express.Router();

// Use memory storage for uploaded resumes
const upload = multer({ storage: multer.memoryStorage() });

// Start interview (upload resume & generate questions)
router.post("/start", upload.single("resume"), startInterview);

// Get next question for a session
router.get("/question/:id", getNextQuestion);

// Submit answer for current question
router.post("/answer/:id", submitAnswer);

export default router;
