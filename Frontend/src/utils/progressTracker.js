import { clearProgress, fetchProgress, trackProgress } from "../services/api";

const STORAGE_KEY = "careerBridgeProgress";

const createDefaultState = () => ({
  resumeAnalyses: [],
  aptitudeAttempts: [],
  codingAttempts: [],
  interviewAttempts: [],
  streak: {
    current: 0,
    lastDate: null,
  },
});

const safeJsonParse = (value, fallback) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
};

const clampHistory = (items, limit = 80) => items.slice(-limit);

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
  const milliseconds = rightDate.getTime() - leftDate.getTime();
  return Math.round(milliseconds / (1000 * 60 * 60 * 24));
};

const hasAuthToken = () =>
  typeof window !== "undefined" && Boolean(window.localStorage.getItem("token"));

const getLocalProgressState = () => {
  if (typeof window === "undefined") {
    return createDefaultState();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = raw ? safeJsonParse(raw, createDefaultState()) : createDefaultState();

  return {
    ...createDefaultState(),
    ...parsed,
    streak: {
      ...createDefaultState().streak,
      ...(parsed.streak || {}),
    },
  };
};

const persistLocalProgress = (state) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const updateLocalStreak = (state) => {
  const today = toDayKey();
  const lastDate = state.streak?.lastDate;

  if (!lastDate) {
    state.streak = { current: 1, lastDate: today };
    return;
  }

  const difference = diffInDays(lastDate, today);

  if (difference === 0) {
    state.streak = { ...state.streak, lastDate: today };
    return;
  }

  if (difference === 1) {
    state.streak = {
      current: (state.streak.current || 0) + 1,
      lastDate: today,
    };
    return;
  }

  state.streak = { current: 1, lastDate: today };
};

const average = (items, selector) =>
  items.length
    ? Math.round(
        (items.reduce((sum, item) => sum + selector(item), 0) / items.length) * 10
      ) / 10
    : 0;

const buildSnapshotFromState = (state) => {
  const resumeAnalyses = state.resumeAnalyses || [];
  const aptitudeAttempts = state.aptitudeAttempts || [];
  const codingAttempts = state.codingAttempts || [];
  const interviewAttempts = state.interviewAttempts || [];

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

  return {
    totals: {
      resumeAnalyses: resumeAnalyses.length,
      aptitudeAttempts: aptitudeAttempts.length,
      codingAttempts: codingAttempts.length,
      interviewAttempts: interviewAttempts.length,
      solvedDsa: solvedDsaIds.size,
      solvedSql: solvedSqlIds.size,
      currentStreak: state.streak?.current || 0,
    },
    averages: {
      resumeScore: average(resumeAnalyses, (item) => item.score || 0),
      aptitudePercent: average(aptitudeAttempts, (item) => item.percentage || 0),
      interviewScore: average(interviewAttempts, (item) => item.score || 0),
    },
    codingByDifficulty: ["Easy", "Medium", "Hard"].map((difficulty) => {
      const attempts = codingAttempts.filter((item) => item.difficulty === difficulty);
      return {
        difficulty,
        attempts: attempts.length,
        solved: attempts.filter((item) => item.passed).length,
      };
    }),
    skillBreakdown: [
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
    ],
    recentActivity: [
      ...resumeAnalyses,
      ...aptitudeAttempts,
      ...codingAttempts,
      ...interviewAttempts,
    ]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 12),
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

const appendLocalEntry = (collectionName, entry) => {
  const state = getLocalProgressState();
  state[collectionName] = clampHistory([
    ...(state[collectionName] || []),
    {
      id: `${collectionName}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      ...entry,
    },
  ]);

  updateLocalStreak(state);
  persistLocalProgress(state);
  return state;
};

const recordEvent = async (type, collectionName, payload) => {
  if (hasAuthToken()) {
    try {
      await trackProgress({ type, payload });
      return;
    } catch (error) {
      console.error("Falling back to local progress storage", error);
    }
  }

  appendLocalEntry(collectionName, payload);
};

export const recordResumeAnalysis = (payload) =>
  recordEvent("resume", "resumeAnalyses", payload);

export const recordAptitudeAttempt = (payload) =>
  recordEvent("aptitude", "aptitudeAttempts", payload);

export const recordCodingAttempt = (payload) =>
  recordEvent("coding", "codingAttempts", payload);

export const recordInterviewAttempt = (payload) =>
  recordEvent("interview", "interviewAttempts", payload);

export const getAnalyticsSnapshot = async () => {
  if (hasAuthToken()) {
    try {
      const { data } = await fetchProgress();
      return {
        snapshot: data.snapshot,
        achievements: data.achievements,
      };
    } catch (error) {
      console.error("Falling back to local analytics snapshot", error);
    }
  }

  const state = getLocalProgressState();
  const snapshot = buildSnapshotFromState(state);
  return {
    snapshot,
    achievements: buildAchievements(snapshot),
  };
};

export const resetTrackedProgress = async () => {
  if (hasAuthToken()) {
    try {
      await clearProgress();
    } catch (error) {
      console.error("Failed to reset backend progress, clearing local fallback", error);
    }
  }

  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY);
  }
};
