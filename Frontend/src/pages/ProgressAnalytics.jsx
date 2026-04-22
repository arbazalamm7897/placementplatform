import { useEffect, useMemo, useState } from "react";
import {
  Award,
  BarChart3,
  BrainCircuit,
  Briefcase,
  CalendarRange,
  Code2,
  RefreshCcw,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import {
  getAnalyticsSnapshot,
  resetTrackedProgress,
} from "../utils/progressTracker";

const formatActivity = (item) => {
  if (Object.prototype.hasOwnProperty.call(item, "fileName")) {
    return {
      title: "Resume Analysis",
      detail: `${item.fileName} scored ${item.score}/10`,
      accent: "text-emerald-700 bg-emerald-50",
      icon: Briefcase,
    };
  }

  if (Object.prototype.hasOwnProperty.call(item, "totalQuestions")) {
    return {
      title: "Aptitude Mock Test",
      detail: `${item.score}/${item.totalQuestions} correct (${item.percentage}%)`,
      accent: "text-sky-700 bg-sky-50",
      icon: Target,
    };
  }

  if (Object.prototype.hasOwnProperty.call(item, "problemId")) {
    return {
      title: `${item.track} Practice`,
      detail: `${item.title} • ${item.passed ? "Solved" : "Attempted"} • ${item.difficulty}`,
      accent: "text-violet-700 bg-violet-50",
      icon: Code2,
    };
  }

  return {
    title: "AI Interview",
    detail: `Interview score ${item.score}/10`,
    accent: "text-amber-700 bg-amber-50",
    icon: BrainCircuit,
  };
};

const ProgressAnalytics = () => {
  const [snapshot, setSnapshot] = useState(null);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const refresh = async () => {
      const data = await getAnalyticsSnapshot();
      setSnapshot(data.snapshot);
      setAchievements(data.achievements);
    };

    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  const totalActivities =
    snapshot
      ? snapshot.totals.resumeAnalyses +
        snapshot.totals.aptitudeAttempts +
        snapshot.totals.codingAttempts +
        snapshot.totals.interviewAttempts
      : 0;

  const strongestArea = useMemo(() => {
    if (!snapshot) return null;
    return [...snapshot.skillBreakdown].sort((a, b) => b.avgScore - a.avgScore)[0];
  }, [snapshot]);

  const recommendation = useMemo(() => {
    if (!snapshot) {
      return "Start practicing in any module and this dashboard will begin building your personal learning picture.";
    }

    const unsolvedHard = snapshot.codingByDifficulty.find(
      (item) => item.difficulty === "Hard"
    );

    if (snapshot.totals.resumeAnalyses === 0) {
      return "Start with the resume analyzer so you can benchmark your profile before interviews.";
    }

    if (snapshot.totals.interviewAttempts === 0) {
      return "You already have learning activity tracked. The next high-impact step is to take a mock interview.";
    }

    if (snapshot.averages.aptitudePercent > 0 && snapshot.averages.aptitudePercent < 65) {
      return "Your aptitude average still has room to grow. Run another mixed mock test and review your weakest sections.";
    }

    if (unsolvedHard && unsolvedHard.solved < 2) {
      return "You are building momentum well. Push into harder coding questions now to improve interview readiness.";
    }

    return "Your profile looks balanced. Keep alternating coding, aptitude, resume, and interview practice to maintain momentum.";
  }, [snapshot]);

  const resetProgress = async () => {
    await resetTrackedProgress();
    const data = await getAnalyticsSnapshot();
    setSnapshot(data.snapshot);
    setAchievements(data.achievements);
  };

  if (!snapshot) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 pb-12 pt-28">
        <div className="mx-auto max-w-7xl rounded-[32px] bg-white p-10 text-center shadow-sm">
          Loading your progress dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 pb-12 pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[36px] bg-gradient-to-r from-slate-950 via-emerald-950 to-sky-950 p-8 text-white shadow-2xl">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-emerald-100">
                <Sparkles className="h-4 w-4" />
                Progress and Analytics
              </p>
              <h1 className="text-4xl font-bold">Your preparation command center</h1>
              <p className="mt-4 text-lg text-slate-200">
                Track how consistently you practice, where your strongest
                scores are showing up, and which area should get your next hour
                of focus.
              </p>
            </div>

            <button
              onClick={resetProgress}
              className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <RefreshCcw className="h-4 w-4" />
              Reset Progress
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total Activities",
              value: totalActivities,
              detail: "Tracked across all modules",
              icon: BarChart3,
              tone: "bg-white",
            },
            {
              label: "Current Streak",
              value: `${snapshot.totals.currentStreak} days`,
              detail: "Consecutive active days",
              icon: CalendarRange,
              tone: "bg-emerald-50",
            },
            {
              label: "Solved Problems",
              value: snapshot.totals.solvedDsa + snapshot.totals.solvedSql,
              detail: `${snapshot.totals.solvedDsa} DSA • ${snapshot.totals.solvedSql} SQL`,
              icon: Code2,
              tone: "bg-sky-50",
            },
            {
              label: "Strongest Area",
              value: strongestArea?.label || "Not enough data",
              detail:
                strongestArea && strongestArea.count
                  ? `Average ${strongestArea.avgScore}${strongestArea.label === "Aptitude" ? "%" : "/10"}`
                  : "Complete a few activities first",
              icon: Trophy,
              tone: "bg-amber-50",
            },
          ].map(({ label, value, detail, icon: Icon, tone }) => (
            <div key={label} className={`rounded-[28px] p-6 shadow-sm ${tone}`}>
              <div className="mb-4 inline-flex rounded-2xl bg-slate-900 p-3 text-white">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                {label}
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">{value}</h2>
              <p className="mt-2 text-sm text-slate-600">{detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[32px] bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-emerald-600" />
              <h2 className="text-2xl font-bold text-slate-900">Performance Snapshot</h2>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {snapshot.skillBreakdown.map((item) => (
                <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    {item.avgScore}
                    {item.label === "Aptitude" ? "%" : "/10"}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    {item.count} tracked {item.count === 1 ? "attempt" : "attempts"}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900">
                Coding Difficulty Breakdown
              </h3>
              <div className="mt-4 space-y-4">
                {snapshot.codingByDifficulty.map((item) => {
                  const progress =
                    item.attempts > 0 ? Math.round((item.solved / item.attempts) * 100) : 0;

                  return (
                    <div key={item.difficulty} className="rounded-3xl bg-slate-50 p-5">
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold text-slate-900">
                            {item.difficulty}
                          </p>
                          <p className="text-sm text-slate-600">
                            {item.solved} solved from {item.attempts} attempts
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-slate-700">{progress}%</p>
                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className={`h-full rounded-full ${
                            item.difficulty === "Easy"
                              ? "bg-emerald-500"
                              : item.difficulty === "Medium"
                              ? "bg-amber-500"
                              : "bg-rose-500"
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="rounded-[32px] bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-amber-500" />
                <h2 className="text-2xl font-bold text-slate-900">Achievements</h2>
              </div>

              <div className="mt-5 space-y-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.title}
                    className={`rounded-3xl border p-5 ${
                      achievement.unlocked
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-slate-900">
                          {achievement.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {achievement.description}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          achievement.unlocked
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {achievement.unlocked ? "Unlocked" : "Locked"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] bg-gradient-to-br from-emerald-100 via-white to-sky-100 p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-emerald-700" />
                <h2 className="text-2xl font-bold text-slate-900">Next Recommendation</h2>
              </div>
              <p className="mt-4 text-base leading-7 text-slate-700">{recommendation}</p>
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-[32px] bg-white p-7 shadow-sm">
          <div className="flex items-center gap-3">
            <CalendarRange className="h-5 w-5 text-sky-600" />
            <h2 className="text-2xl font-bold text-slate-900">Recent Activity</h2>
          </div>

          {snapshot.recentActivity.length === 0 ? (
            <div className="mt-6 rounded-3xl bg-slate-50 p-8 text-center">
              <p className="text-lg font-semibold text-slate-900">
                No progress data yet
              </p>
              <p className="mt-2 text-slate-600">
                Start with a resume analysis, coding question, aptitude test, or
                interview session and this page will begin filling out.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {snapshot.recentActivity.map((item) => {
                const activity = formatActivity(item);
                const Icon = activity.icon;

                return (
                  <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div
                      className={`inline-flex rounded-2xl p-3 ${activity.accent}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-lg font-semibold text-slate-900">
                      {activity.title}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">{activity.detail}</p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProgressAnalytics;
