import express from "express";
import multer from "multer";
import InterviewSession from "../models/InterviewSession.js";
import {
  startInterview,
  getNextQuestion,
  submitAnswer,
} from "../controllers/interviewController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/start", upload.single("resume"), startInterview);
router.get("/question/:id", getNextQuestion);
router.post("/answer/:id", submitAnswer);

router.get("/feedback/:id", async (req, res) => {
  const session = await InterviewSession.findById(req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });

  res.json({
    feedback: session.feedback,
    score: session.score,
  });
});

export default router;
