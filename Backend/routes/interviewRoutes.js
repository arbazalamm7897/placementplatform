import express from "express";
import multer from "multer";
import InterviewSession from "../models/InterviewSession.js";
import auth from "../middleware/auth.js";
import asyncHandler from "../utils/asyncHandler.js";
import { createError } from "../utils/appError.js";
import {
  startInterview,
  getNextQuestion,
  submitAnswer,
} from "../controllers/interviewController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(auth);

router.post("/start", upload.single("resume"), startInterview);
router.get("/question/:id", getNextQuestion);
router.post("/answer/:id", submitAnswer);

router.get("/feedback/:id", asyncHandler(async (req, res) => {
  const session = await InterviewSession.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!session) {
    throw createError("Interview session not found", 404, {
      code: "INTERVIEW_SESSION_NOT_FOUND",
    });
  }

  res.json({
    feedback: session.feedback,
    score: session.score,
  });
}));

export default router;
