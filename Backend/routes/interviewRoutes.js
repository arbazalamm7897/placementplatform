import express from "express";
import generateInterviewQuestions from "../seed/interviewQuestions.js"; // default export

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { resumeText } = req.body;
    const questions = await generateInterviewQuestions(resumeText);

    res.json({ success: true, questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Interview generation failed" });
  }
});

export default router;
