import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const InterviewSession = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);

  // Fetch next question
  const fetchQuestion = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/interview/question/${id}`
      );
      const data = await res.json();

      if (data.done) {
        setFinished(true);
      } else {
        setQuestion(data.question);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to load question");
    }
  };

  // On page load → get first question
  useEffect(() => {
    fetchQuestion();
  }, []);

  // Submit answer
  const submitAnswer = async () => {
    if (!answer.trim()) {
      alert("Please answer before submitting");
      return;
    }

    try {
      await fetch(
        `http://localhost:5000/api/interview/answer/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answer }),
        }
      );

      setAnswer("");
      fetchQuestion(); // load next question
    } catch (err) {
      console.error(err);
      alert("Failed to submit answer");
    }
  };

  // UI states
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading interview...
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg w-[500px] text-center">
          <h2 className="text-2xl font-bold mb-4">Interview Completed 🎉</h2>
          <p className="text-gray-600">
            Thank you for completing the interview.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">
        <h2 className="text-xl font-semibold mb-4">AI Interviewer</h2>

        <p className="mb-4 font-medium">{question}</p>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows="4"
          placeholder="Type your answer here..."
          className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={submitAnswer}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default InterviewSession;
