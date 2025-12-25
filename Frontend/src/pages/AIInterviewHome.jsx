import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";

const AIInterviewHome = () => {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const navigate = useNavigate();

  // Read PDF as text
  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    // Convert PDF to text in frontend (optional) or send file to backend
    const formData = new FormData();
    formData.append("resume", uploadedFile);

    try {
      const res = await fetch("http://localhost:5000/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.resumeText) setResumeText(data.resumeText);
    } catch (err) {
      console.error(err);
      alert("Failed to parse resume");
    }
  };

  const startInterview = async () => {
    if (!resumeText) {
      alert("Please upload your resume");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/interview/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          userId: "123", // replace with real userId
        }),
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
        <h2 className="text-2xl font-bold text-center mb-2">AI Interview Assistant</h2>
        <p className="text-gray-500 text-center mb-6">
          Upload your resume to begin your interview
        </p>

        {/* Upload Box */}
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-green-500 rounded-2xl p-6 cursor-pointer hover:bg-green-50 transition">
          <Upload className="w-10 h-10 text-green-600 mb-2" />
          <span className="font-medium text-green-700">
            {file ? file.name : "Click to upload resume (PDF)"}
          </span>
          <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
        </label>

        <button
          onClick={startInterview}
          className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
        >
          Start Interview
        </button>
      </div>
    </div>
  );
};

export default AIInterviewHome;
