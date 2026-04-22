import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle2, CircleAlert, Play, Table2 } from "lucide-react";
import { sqlProblems } from "../data/codingPracticeData";
import { sqlTopicMap } from "../data/problemTopics";
import { executeSqlAgainstProblem } from "../utils/sqlRunner";
import { recordCodingAttempt } from "../utils/progressTracker";

const SqlSolve = () => {
  const { id } = useParams();
  const problem = useMemo(
    () => sqlProblems.find((item) => item.id === id),
    [id]
  );

  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [expected, setExpected] = useState([]);
  const [passed, setPassed] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!problem) return;
    setQuery(problem.starterQuery || "");
    setResult([]);
    setExpected(problem.expectedResult || []);
    setPassed(null);
    setError("");
  }, [problem]);

  if (!problem) {
    return (
      <div className="min-h-screen px-6 pt-28 text-center text-slate-700">
        Problem not found.
      </div>
    );
  }

  const topic = sqlTopicMap[problem.id] || "General";

  const runQuery = () => {
    try {
      const output = executeSqlAgainstProblem(problem, query);
      setResult(output.result);
      setExpected(output.expected);
      setPassed(output.passed);
      setError("");
      void recordCodingAttempt({
        track: "SQL",
        problemId: problem.id,
        title: problem.title,
        difficulty: problem.difficulty,
        topic,
        passed: Boolean(output.passed),
        passedCount: output.passed ? 1 : 0,
        totalCount: 1,
      });
    } catch (err) {
      setResult([]);
      setPassed(null);
      setError(err.message || "Query execution failed");
    }
  };

  const renderTable = (rows) => {
    if (!rows.length) {
      return <p className="text-sm text-slate-500">No rows returned.</p>;
    }

    const columns = Object.keys(rows[0]);

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 overflow-hidden rounded-2xl">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="border-b border-slate-200 bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-700"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`${JSON.stringify(row)}-${rowIndex}`}>
                {columns.map((column) => (
                  <td
                    key={`${rowIndex}-${column}`}
                    className="border-b border-slate-100 bg-white px-4 py-3 text-sm text-slate-700"
                  >
                    {String(row[column])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 pb-8 pt-24 lg:px-6">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              to="/coding-practice/sql"
              className="text-sm font-semibold text-orange-500 hover:text-orange-600"
            >
              Back to SQL Practice
            </Link>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              {problem.title}
            </h1>
            <p className="mt-2 text-slate-600">{problem.description}</p>
          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              problem.difficulty === "Easy"
                ? "bg-emerald-100 text-emerald-800"
                : problem.difficulty === "Medium"
                ? "bg-amber-100 text-amber-800"
                : "bg-rose-100 text-rose-800"
            }`}
          >
            {problem.difficulty}
          </span>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
            {topic}
          </span>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.2fr]">
          <section className="rounded-[28px] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Schema and Sample Data
            </h2>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Table
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {problem.schema.table}
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-500">
                Columns
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {problem.schema.columns.map((column) => (
                  <span
                    key={column}
                    className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white"
                  >
                    {column}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Available Rows
              </h3>
              <div className="mt-4">{renderTable(problem.schema.rows)}</div>
            </div>

            <div className="mt-6 rounded-2xl bg-amber-50 p-5 text-sm text-amber-900">
              The SQL runner supports the patterns used in this practice set:
              `SELECT`, `WHERE`, `GROUP BY`, `COUNT(*)`, and `MAX()`.
            </div>
          </section>

          <section className="rounded-[28px] bg-slate-950 p-5 text-white shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <Table2 className="h-5 w-5 text-amber-300" />
                <div>
                  <h2 className="text-lg font-semibold">SQL Editor</h2>
                  <p className="text-sm text-slate-300">
                    Run your query and compare your result with the expected
                    output.
                  </p>
                </div>
              </div>

              <button
                onClick={runQuery}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
              >
                <Play className="h-4 w-4" />
                Run Query
              </button>
            </div>

            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              spellCheck="false"
              className="mt-5 h-64 w-full rounded-[24px] border border-white/10 bg-slate-900 p-5 font-mono text-sm leading-6 text-amber-100 outline-none"
            />

            {error && (
              <div className="mt-5 rounded-2xl bg-rose-500/10 px-4 py-4 text-sm text-rose-200">
                {error}
              </div>
            )}

            {passed !== null && (
              <div
                className={`mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                  passed
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "bg-rose-500/15 text-rose-300"
                }`}
              >
                {passed ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <CircleAlert className="h-4 w-4" />
                )}
                {passed ? "Correct result" : "Result does not match yet"}
              </div>
            )}

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-slate-900 p-5">
                <h3 className="text-lg font-semibold text-white">Your Output</h3>
                <div className="mt-4">{renderTable(result)}</div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-slate-900 p-5">
                <h3 className="text-lg font-semibold text-white">
                  Expected Output
                </h3>
                <div className="mt-4">{renderTable(expected)}</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SqlSolve;
