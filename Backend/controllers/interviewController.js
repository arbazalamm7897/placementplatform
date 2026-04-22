import pdfParse from "pdf-parse";
import InterviewSession from "../models/InterviewSession.js";
import generateInterviewQuestions from "../utils/generateInterviewQuestions.js";
import generateInterviewFeedback from "../utils/generateInterviewFeedback.js";
import generateAnswerFeedback from "../utils/generateAnswerFeedback.js";

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

    res.json({
      sessionId: session._id,
      totalQuestions: questions.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to start interview" });
  }
};

export const getNextQuestion = async (req, res) => {
  try {
    const session = await InterviewSession.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    if (session.currentIndex >= session.questions.length) {
      if (!session.feedback) {
        const finalFeedback = await generateInterviewFeedback(
          session.questions,
          session.answers
        );

        session.feedback = finalFeedback;
        session.score = finalFeedback.score;
        await session.save();
      }

      return res.json({ done: true });
    }

    res.json({
      question: session.questions[session.currentIndex],
      currentIndex: session.currentIndex,
      totalQuestions: session.questions.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch question" });
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { answer } = req.body;
    const session = await InterviewSession.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    if (!answer?.trim()) {
      return res.status(400).json({ error: "Answer is required" });
    }

    const currentQuestion = session.questions[session.currentIndex];

    if (!currentQuestion) {
      return res.status(400).json({ error: "Interview already completed" });
    }

    const answerFeedback = await generateAnswerFeedback(currentQuestion, answer);

    session.answers.push({
      question: currentQuestion,
      answer,
      feedback: answerFeedback,
    });

    session.currentIndex += 1;

    let finalFeedback = null;

    if (session.currentIndex >= session.questions.length) {
      finalFeedback = await generateInterviewFeedback(
        session.questions,
        session.answers
      );

      session.feedback = finalFeedback;
      session.score = finalFeedback.score;
    }

    await session.save();

    res.json({
      success: true,
      feedback: answerFeedback,
      nextQuestionIndex: session.currentIndex,
      totalQuestions: session.questions.length,
      done: session.currentIndex >= session.questions.length,
      finalFeedback,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit answer" });
  }
};
