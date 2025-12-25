import pdfParse from "pdf-parse";
import InterviewSession from "../models/InterviewSession.js";
import generateInterviewQuestions from "../utils/generateInterviewQuestions.js";

/**
 * STEP 1: Upload Resume & Start Interview
 */
export const startInterview = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Resume not uploaded" });

    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    // Generate questions using AI or fallback
    let questions;
    try {
      questions = await generateInterviewQuestions(resumeText);
    } catch (err) {
      console.error("AI generation failed, using fallback questions:", err);
      questions = [
        "Tell me about yourself",
        "Explain one project from your resume",
        "What are your strengths?"
      ];
    }

    // Create interview session
    const session = await InterviewSession.create({
      userId: req.body.userId,
      resumeText,
      questions,
      answers: [],
      currentQuestionIndex: 0,
    });

    res.status(200).json({ success: true, sessionId: session._id });
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
    if (!session) return res.status(404).json({ error: "Session not found" });

    if (session.currentQuestionIndex >= session.questions.length)
      return res.json({ done: true });

    res.json({ question: session.questions[session.currentQuestionIndex] });
  } catch (err) {
    console.error(err);
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
    if (!session) return res.status(404).json({ error: "Session not found" });

    session.answers.push({
      question: session.questions[session.currentQuestionIndex],
      answer,
    });

    session.currentQuestionIndex += 1;
    await session.save();

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit answer" });
  }
};
