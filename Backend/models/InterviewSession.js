import mongoose from "mongoose";

const interviewSessionSchema = new mongoose.Schema(
  {
    userId: String,
    resumeText: String,
    questions: [String],
    currentIndex: {
      type: Number,
      default: 0,
    },
    answers: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("InterviewSession", interviewSessionSchema);
