import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const InterviewFeedback = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      const res = await fetch(
        `http://localhost:5000/api/interview/feedback/${id}`
      );
      const data = await res.json();

      if (!data.feedback) {
        setTimeout(fetchFeedback, 1000); // retry
        return;
      }

      setFeedback(data.feedback);
      setScore(data.score);
    };

    fetchFeedback();
  }, [id]);

  if (!feedback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        🧠 Generating AI feedback...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[600px]">
        <h2 className="text-2xl font-bold mb-4">📊 Interview Feedback</h2>

        <p className="text-lg font-semibold mb-4">
          Score: <span className="text-green-600">{score}/10</span>
        </p>

        <p className="whitespace-pre-line text-gray-700">{feedback}</p>
      </div>
    </div>
  );
};

export default InterviewFeedback;
