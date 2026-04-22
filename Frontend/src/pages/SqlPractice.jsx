import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Database } from "lucide-react";
import { sqlProblems } from "../data/codingPracticeData";
import { sqlTopicMap } from "../data/problemTopics";

const filters = ["All", "Easy", "Medium", "Hard"];

const badgeClass = {
  All: "bg-slate-900 text-white",
  Easy: "bg-emerald-100 text-emerald-800",
  Medium: "bg-amber-100 text-amber-800",
  Hard: "bg-rose-100 text-rose-800",
};

const SqlPractice = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const navigate = useNavigate();
  const topics = useMemo(
    () => ["All Topics", ...new Set(sqlProblems.map((problem) => sqlTopicMap[problem.id] || "General"))],
    []
  );

  const filteredProblems = useMemo(() => {
    return sqlProblems.filter((problem) => {
      const matchesDifficulty =
        selectedDifficulty === "All" || problem.difficulty === selectedDifficulty;
      const matchesTopic =
        selectedTopic === "All Topics" ||
        (sqlTopicMap[problem.id] || "General") === selectedTopic;

      return matchesDifficulty && matchesTopic;
    });
  }, [selectedDifficulty, selectedTopic]);

  return (
    <div className="min-h-screen bg-slate-50 px-6 pb-12 pt-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-[28px] bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                SQL Track
              </p>
              <h1 className="mt-3 text-4xl font-bold text-slate-900">
                Practice interview-style SQL queries
              </h1>
              <p className="mt-3 max-w-2xl text-slate-600">
                Open a problem to inspect the schema, write your query, execute
                it, and compare the result with the expected output.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedDifficulty(filter)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selectedDifficulty === filter
                      ? badgeClass[filter]
                      : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {filter}
                </button>
              ))}
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 outline-none"
              >
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredProblems.map((problem, index) => (
            <div
              key={problem.id}
              className="rounded-[24px] bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-3xl">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass[problem.difficulty]}`}
                    >
                      {problem.difficulty}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {sqlTopicMap[problem.id] || "General"}
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    {problem.title}
                  </h2>
                  <p className="mt-3 text-slate-600">{problem.description}</p>
                </div>

                <button
                  onClick={() => navigate(`/coding-practice/sql/${problem.id}`)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
                >
                  <Database className="h-4 w-4" />
                  Solve
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SqlPractice;
