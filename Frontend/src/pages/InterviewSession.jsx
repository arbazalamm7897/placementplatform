import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const InterviewSession = () => {
  const { id } = useParams();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);

  const fetchQuestion = async () => {
    try {
      console.log("📤 Fetching question for session:", id);

      const res = await fetch(
        `http://localhost:5000/api/interview/question/${id}`
      );

      const data = await res.json();
      console.log("📥 Question API response:", data);

      if (data.done) {
        setFinished(true);
      } else if (data.question) {
        setQuestion(data.question);
      } else {
        console.error("❌ No question received");
      }

      setLoading(false);
    } catch (err) {
      console.error("❌ Fetch question failed:", err);
      alert("Failed to load question");
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const submitAnswer = async () => {
    if (!answer.trim()) return alert("Please answer first");

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
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">Interview Completed 🎉</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">
        <h2 className="text-xl font-semibold mb-4">AI Interviewer</h2>

        {/* 🔥 THIS WAS NOT RENDERING BEFORE */}
        <p className="mb-4 font-medium text-gray-800">
          {question || "⚠️ No question loaded"}
        </p>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows="4"
          placeholder="Type your answer here..."
          className="w-full border rounded-lg p-3 mb-4"
        />

        <button
          onClick={submitAnswer}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default InterviewSession;
