import mongoose from "mongoose";

const interviewQuestionSchema = new mongoose.Schema({
  skill: String,           // Java, React, SQL, Behavioural
  question: String,
}, { timestamps: true });

export default mongoose.model("InterviewQuestion", interviewQuestionSchema);
