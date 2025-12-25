import pdfParse from "pdf-parse";
import InterviewSession from "../models/InterviewSession.js";
import InterviewQuestion from "../models/InterviewQuestion.js";
import { extractSkills } from "../utils/extractSkills.js";

/**
 * STEP 1: Upload Resume & Start Interview
 */
export const uploadResumeAndStartInterview = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Resume not uploaded" });
    }

    const pdfData = await pdfParse(req.file.buffer);

    // Extract skills from resume
    const skills = extractSkills(pdfData.text);

    // Fetch skill-based questions
   let questions = await InterviewQuestion.find({
  skill: { $in: skills }
});

// fallback if no skill-based questions
if (questions.length === 0) {
  questions = await InterviewQuestion.find({ skill: "general" });
}

// absolute fallback (last safety)
if (questions.length === 0) {
  questions = [
    { question: "Tell me about yourself" },
    { question: "What are your strengths?" },
    { question: "Why should we hire you?" },
    { question: "Explain one project from your resume" }
  ];
}


    // Fallback questions (important)
    if (questions.length === 0) {
      questions = await InterviewQuestion.find({ skill: "general" });
    }

    // Create interview session
    const session = await InterviewSession.create({
      userId: req.body.userId,
      resumeText: pdfData.text,
      questions: questions.map(q => q.question),
      currentIndex: 0,
      answers: [],
    });

    res.status(200).json({
      sessionId: session._id,
      message: "Interview started",
    });

  } catch (err) {
    console.error("Start Interview Error:", err);
    res.status(500).json({ error: "Failed to start interview" });
  }
};

/**
 * STEP 2: Get Next Question
 */
export const getNextQuestion = async (req, res) => {
  try {
    const session = await InterviewSession.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    if (session.currentIndex >= session.questions.length) {
      return res.json({ done: true });
    }

    const question = session.questions[session.currentIndex];
    res.json({ question });

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch question" });
  }
};

/**
 * STEP 3: Submit Answer
 */
export const submitAnswer = async (req, res) => {
  try {
    const { answer } = req.body;
    const session = await InterviewSession.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    session.answers.push({
      question: session.questions[session.currentIndex],
      answer,
    });

    session.currentIndex += 1;
    await session.save();

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: "Failed to submit answer" });
  }
};
