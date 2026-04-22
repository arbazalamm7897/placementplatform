import mongoose from "mongoose";

const interviewSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    resumeText: {
      type: String,
      required: true,
    },

    questions: {
      type: [String],
      required: true,
    },

    currentIndex: {
      type: Number,
      default: 0,
    },

    answers: [
      {
        question: String,
        answer: String,
        feedback: {
          summary: String,
          strengths: [String],
          improvement: String,
          score: Number,
        },
      },
    ],

    feedback: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    score: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("InterviewSession", interviewSessionSchema);
