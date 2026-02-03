import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const InterviewSession = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ correct

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [thinking, setThinking] = useState(false);
  const [finished, setFinished] = useState(false);

  const fetchQuestion = async () => {
    try {
      setThinking(true);
      setQuestion("");

      const res = await fetch(
        `http://localhost:5000/api/interview/question/${id}`
      );
      const data = await res.json();

      if (data.done) {
        setFinished(true);
        return;
      }

      // ⏳ simulate interviewer thinking
      setTimeout(() => {
        setQuestion(data.question);
        setThinking(false);
        setLoading(false);
      }, 2000);
    } catch (err) {
      console.error("❌ Fetch question failed:", err);
      alert("Failed to load question");
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  // ✅ HANDLE NAVIGATION SAFELY
  useEffect(() => {
    if (finished) {
      navigate(`/ai-interview/feedback/${id}`);
    }
  }, [finished, navigate, id]);

  const submitAnswer = async () => {
    if (!answer.trim()) {
      alert("Please answer first");
      return;
    }

    try {
      await fetch(
        `http://localhost:5000/api/interview/answer/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answer }),
        }
      );

      setAnswer("");
      setLoading(true);
      fetchQuestion();
    } catch (err) {
      console.error("❌ Submit answer failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading interview...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[520px]">
        <h2 className="text-xl font-semibold mb-4">🤖 AI Interviewer</h2>

        {thinking ? (
          <p className="text-gray-500 italic mb-4">
            AI is preparing the next question...
          </p>
        ) : (
          <p className="mb-4 font-medium text-gray-800">{question}</p>
        )}

        {!thinking && (
          <>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows="4"
              placeholder="Type your answer here..."
              className="w-full border rounded-lg p-3 mb-4"
            />

            <button
              onClick={submitAnswer}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Submit Answer
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default InterviewSession;
