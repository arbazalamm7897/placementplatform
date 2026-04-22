import mongoose from "mongoose";

const resumeAnalysisSchema = new mongoose.Schema(
  {
    fileName: String,
    score: Number,
    feedbackCount: Number,
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const aptitudeAttemptSchema = new mongoose.Schema(
  {
    score: Number,
    totalQuestions: Number,
    weakestSections: [String],
    percentage: Number,
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const codingAttemptSchema = new mongoose.Schema(
  {
    track: String,
    problemId: String,
    title: String,
    difficulty: String,
    topic: String,
    passed: Boolean,
    passedCount: Number,
    totalCount: Number,
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const interviewAttemptSchema = new mongoose.Schema(
  {
    interviewId: String,
    score: Number,
    strongAreas: [String],
    weakAreas: [String],
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const userProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    resumeAnalyses: [resumeAnalysisSchema],
    aptitudeAttempts: [aptitudeAttemptSchema],
    codingAttempts: [codingAttemptSchema],
    interviewAttempts: [interviewAttemptSchema],
    streak: {
      current: { type: Number, default: 0 },
      lastDate: { type: String, default: null },
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserProgress", userProgressSchema);
