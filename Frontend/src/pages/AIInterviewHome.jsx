import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, Upload } from "lucide-react";
import {
  getApiErrorMessage,
  startInterview as startInterviewRequest,
} from "../services/api";

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

      const { data } = await startInterviewRequest(formData);

      navigate(`/ai-interview/session/${data.sessionId}`);
    } catch (err) {
      console.error(err);
      setError(getApiErrorMessage(err, "Microphone permission or backend access failed"));
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div className="page-shell flex items-center justify-center px-4 pb-6 pt-24 sm:px-6 sm:pt-28">
      <div className="glass-card w-full max-w-2xl p-6 sm:p-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="icon-badge">
            <Mic className="h-6 w-6" />
          </span>
          <h2 className="heading-lg text-center text-[2rem] sm:text-[2.4rem]">
            AI Interview Assistant
          </h2>
        </div>

        <p className="body-lg mb-6 text-center">
          Upload your resume to begin a voice-guided mock interview with spoken
          questions, listening, and quick feedback after every answer.
        </p>

        <label className="surface-muted flex min-h-[210px] cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-cyan-300/30 p-6 text-center transition hover:border-cyan-300/50 hover:bg-white/10 sm:min-h-[230px]">
          <Upload className="mb-3 h-10 w-10 text-cyan-200" />
          <span className="text-lg font-semibold text-white">
            {file ? file.name : "Click to upload resume (PDF)"}
          </span>
          <span className="mt-2 text-sm text-slate-400">
            A polished resume helps the AI tailor questions more accurately.
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

        <div className="surface-muted mt-4 px-4 py-3 text-sm text-slate-300">
          {speechSupported
            ? "Voice features are available in this browser."
            : "Voice recognition is not fully available in this browser, so you can still type answers manually."}
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        )}

        <button
          onClick={startInterview}
          disabled={isStarting}
          className="primary-button mt-6 w-full"
        >
          {isStarting ? "Starting..." : "Start Interview"}
        </button>
      </div>
    </div>
  );
};

export default AIInterviewHome;
