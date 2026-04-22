import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, Upload } from "lucide-react";
import { startInterview as startInterviewRequest } from "../services/api";

const AIInterviewHome = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isStarting, setIsStarting] = useState(false);
  const navigate = useNavigate();

  const speechSupported = useMemo(() => {
    if (typeof window === "undefined") return false;
    return Boolean(
      window.speechSynthesis &&
        (window.SpeechRecognition || window.webkitSpeechRecognition)
    );
  }, []);

  const requestMicrophoneAccess = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error("This browser does not support microphone access.");
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => track.stop());
    sessionStorage.setItem("micPermissionReady", "true");
  };

  const startInterview = async () => {
    if (!file) {
      setError("Please upload your resume first.");
      return;
    }

    try {
      setIsStarting(true);
      setError("");

      await requestMicrophoneAccess();

      const formData = new FormData();
      formData.append("resume", file);
      const storedUser = localStorage.getItem("user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      formData.append("userId", parsedUser?._id || parsedUser?.id || "guest-user");

      const { data } = await startInterviewRequest(formData);

      navigate(`/ai-interview/session/${data.sessionId}`);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          err.message ||
          "Microphone permission or backend access failed"
      );
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-xl">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Mic className="w-8 h-8 text-green-600" />
          <h2 className="text-2xl font-bold text-center">
            AI Interview Assistant
          </h2>
        </div>

        <p className="text-center text-gray-600 mb-6">
          Upload your resume to begin a voice-guided mock interview with spoken
          questions, listening, and quick feedback after every answer.
        </p>

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-green-500 rounded-2xl p-6 cursor-pointer">
          <Upload className="w-10 h-10 text-green-600 mb-2" />
          <span className="text-green-700 text-center">
            {file ? file.name : "Click to upload resume (PDF)"}
          </span>
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setError("");
            }}
          />
        </label>

        <div className="mt-4 rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-900">
          {speechSupported
            ? "Voice features are available in this browser."
            : "Voice recognition is not fully available in this browser, so you can still type answers manually."}
        </div>

        {error && (
          <div className="mt-4 rounded-2xl bg-red-100 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <button
          onClick={startInterview}
          disabled={isStarting}
          className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl disabled:opacity-60"
        >
          {isStarting ? "Starting..." : "Start Interview"}
        </button>
      </div>
    </div>
  );
};

export default AIInterviewHome;
