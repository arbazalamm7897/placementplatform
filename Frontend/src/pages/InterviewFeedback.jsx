import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getInterviewFeedback as getInterviewFeedbackRequest } from "../services/api";
import { recordInterviewAttempt } from "../utils/progressTracker";

const InterviewFeedback = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(null);
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
      const { data } = await getInterviewFeedbackRequest(id);

      if (!data.feedback) {
        setTimeout(fetchFeedback, 1000);
        return;
      }

      setFeedback(data.feedback);
      setScore(data.score);
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
    if (!summarySpeech || typeof window === "undefined" || !window.speechSynthesis) {
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
      <div className="min-h-screen flex items-center justify-center">
        Generating your final interview feedback...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-lg mt-12">
        <h2 className="text-3xl font-bold mb-3 text-gray-900">
          Interview Summary 🚀
        </h2>

        <p className="text-lg font-semibold mb-6 text-gray-700">
          Overall Score: <span className="text-green-600">{score}/10</span>
        </p>

        <section className="rounded-3xl bg-green-50 border border-green-100 p-6 mb-6">
          <h3 className="text-xl font-semibold text-green-900 mb-3">
            Overall Performance 🔥
          </h3>
          <p className="whitespace-pre-line text-green-800">
            {feedback.overallPerformance}
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <section className="rounded-3xl bg-blue-50 border border-blue-100 p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">
              Strong Areas 👍
            </h3>
            <ul className="space-y-2 text-blue-800">
              {(feedback.strongAreas || []).map((item, index) => (
                <li key={`${item}-${index}`}>• {item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl bg-amber-50 border border-amber-100 p-6">
            <h3 className="text-xl font-semibold text-amber-900 mb-3">
              Need More Focus 📌
            </h3>
            <ul className="space-y-2 text-amber-800">
              {(feedback.weakAreas || []).map((item, index) => (
                <li key={`${item}-${index}`}>• {item}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="rounded-3xl bg-slate-50 border border-slate-200 p-6 mb-6">
          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Communication Feedback 💡
          </h3>
          <p className="text-slate-700">{feedback.communicationFeedback}</p>
        </section>

        <section className="rounded-3xl bg-purple-50 border border-purple-100 p-6 mb-6">
          <h3 className="text-xl font-semibold text-purple-900 mb-3">
            Action Plan ⚡
          </h3>
          <ul className="space-y-2 text-purple-800">
            {(feedback.actionableImprovements || []).map((item, index) => (
              <li key={`${item}-${index}`}>• {item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl bg-emerald-50 border border-emerald-100 p-6">
          <h3 className="text-xl font-semibold text-emerald-900 mb-3">
            Final Note
          </h3>
          <p className="text-emerald-800">{feedback.closingMessage}</p>
        </section>
      </div>
    </div>
  );
};

export default InterviewFeedback;
