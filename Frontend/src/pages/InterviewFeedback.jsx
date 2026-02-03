import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InterviewFeedback = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/interview/feedback/${id}`)
      .then(res => res.json())
      .then(data => setFeedback(data.feedback));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[600px]">
        <h2 className="text-2xl font-bold mb-4">Interview Feedback</h2>
        <pre className="whitespace-pre-wrap text-gray-800">
          {feedback}
        </pre>
      </div>
    </div>
  );
};

export default InterviewFeedback;
