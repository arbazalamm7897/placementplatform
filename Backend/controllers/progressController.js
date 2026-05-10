import UserProgress from "../models/UserProgress.js";
import asyncHandler from "../utils/asyncHandler.js";
import { createError } from "../utils/appError.js";

const LIMIT = 80;

const createEmptyProgress = (userId) => ({
  userId,
  resumeAnalyses: [],
  aptitudeAttempts: [],
  codingAttempts: [],
  interviewAttempts: [],
  streak: {
    current: 0,
    lastDate: null,
  },
});

const toDayKey = (value = new Date()) => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const diffInDays = (left, right) => {
  const leftDate = new Date(left);
  const rightDate = new Date(right);
  leftDate.setHours(0, 0, 0, 0);
  rightDate.setHours(0, 0, 0, 0);
  return Math.round(
    (rightDate.getTime() - leftDate.getTime()) / (1000 * 60 * 60 * 24)
  );
};

const updateStreak = (progressDoc) => {
  const today = toDayKey();
  const lastDate = progressDoc.streak?.lastDate;

  if (!lastDate) {
    progressDoc.streak = { current: 1, lastDate: today };
    return;
  }

  const difference = diffInDays(lastDate, today);

  if (difference === 0) {
    progressDoc.streak.lastDate = today;
    return;
  }

  if (difference === 1) {
    progressDoc.streak.current += 1;
    progressDoc.streak.lastDate = today;
    return;
  }

  progressDoc.streak = { current: 1, lastDate: today };
};

const average = (items, selector) =>
  items.length
    ? Math.round(
        (items.reduce((sum, item) => sum + selector(item), 0) / items.length) * 10
      ) / 10
    : 0;

const buildSnapshot = (progressDoc) => {
  const progress = progressDoc?.toObject ? progressDoc.toObject() : progressDoc;
  const resumeAnalyses = progress.resumeAnalyses || [];
  const aptitudeAttempts = progress.aptitudeAttempts || [];
  const codingAttempts = progress.codingAttempts || [];
  const interviewAttempts = progress.interviewAttempts || [];

  const solvedDsaIds = new Set(
    codingAttempts
      .filter((item) => item.track === "DSA" && item.passed)
      .map((item) => item.problemId)
  );
  const solvedSqlIds = new Set(
    codingAttempts
      .filter((item) => item.track === "SQL" && item.passed)
      .map((item) => item.problemId)
  );

  const codingByDifficulty = ["Easy", "Medium", "Hard"].map((difficulty) => {
    const attempts = codingAttempts.filter((item) => item.difficulty === difficulty);
    return {
      difficulty,
      attempts: attempts.length,
      solved: attempts.filter((item) => item.passed).length,
    };
  });

  const activityMap = [
    ...resumeAnalyses,
    ...aptitudeAttempts,
    ...codingAttempts,
    ...interviewAttempts,
  ]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 12);

  const skillBreakdown = [
    {
      label: "Resume",
      count: resumeAnalyses.length,
      avgScore: average(resumeAnalyses, (item) => item.score || 0),
    },
    {
      label: "Aptitude",
      count: aptitudeAttempts.length,
      avgScore: average(aptitudeAttempts, (item) => item.percentage || 0),
    },
    {
      label: "Interview",
      count: interviewAttempts.length,
      avgScore: average(interviewAttempts, (item) => (item.score || 0) * 10),
    },
  ];

  return {
    totals: {
      resumeAnalyses: resumeAnalyses.length,
      aptitudeAttempts: aptitudeAttempts.length,
      codingAttempts: codingAttempts.length,
      interviewAttempts: interviewAttempts.length,
      solvedDsa: solvedDsaIds.size,
      solvedSql: solvedSqlIds.size,
      currentStreak: progress.streak?.current || 0,
    },
    averages: {
      resumeScore: average(resumeAnalyses, (item) => item.score || 0),
      aptitudePercent: average(aptitudeAttempts, (item) => item.percentage || 0),
      interviewScore: average(interviewAttempts, (item) => item.score || 0),
    },
    codingByDifficulty,
    skillBreakdown,
    recentActivity: activityMap,
    history: {
      resumeAnalyses,
      aptitudeAttempts,
      codingAttempts,
      interviewAttempts,
    },
  };
};

const buildAchievements = (snapshot) => {
  const { totals, averages } = snapshot;

  return [
    {
      title: "First Step",
      unlocked:
        totals.resumeAnalyses +
          totals.aptitudeAttempts +
          totals.codingAttempts +
          totals.interviewAttempts >
        0,
      description: "Complete your first tracked learning activity.",
    },
    {
      title: "Coding Starter",
      unlocked: totals.solvedDsa + totals.solvedSql >= 5,
      description: "Solve at least 5 coding or SQL questions.",
    },
    {
      title: "Resume Polisher",
      unlocked: totals.resumeAnalyses >= 3,
      description: "Run the resume analyzer 3 times.",
    },
    {
      title: "Interview Ready",
      unlocked: totals.interviewAttempts >= 2 && averages.interviewScore >= 7,
      description: "Complete 2 mock interviews with an average score of 7+.",
    },
    {
      title: "Consistency Streak",
      unlocked: totals.currentStreak >= 5,
      description: "Stay active for 5 days in a row.",
    },
  ];
};

const getOrCreateProgress = async (userId) => {
  let progress = await UserProgress.findOne({ userId });

  if (!progress) {
    progress = await UserProgress.create(createEmptyProgress(userId));
  }

  return progress;
};

export const getProgress = asyncHandler(async (req, res) => {
  const progress = await getOrCreateProgress(req.user.id);
  const snapshot = buildSnapshot(progress);
  const achievements = buildAchievements(snapshot);

  res.json({
    snapshot,
    achievements,
    streak: progress.streak,
  });
});

export const trackProgressEvent = asyncHandler(async (req, res) => {
  const { type, payload } = req.body;
  const progress = await getOrCreateProgress(req.user.id);

  if (!type || !payload || typeof payload !== "object") {
    throw createError("type and payload are required", 400, {
      code: "PROGRESS_PAYLOAD_REQUIRED",
    });
  }

  const entry = {
    ...payload,
    createdAt: new Date(),
  };

  switch (type) {
    case "resume":
      progress.resumeAnalyses.push(entry);
      progress.resumeAnalyses = progress.resumeAnalyses.slice(-LIMIT);
      break;
    case "aptitude":
      progress.aptitudeAttempts.push(entry);
      progress.aptitudeAttempts = progress.aptitudeAttempts.slice(-LIMIT);
      break;
    case "coding":
      progress.codingAttempts.push(entry);
      progress.codingAttempts = progress.codingAttempts.slice(-LIMIT);
      break;
    case "interview":
      progress.interviewAttempts.push(entry);
      progress.interviewAttempts = progress.interviewAttempts.slice(-LIMIT);
      break;
    default:
      throw createError("Unsupported progress type", 400, {
        code: "UNSUPPORTED_PROGRESS_TYPE",
      });
  }

  updateStreak(progress);
  await progress.save();

  const snapshot = buildSnapshot(progress);
  const achievements = buildAchievements(snapshot);

  res.json({
    success: true,
    snapshot,
    achievements,
  });
});

export const resetProgress = asyncHandler(async (req, res) => {
  await UserProgress.findOneAndUpdate(
    { userId: req.user.id },
    createEmptyProgress(req.user.id),
    { upsert: true, new: true, overwrite: true }
  );

  res.json({ success: true });
});
