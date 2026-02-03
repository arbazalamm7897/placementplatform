import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const InterviewSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

      setTimeout(() => {
        setQuestion(data.question);
        setThinking(false);
        setLoading(false);
      }, 1500);
    } catch (err) {
      console.error("Fetch question failed:", err);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  // 🔥 THIS IS THE FIX
  useEffect(() => {
    if (finished) {
      // small delay to ensure DB save
      setTimeout(() => {
        navigate(`/ai-interview/feedback/${id}`);
      }, 1000);
    }
  }, [finished, navigate, id]);

  const submitAnswer = async () => {
    if (!answer.trim()) return alert("Please answer first");

    await fetch(`http://localhost:5000/api/interview/answer/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer }),
    });

    setAnswer("");
    setLoading(true);
    fetchQuestion();
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
          <p className="italic text-gray-500">
            AI is preparing feedback...
          </p>
        ) : (
          <p className="font-medium mb-4">{question}</p>
        )}

        {!thinking && (
          <>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows="4"
              className="w-full border rounded-lg p-3 mb-4"
            />

            <button
              onClick={submitAnswer}
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
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
