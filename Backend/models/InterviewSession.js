import mongoose from "mongoose";

const interviewSessionSchema = new mongoose.Schema({
  userId: String,
  resumeText: String,
  answers: [
    {
      question: String,
      answer: String,
    }
  ],
}, { timestamps: true });

export default mongoose.model("InterviewSession", interviewSessionSchema);
