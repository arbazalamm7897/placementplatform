import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle2, CircleAlert, Play, TerminalSquare } from "lucide-react";
import { dsaProblems } from "../data/codingPracticeData";
import { dsaTopicMap } from "../data/problemTopics";
import { runDsaCode as runDsaCodeRequest } from "../services/api";
import { recordCodingAttempt } from "../utils/progressTracker";

const languageOptions = [
  { id: "javascript", label: "JavaScript" },
  { id: "java", label: "Java" },
  { id: "python", label: "Python" },
  { id: "cpp", label: "C++" },
];

const DsaSolve = () => {
  const { id } = useParams();
  const problem = useMemo(
    () => dsaProblems.find((item) => item.id === id),
    [id]
  );

  const [language, setLanguage] = useState("javascript");
  const [codeByLanguage, setCodeByLanguage] = useState({});
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [customResult, setCustomResult] = useState(null);

  useEffect(() => {
    if (!problem) return;

    setCodeByLanguage({
      javascript: problem.javascriptTemplate,
      java: problem.javaTemplate,
      python: problem.pythonTemplate,
      cpp: problem.cppTemplate,
    });
    setResults([]);
    setStatus(null);
    setError("");
    setCustomInput("");
    setCustomResult(null);
    setLanguage("javascript");
  }, [problem]);

  if (!problem) {
    return (
      <div className="min-h-screen px-6 pt-28 text-center text-slate-700">
        Problem not found.
      </div>
    );
  }

  const activeCode = codeByLanguage[language] || "";
  const topic = dsaTopicMap[problem.id] || "General";

  const updateCode = (value) => {
    setCodeByLanguage((current) => ({
      ...current,
      [language]: value,
    }));
  };

  const runCode = async () => {
    try {
      setIsRunning(true);
      setError("");

      const { data } = await runDsaCodeRequest(problem.id, {
        language,
        code: activeCode,
      });

      setResults(data.results || []);
      setStatus({
        passedCount: data.passedCount,
        totalCount: data.totalCount,
        allPassed: data.allPassed,
      });
      await recordCodingAttempt({
        track: "DSA",
        problemId: problem.id,
        title: problem.title,
        difficulty: problem.difficulty,
        topic,
        passed: Boolean(data.allPassed),
        passedCount: data.passedCount,
        totalCount: data.totalCount,
      });
    } catch (err) {
      setResults([]);
      setStatus(null);
      setError(
        err.response?.data?.details ||
          err.response?.data?.error ||
          err.message ||
          "Execution failed"
      );
    } finally {
      setIsRunning(false);
    }
  };

  const runCustomJavascript = () => {
    if (language !== "javascript") {
      setCustomResult({
        ok: false,
        message: "Custom test cases are currently available in JavaScript mode.",
      });
      return;
    }

    try {
      const parsedArgs = JSON.parse(customInput);

      if (!Array.isArray(parsedArgs)) {
        throw new Error("Custom input must be a JSON array of function arguments.");
      }

      // eslint-disable-next-line no-new-func
      const loader = new Function(
        `${activeCode}\nreturn typeof ${problem.functionName} === "function" ? ${problem.functionName} : null;`
      );
      const solution = loader();

      if (typeof solution !== "function") {
        throw new Error(`Expected a function named ${problem.functionName}.`);
      }

      const output = solution(...structuredClone(parsedArgs));
      setCustomResult({
        ok: true,
        message: JSON.stringify(output),
      });
    } catch (err) {
      setCustomResult({
        ok: false,
        message: err.message || "Custom execution failed.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 pb-8 pt-24 lg:px-6">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              to="/coding-practice/dsa"
              className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Back to DSA Practice
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

        <div className="grid gap-6 xl:grid-cols-[1.05fr_1.15fr]">
          <section className="rounded-[28px] bg-white p-6 shadow-sm">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Problem Description
                </h2>
                <p className="mt-3 leading-7 text-slate-700">
                  {problem.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Examples
                </h3>
                <div className="mt-3 space-y-3">
                  {problem.examples.map((example, index) => (
                    <div
                      key={`${problem.id}-example-${index}`}
                      className="rounded-2xl bg-slate-50 p-4"
                    >
                      <p className="text-sm text-slate-500">Example {index + 1}</p>
                      <p className="mt-2 font-mono text-sm text-slate-800">
                        Input: {example.input}
                      </p>
                      <p className="mt-1 font-mono text-sm text-slate-800">
                        Output: {example.output}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Constraints
                </h3>
                <ul className="mt-3 space-y-2 text-slate-700">
                  {problem.constraints.map((constraint) => (
                    <li
                      key={constraint}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      {constraint}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Judge Test Cases
                </h3>
                <div className="mt-3 space-y-3">
                  {problem.testCases.map((testCase, index) => (
                    <div
                      key={`${problem.id}-case-${index}`}
                      className="rounded-2xl border border-slate-200 p-4"
                    >
                      <p className="text-sm font-semibold text-slate-500">
                        Test Case {index + 1}
                      </p>
                      <p className="mt-2 font-mono text-sm text-slate-700">
                        Input: {JSON.stringify(testCase.input)}
                      </p>
                      <p className="mt-1 font-mono text-sm text-slate-700">
                        Expected: {JSON.stringify(testCase.expected)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] bg-slate-950 p-5 text-white shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                  Editor
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  JavaScript and Java run live in the judge. Python and C++
                  starter templates are included for practice drafts.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none"
                >
                  {languageOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-60"
                >
                  <Play className="h-4 w-4" />
                  {isRunning ? "Running..." : "Run Code"}
                </button>
              </div>
            </div>

            <textarea
              value={activeCode}
              onChange={(e) => updateCode(e.target.value)}
              spellCheck="false"
              className="mt-5 h-[430px] w-full rounded-[24px] border border-white/10 bg-slate-900 p-5 font-mono text-sm leading-6 text-emerald-100 outline-none"
            />

            {error && (
              <div className="mt-5 rounded-2xl bg-rose-500/10 px-4 py-4 text-sm text-rose-200">
                {error}
              </div>
            )}

            <div className="mt-5 rounded-[24px] border border-white/10 bg-slate-900 p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <TerminalSquare className="h-5 w-5 text-emerald-300" />
                  <h3 className="text-lg font-semibold">Judge Output</h3>
                </div>

                {status && (
                  <div
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      status.allPassed
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-amber-500/15 text-amber-300"
                    }`}
                  >
                    {status.passedCount}/{status.totalCount} passed
                  </div>
                )}
              </div>

              {!results.length && !status && !error && (
                <p className="mt-4 text-sm text-slate-400">
                  Run your code to see pass or fail status for each test case.
                </p>
              )}

              <div className="mt-4 space-y-3">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className={`rounded-2xl border px-4 py-4 ${
                      result.passed
                        ? "border-emerald-500/30 bg-emerald-500/10"
                        : "border-rose-500/30 bg-rose-500/10"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      {result.passed ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                      ) : (
                        <CircleAlert className="h-4 w-4 text-rose-300" />
                      )}
                      Test Case {result.id}
                    </div>
                    <p className="mt-3 font-mono text-xs text-slate-300">
                      Input: {JSON.stringify(result.input)}
                    </p>
                    <p className="mt-2 font-mono text-xs text-slate-300">
                      Expected: {JSON.stringify(result.expected)}
                    </p>
                    <p className="mt-2 font-mono text-xs text-slate-300">
                      Actual: {JSON.stringify(result.actual)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[24px] border border-white/10 bg-slate-900 p-5">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold">Custom Test Case</h3>
                <button
                  onClick={runCustomJavascript}
                  className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
                >
                  Run Custom Input
                </button>
              </div>
              <p className="mt-3 text-sm text-slate-400">
                Enter a JSON array of arguments. Example:
                {` ${JSON.stringify(problem.testCases[0]?.input || [])}`}
              </p>
              <textarea
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                spellCheck="false"
                rows="4"
                className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-950 p-4 font-mono text-sm text-sky-100 outline-none"
                placeholder={JSON.stringify(problem.testCases[0]?.input || [])}
              />
              {customResult && (
                <div
                  className={`mt-4 rounded-2xl px-4 py-4 text-sm ${
                    customResult.ok
                      ? "bg-emerald-500/10 text-emerald-200"
                      : "bg-rose-500/10 text-rose-200"
                  }`}
                >
                  {customResult.message}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DsaSolve;
