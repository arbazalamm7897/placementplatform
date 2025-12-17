import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const InterviewSession = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState("Tell me about yourself");
  const [answer, setAnswer] = useState("");

  const submitAnswer = () => {
    console.log("Answer:", answer);
    setAnswer("");
    setQuestion("Why should we hire you?");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">
        <h2 className="text-xl font-semibold mb-4">AI Interviewer</h2>

        <p className="mb-4 font-medium">{question}</p>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows="4"
          className="w-full border rounded-lg p-2 mb-4"
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
