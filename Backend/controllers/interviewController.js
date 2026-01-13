import pdfParse from "pdf-parse";
import InterviewSession from "../models/InterviewSession.js";
import generateInterviewQuestions from "../utils/generateInterviewQuestions.js";

/**
 * START INTERVIEW
 */
export const startInterview = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Resume not uploaded" });
    }

    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    let questions = await generateInterviewQuestions(resumeText);

    console.log("✅ QUESTIONS GENERATED FROM AI:", questions);

    const session = await InterviewSession.create({
      userId: req.body.userId,
      resumeText,
      questions,
      currentIndex: 0, // 🔥 IMPORTANT
      answers: [],
    });

    res.json({ sessionId: session._id });
  } catch (err) {
    console.error("Start interview error:", err);
    res.status(500).json({ error: "Failed to start interview" });
  }
};

/**
 * GET NEXT QUESTION
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

    console.log("➡️ Sending question:", question);

    res.json({ question });
  } catch (err) {
    console.error("Get question error:", err);
    res.status(500).json({ error: "Failed to fetch question" });
  }
};

/**
 * SUBMIT ANSWER
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

    session.currentIndex += 1; // 🔥 IMPORTANT
    await session.save();

    res.json({ success: true });
  } catch (err) {
    console.error("Submit answer error:", err);
    res.status(500).json({ error: "Failed to submit answer" });
  }
};
