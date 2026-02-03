import pdfParse from "pdf-parse";
import InterviewSession from "../models/InterviewSession.js";
import generateInterviewQuestions from "../utils/generateInterviewQuestions.js";
import generateInterviewFeedback from "../utils/generateInterviewFeedback.js";

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

    const questions = await generateInterviewQuestions(resumeText);

    const session = await InterviewSession.create({
      userId: req.body.userId,
      resumeText,
      questions,
      currentIndex: 0,
      answers: [],
    });

    res.json({ sessionId: session._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to start interview" });
  }
};

/**
 * GET NEXT QUESTION
 */
export const getNextQuestion = async (req, res) => {
  try {
    const session = await InterviewSession.findById(req.params.id);
    if (!session) return res.status(404).json({ error: "Session not found" });

    // ✅ Interview finished
    if (session.currentIndex >= session.questions.length) {
      if (!session.feedback) {
        console.log("🧠 Generating AI feedback...");

        const { feedback, score } = await generateInterviewFeedback(
          session.questions,
          session.answers
        );

        session.feedback = feedback;
        session.score = score;
        await session.save();
      }

      return res.json({ done: true });
    }

    res.json({
      question: session.questions[session.currentIndex],
    });
  } catch (err) {
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

    session.currentIndex += 1;
    await session.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit answer" });
  }
};
