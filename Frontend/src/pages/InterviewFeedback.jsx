import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Award,
  BrainCircuit,
  MessageSquareText,
  Sparkles,
  Target,
} from "lucide-react";
import {
  getApiErrorMessage,
  getInterviewFeedback as getInterviewFeedbackRequest,
} from "../services/api";
import { recordInterviewAttempt } from "../utils/progressTracker";

const InterviewFeedback = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");
  const hasRecordedRef = useRef(false);

  const summarySpeech = useMemo(() => {
    if (!feedback) return "";

    return [
      feedback.overallPerformance,
      feedback.communicationFeedback
        ? `Communication feedback: ${feedback.communicationFeedback}`
        : "",
      feedback.closingMessage,
    ]
      .filter(Boolean)
      .join(" ");
  }, [feedback]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setError("");
        const { data } = await getInterviewFeedbackRequest(id);

        if (!data.feedback) {
          setTimeout(fetchFeedback, 1000);
          return;
        }

        setFeedback(data.feedback);
        setScore(data.score);
      } catch (err) {
        setError(getApiErrorMessage(err, "Could not load interview feedback"));
      }
    };

    fetchFeedback();
  }, [id]);

  useEffect(() => {
    if (!feedback || score === null || hasRecordedRef.current) {
      return;
    }

    void recordInterviewAttempt({
      interviewId: id,
      score: Number(score) || 0,
      strongAreas: feedback.strongAreas || [],
      weakAreas: feedback.weakAreas || [],
    });
    hasRecordedRef.current = true;
  }, [feedback, id, score]);

  useEffect(() => {
    if (
      !summarySpeech ||
      typeof window === "undefined" ||
      !window.speechSynthesis
    ) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(summarySpeech);
    utterance.rate = 0.96;
    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [summarySpeech]);

  if (!feedback) {
    return (
      <div className="page-shell">
        <div className="page-content flex min-h-screen items-center justify-center pt-24">
          <div className="glass-panel max-w-xl px-8 py-10 text-center">
            <div className="icon-badge mx-auto h-16 w-16 bg-cyan-400/15 text-cyan-200">
              <BrainCircuit className="h-7 w-7" />
            </div>
            <h1 className="mt-6 text-3xl font-semibold text-white">
              Building your interview summary
            </h1>
            <p className="mt-4 text-base leading-8 text-slate-300">
              {error || "Generating your final interview feedback and performance insights..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="page-content pt-28">
        <section className="hero-panel overflow-hidden">
          <div className="absolute -right-10 top-8 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-emerald-400/12 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.45fr_0.95fr] lg:items-end">
            <div className="space-y-5">
              <span className="section-badge">
                <Sparkles className="h-4 w-4" />
                Interview Intelligence Report
              </span>
              <div className="space-y-4">
                <h1 className="heading-xl max-w-3xl text-balance">
                  A polished performance breakdown designed to feel like a
                  premium AI coaching platform.
                </h1>
                <p className="body-lg max-w-2xl text-slate-300">
                  Review your speaking quality, strengths, improvement areas,
                  and a concrete action plan you can use before the next mock
                  interview.
                </p>
              </div>
            </div>

            <div className="glass-card space-y-5 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="body-sm uppercase tracking-[0.3em] text-slate-400">
                    Overall Score
                  </p>
                  <p className="mt-2 text-4xl font-semibold text-white">
                    {score}
                    <span className="text-xl text-slate-400"> / 10</span>
                  </p>
                </div>
                <div className="icon-badge h-14 w-14 bg-emerald-400/15 text-emerald-200">
                  <Award className="h-6 w-6" />
                </div>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 transition-all duration-700"
                  style={{ width: `${Math.max((Number(score) || 0) * 10, 8)}%` }}
                />
              </div>

              <p className="text-sm leading-7 text-slate-300">
                This score blends overall answer quality, communication
                clarity, and confidence signals captured during the session.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
          <div className="space-y-6">
            <article className="glass-panel p-6 md:p-8">
              <div className="flex items-center gap-3">
                <div className="icon-badge h-12 w-12 bg-emerald-400/15 text-emerald-200">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="body-sm uppercase tracking-[0.3em] text-slate-400">
                    Overall Performance
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    Session Summary
                  </h2>
                </div>
              </div>
              <p className="mt-6 whitespace-pre-line text-base leading-8 text-slate-200">
                {feedback.overallPerformance}
              </p>
            </article>

            <article className="glass-panel p-6 md:p-8">
              <div className="flex items-center gap-3">
                <div className="icon-badge h-12 w-12 bg-sky-400/15 text-sky-200">
                  <MessageSquareText className="h-5 w-5" />
                </div>
                <div>
                  <p className="body-sm uppercase tracking-[0.3em] text-slate-400">
                    Communication Feedback
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    Delivery and Clarity
                  </h2>
                </div>
              </div>
              <p className="mt-6 text-base leading-8 text-slate-200">
                {feedback.communicationFeedback || "No communication notes were generated."}
              </p>
            </article>
          </div>

          <div className="space-y-6">
            <article className="glass-panel p-6">
              <div className="flex items-center gap-3">
                <div className="icon-badge h-12 w-12 bg-cyan-400/15 text-cyan-200">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="body-sm uppercase tracking-[0.3em] text-slate-400">
                    Strong Areas
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-white">
                    What worked well
                  </h2>
                </div>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-200">
                {(feedback.strongAreas || []).map((item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="glass-panel p-6">
              <div className="flex items-center gap-3">
                <div className="icon-badge h-12 w-12 bg-amber-400/15 text-amber-200">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <p className="body-sm uppercase tracking-[0.3em] text-slate-400">
                    Need More Focus
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-white">
                    Improvement areas
                  </h2>
                </div>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-200">
                {(feedback.weakAreas || []).map((item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className="rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="glass-panel p-6 md:p-8">
            <div className="flex items-center gap-3">
              <div className="icon-badge h-12 w-12 bg-violet-400/15 text-violet-200">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <div>
                <p className="body-sm uppercase tracking-[0.3em] text-slate-400">
                  Action Plan
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Next interview prep
                </h2>
              </div>
            </div>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-200">
              {(feedback.actionableImprovements || []).map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="rounded-2xl border border-violet-400/20 bg-violet-400/10 px-4 py-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="glass-panel p-6 md:p-8">
            <div className="flex items-center gap-3">
              <div className="icon-badge h-12 w-12 bg-teal-400/15 text-teal-200">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="body-sm uppercase tracking-[0.3em] text-slate-400">
                  Final Note
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Closing guidance
                </h2>
              </div>
            </div>
            <div className="surface-muted mt-6 rounded-3xl p-5">
              <p className="text-base leading-8 text-slate-200">
                {feedback.closingMessage}
              </p>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default InterviewFeedback;
