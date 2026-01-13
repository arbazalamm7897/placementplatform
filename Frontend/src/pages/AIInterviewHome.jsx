import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";

const AIInterviewHome = () => {
  // ✅ DEFINE STATE
  const [file, setFile] = useState(null);

  // ✅ DEFINE NAVIGATE
  const navigate = useNavigate();

  const startInterview = async () => {
    if (!file) {
      alert("Please upload your resume");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("userId", "123");

      const res = await fetch("http://localhost:5000/api/interview/start", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.sessionId) {
        navigate(`/ai-interview/session/${data.sessionId}`);
      } else {
        alert("Interview could not start");
      }
    } catch (err) {
      console.error(err);
      alert("Backend not reachable");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">
          AI Interview Assistant
        </h2>

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-green-500 rounded-2xl p-6 cursor-pointer">
          <Upload className="w-10 h-10 text-green-600 mb-2" />
          <span className="text-green-700">
            {file ? file.name : "Click to upload resume (PDF)"}
          </span>
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        <button
          onClick={startInterview}
          className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl"
        >
          Start Interview
        </button>
      </div>
    </div>
  );
};

export default AIInterviewHome;
