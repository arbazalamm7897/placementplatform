import express from "express";
import multer from "multer";
import { startInterview, getNextQuestion, submitAnswer } from "../controllers/interviewController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // store PDF in memory

// Start interview (upload resume & generate questions)
router.post("/start", upload.single("resume"), startInterview);

// Get next question
router.get("/question/:id", getNextQuestion);

// Submit answer
router.post("/answer/:id", submitAnswer);

export default router;
