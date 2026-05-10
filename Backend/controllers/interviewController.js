import pdfParse from "pdf-parse";
import InterviewSession from "../models/InterviewSession.js";
import generateInterviewQuestions from "../utils/generateInterviewQuestions.js";
import generateInterviewFeedback from "../utils/generateInterviewFeedback.js";
import generateAnswerFeedback from "../utils/generateAnswerFeedback.js";
import asyncHandler from "../utils/asyncHandler.js";
import { createError } from "../utils/appError.js";

const getOwnedSession = (sessionId, userId) =>
  InterviewSession.findOne({ _id: sessionId, userId });

export const startInterview = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw createError("Resume not uploaded", 400, {
      code: "RESUME_REQUIRED",
    });
  }

  const pdfData = await pdfParse(req.file.buffer);
  const resumeText = pdfData.text;
  const questions = await generateInterviewQuestions(resumeText);

  const session = await InterviewSession.create({
    userId: req.user.id,
    resumeText,
    questions,
    currentIndex: 0,
    answers: [],
  });

  res.json({
    sessionId: session._id,
    totalQuestions: questions.length,
  });
});

export const getNextQuestion = asyncHandler(async (req, res) => {
  const session = await getOwnedSession(req.params.id, req.user.id);

  if (!session) {
    throw createError("Interview session not found", 404, {
      code: "INTERVIEW_SESSION_NOT_FOUND",
    });
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
});

export const submitAnswer = asyncHandler(async (req, res) => {
  const { answer } = req.body;
  const session = await getOwnedSession(req.params.id, req.user.id);

  if (!session) {
    throw createError("Interview session not found", 404, {
      code: "INTERVIEW_SESSION_NOT_FOUND",
    });
  }

  if (!answer?.trim()) {
    throw createError("Answer is required", 400, {
      code: "ANSWER_REQUIRED",
    });
  }

  const currentQuestion = session.questions[session.currentIndex];

  if (!currentQuestion) {
    throw createError("Interview already completed", 400, {
      code: "INTERVIEW_COMPLETED",
    });
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
});
