import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { aptitudeMockTest } from "../data/aptitudeData";
import { recordAptitudeAttempt } from "../utils/progressTracker";

const MAX_LIMIT = 100;

const shuffleArray = (items) => {
  const cloned = [...items];

  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }

  return cloned;
};

const AptitudeMockTest = () => {
  const navigate = useNavigate();
  const availableQuestions = aptitudeMockTest.length;
  const maxQuestions = Math.min(MAX_LIMIT, availableQuestions);

  const [questionCountInput, setQuestionCountInput] = useState(
    String(maxQuestions)
  );
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [setupError, setSetupError] = useState("");
  const [testQuestions, setTestQuestions] = useState([]);

  const totalQuestions = testQuestions.length;

  const score = useMemo(() => {
    return testQuestions.reduce((total, item, index) => {
      return total + (selectedAnswers[index] === item.correctOption ? 1 : 0);
    }, 0);
  }, [selectedAnswers, testQuestions]);

  const unansweredCount = testQuestions.filter(
    (_, index) => selectedAnswers[index] === undefined
  ).length;

  const sectionStats = useMemo(() => {
    const stats = {};

    testQuestions.forEach((item, index) => {
      if (!stats[item.section]) {
        stats[item.section] = {
          total: 0,
          correct: 0,
        };
      }

      stats[item.section].total += 1;
      if (selectedAnswers[index] === item.correctOption) {
        stats[item.section].correct += 1;
      }
    });

    return stats;
  }, [selectedAnswers, testQuestions]);

  const weakestSections = useMemo(() => {
    return Object.entries(sectionStats)
      .sort((a, b) => {
        const scoreA = a[1].correct / a[1].total;
        const scoreB = b[1].correct / b[1].total;
        return scoreA - scoreB;
      })
      .slice(0, 2)
      .map(([section]) => section);
  }, [sectionStats]);

  const feedbackMessage = useMemo(() => {
    if (!totalQuestions) {
      return { title: "", text: "" };
    }

    const percentage = (score / totalQuestions) * 100;

    if (percentage >= 80) {
      return {
        title: "Strong Performance",
        text:
          "You have a solid aptitude base for placements. Keep refining speed and maintain this accuracy under timed conditions.",
      };
    }

    if (percentage >= 60) {
      return {
        title: "Good Progress",
        text:
          "Your fundamentals are in place, but a few concepts still need polishing. Focus on your weaker sections and practice more mixed tests.",
      };
    }

    return {
      title: "Needs More Practice",
      text:
        "This is a good starting point. Build topic-wise confidence first, then return to full-length mock tests for better performance.",
    };
  }, [score, totalQuestions]);

  const startTest = () => {
    const parsedCount = Number(questionCountInput);

    if (!Number.isInteger(parsedCount) || parsedCount <= 0) {
      setSetupError("Enter a valid whole number of questions.");
      return;
    }

    if (parsedCount > MAX_LIMIT) {
      setSetupError(`The maximum allowed limit is ${MAX_LIMIT} questions.`);
      return;
    }

    if (parsedCount > availableQuestions) {
      setSetupError(
        `Right now ${availableQuestions} mock questions are available. Choose ${availableQuestions} or fewer.`
      );
      return;
    }

    setSetupError("");
    setSelectedAnswers({});
    setSubmitted(false);
    setTestQuestions(shuffleArray(aptitudeMockTest).slice(0, parsedCount));
    setTestStarted(true);
  };

  const retakeTest = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setSetupError("");
    setTestQuestions([]);
    setTestStarted(false);
  };

  const submitTest = () => {
    setSubmitted(true);

    if (!totalQuestions) return;

    const percentage = Math.round((score / totalQuestions) * 100);
    recordAptitudeAttempt({
      score,
      totalQuestions,
      weakestSections,
      percentage,
    });
  };

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-24">
        <div className="max-w-3xl mx-auto rounded-3xl bg-white p-8 shadow-lg">
          <p className="text-sm uppercase tracking-wide text-green-700 mb-2">
            Full Practice Test
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Aptitude Mock Test Setup
          </h1>
          <p className="text-gray-600 mb-6">
            Choose how many questions you want in this test. A fresh randomized
            set will be generated every time you start or retake the test.
          </p>

          <div className="rounded-2xl bg-green-50 px-5 py-4 mb-6 text-green-900">
            Maximum limit allowed: {MAX_LIMIT}. Available in the current bank:{" "}
            {availableQuestions}.
          </div>

          <label className="block mb-4">
            <span className="block text-sm font-semibold text-gray-800 mb-2">
              Number of questions
            </span>
            <input
              type="number"
              min="1"
              max={MAX_LIMIT}
              value={questionCountInput}
              onChange={(e) => setQuestionCountInput(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </label>

          {setupError && (
            <div className="mb-4 rounded-2xl bg-red-100 px-4 py-3 text-red-700">
              {setupError}
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            <button
              onClick={startTest}
              className="rounded-xl bg-green-600 px-6 py-3 text-white"
            >
              Start Mock Test
            </button>
            <button
              onClick={() => navigate("/placement-prep/aptitude")}
              className="rounded-xl bg-slate-700 px-6 py-3 text-white"
            >
              Back to Aptitude
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-3xl bg-white p-8 shadow-lg mb-10">
          <p className="text-sm uppercase tracking-wide text-green-700 mb-2">
            Full Practice Test
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Aptitude Mock Test
          </h1>
          <p className="text-gray-600 mb-4">
            This test was generated with {totalQuestions} questions from the
            current aptitude bank.
          </p>

          {!submitted ? (
            <div className="rounded-2xl bg-green-50 px-5 py-4 text-green-900">
              Attempt all questions, then submit to view your score and detailed explanations.
            </div>
          ) : (
            <div className="rounded-2xl bg-blue-50 px-5 py-4 text-blue-900">
              <p className="text-xl font-semibold mb-1">
                Score: {score} / {totalQuestions}
              </p>
              <p>
                Unanswered questions: {unansweredCount}. Review the explanations below to improve.
              </p>
            </div>
          )}
        </div>

        {submitted && (
          <div className="rounded-3xl bg-white p-8 shadow-lg mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Performance Feedback
            </h2>
            <div className="rounded-2xl bg-green-50 px-5 py-4 mb-4">
              <p className="font-semibold text-green-900 mb-1">
                {feedbackMessage.title}
              </p>
              <p className="text-green-900">{feedbackMessage.text}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(sectionStats).map(([section, stats]) => (
                <div key={section} className="rounded-2xl bg-gray-50 px-5 py-4">
                  <p className="font-semibold text-gray-900">{section}</p>
                  <p className="text-gray-700">
                    Score: {stats.correct} / {stats.total}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-amber-50 px-5 py-4 text-amber-900">
              <p className="font-semibold mb-1">Recommended Next Focus</p>
              <p>
                {weakestSections.length > 0
                  ? `Spend more time on ${weakestSections.join(" and ")} before your next full mock test.`
                  : "Review all sections and continue practicing consistently."}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {testQuestions.map((item, index) => (
            <section
              key={`${item.section}-${index}-${item.question}`}
              className="rounded-3xl bg-white p-8 shadow-lg"
            >
              <p className="text-sm font-semibold text-green-700 mb-2">
                {item.section} • Question {index + 1}
              </p>
              <h2 className="text-xl font-semibold text-gray-900 mb-5">
                {item.question}
              </h2>

              <div className="space-y-3">
                {item.options.map((option, optionIndex) => {
                  const isSelected = selectedAnswers[index] === optionIndex;
                  const isCorrect = item.correctOption === optionIndex;
                  const showCorrect = submitted && isCorrect;
                  const showWrong = submitted && isSelected && !isCorrect;

                  return (
                    <label
                      key={option}
                      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 cursor-pointer transition ${
                        showCorrect
                          ? "border-green-500 bg-green-50"
                          : showWrong
                            ? "border-red-400 bg-red-50"
                            : isSelected
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        checked={isSelected}
                        disabled={submitted}
                        onChange={() =>
                          setSelectedAnswers((prev) => ({
                            ...prev,
                            [index]: optionIndex,
                          }))
                        }
                      />
                      <span className="text-gray-800">{option}</span>
                    </label>
                  );
                })}
              </div>

              {submitted && (
                <div className="mt-5 rounded-2xl bg-gray-50 px-5 py-4">
                  <p className="font-semibold text-gray-900 mb-1">Explanation</p>
                  <p className="text-gray-700">{item.explanation}</p>
                </div>
              )}
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          {!submitted ? (
            <button
              onClick={submitTest}
              className="rounded-xl bg-green-600 px-6 py-3 text-white"
            >
              Submit Mock Test
            </button>
          ) : (
            <>
              <button
                onClick={retakeTest}
                className="rounded-xl bg-blue-600 px-6 py-3 text-white"
              >
                New Random Test
              </button>
              <button
                onClick={() => navigate("/placement-prep/aptitude")}
                className="rounded-xl bg-slate-700 px-6 py-3 text-white"
              >
                Back to Aptitude
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AptitudeMockTest;
