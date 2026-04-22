import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderCircle, Mic, Volume2 } from "lucide-react";
import {
  getInterviewQuestion,
  submitInterviewAnswer as submitInterviewAnswerRequest,
} from "../services/api";

const THINK_TIME_SECONDS = 5;
const ANSWER_END_MS = 1500;

const InterviewSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [phase, setPhase] = useState("loading");
  const [question, setQuestion] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [recognitionEnabled, setRecognitionEnabled] = useState(false);
  const [countdown, setCountdown] = useState(THINK_TIME_SECONDS);
  const [permissionPending, setPermissionPending] = useState(false);
  const [canRetryListening, setCanRetryListening] = useState(false);

  const recognitionRef = useRef(null);
  const micStreamRef = useRef(null);
  const phaseRef = useRef("loading");
  const greetingDoneRef = useRef(false);
  const isSubmittingRef = useRef(false);
  const answerTimeoutRef = useRef(null);
  const thinkIntervalRef = useRef(null);
  const currentTranscriptRef = useRef("");
  const recognitionStartedRef = useRef(false);

  const clearTimers = useCallback(() => {
    if (answerTimeoutRef.current) {
      clearTimeout(answerTimeoutRef.current);
      answerTimeoutRef.current = null;
    }

    if (thinkIntervalRef.current) {
      clearInterval(thinkIntervalRef.current);
      thinkIntervalRef.current = null;
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error("Speech recognition stop failed", err);
      }
    }
    recognitionStartedRef.current = false;
  }, []);

  const requestMicrophoneAccess = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error("This browser does not support microphone access.");
    }

    setPermissionPending(true);

    if (!micStreamRef.current) {
      micStreamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    }

    sessionStorage.setItem("micPermissionReady", "true");
    setPermissionPending(false);
  }, []);

  const releaseMicrophone = useCallback(() => {
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }
  }, []);

  const speakText = useCallback(
    (text, onEnd) => {
      if (
        typeof window === "undefined" ||
        !window.speechSynthesis ||
        !speechEnabled
      ) {
        if (onEnd) onEnd();
        return;
      }

      stopSpeaking();

      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find((voice) =>
        voice.lang.toLowerCase().startsWith("en")
      );

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.rate = 0.96;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.onend = () => {
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    },
    [speechEnabled, stopSpeaking]
  );

  const fetchQuestion = useCallback(async () => {
    try {
      clearTimers();
      stopListening();
      setError("");
      setAnswer("");
      currentTranscriptRef.current = "";
      isSubmittingRef.current = false;
      setPhase("loading");
      phaseRef.current = "loading";

      const { data } = await getInterviewQuestion(id);

      if (data.done) {
        navigate(`/ai-interview/feedback/${id}`);
        return;
      }

      setQuestion(data.question);
      setQuestionIndex((data.currentIndex || 0) + 1);
      setTotalQuestions(data.totalQuestions || 0);
      setCanRetryListening(false);
      setPhase("asking");
      phaseRef.current = "asking";
    } catch (err) {
      console.error("Fetch question failed:", err);
      setError(err.message || "Could not fetch question");
      setPhase("error");
      phaseRef.current = "error";
    }
  }, [clearTimers, id, navigate, stopListening]);

  const submitAnswer = useCallback(
    async (finalAnswer) => {
      const trimmedAnswer = finalAnswer.trim();

      if (!trimmedAnswer || isSubmittingRef.current) {
        return;
      }

      isSubmittingRef.current = true;
      clearTimers();
      stopListening();
      setAnswer(trimmedAnswer);
      setPhase("processing");
      phaseRef.current = "processing";

      try {
        const { data } = await submitInterviewAnswerRequest(id, {
          answer: trimmedAnswer,
        });

        if (data.done) {
          navigate(`/ai-interview/feedback/${id}`);
          return;
        }

        isSubmittingRef.current = false;
        fetchQuestion();
      } catch (err) {
        console.error("Submit answer failed:", err);
        isSubmittingRef.current = false;
        setError(
          err.response?.data?.error || err.message || "Could not submit answer"
        );
        setPhase("error");
        phaseRef.current = "error";
      }
    },
    [clearTimers, fetchQuestion, id, navigate, stopListening]
  );

  const beginListening = useCallback(() => {
    if (
      !recognitionRef.current ||
      isSubmittingRef.current ||
      recognitionStartedRef.current
    ) {
      return;
    }

    setError("");
    setAnswer("");
    setCanRetryListening(false);
    currentTranscriptRef.current = "";
    setPhase("listening");
    phaseRef.current = "listening";

    const attemptStart = (delay) => {
      window.setTimeout(() => {
        try {
          recognitionRef.current.start();
          recognitionStartedRef.current = true;
        } catch (err) {
          console.error("Speech recognition start failed", err);

          if (delay < 1200) {
            attemptStart(delay + 400);
            return;
          }

          setError("Listening could not start yet. Try listening again.");
          setCanRetryListening(true);
          setPhase("listening");
          phaseRef.current = "listening";
          recognitionStartedRef.current = false;
        }
      }, delay);
    };

    attemptStart(0);
  }, []);

  const enableMicrophoneAndContinue = useCallback(async () => {
    try {
      setError("");
      await requestMicrophoneAccess();
      setCanRetryListening(false);
      beginListening();
    } catch (err) {
      console.error("Microphone permission request failed", err);
      setError(
        err.message ||
          "Microphone permission was blocked. Please allow access in the browser and try again."
      );
      setPhase("error");
      phaseRef.current = "error";
    } finally {
      setPermissionPending(false);
    }
  }, [beginListening, requestMicrophoneAccess]);

  const startThinkingPause = useCallback(() => {
    setCountdown(THINK_TIME_SECONDS);
    setPhase("thinking");
    phaseRef.current = "thinking";

    speakText("Hold on and think.", () => {});

    clearTimers();
    thinkIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(thinkIntervalRef.current);
          thinkIntervalRef.current = null;
          beginListening();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  }, [beginListening, clearTimers, speakText]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    setSpeechEnabled(Boolean(window.speechSynthesis));

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const initializeInterview = async () => {
      const micPreviouslyGranted =
        sessionStorage.getItem("micPermissionReady") === "true";

      if (micPreviouslyGranted) {
        try {
          await requestMicrophoneAccess();
        } catch (err) {
          console.error("Microphone warm-up failed", err);
        }
      }

      if (!SpeechRecognition) {
        setRecognitionEnabled(false);
        fetchQuestion();
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        let combinedTranscript = "";

        for (let i = 0; i < event.results.length; i += 1) {
          combinedTranscript += `${event.results[i][0].transcript} `;
        }

        const fullTranscript = combinedTranscript.trim();
        currentTranscriptRef.current = fullTranscript;
        setAnswer(fullTranscript);
        setCanRetryListening(false);

        if (answerTimeoutRef.current) {
          clearTimeout(answerTimeoutRef.current);
        }

        answerTimeoutRef.current = setTimeout(() => {
          submitAnswer(currentTranscriptRef.current);
        }, ANSWER_END_MS);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        clearTimers();
        recognitionStartedRef.current = false;

        if (event.error === "aborted") {
          return;
        }

        if (event.error === "no-speech") {
          setError("I didn’t catch that. Please speak again.");
          setCanRetryListening(true);
          setPhase("listening");
          phaseRef.current = "listening";
          return;
        }

        if (
          event.error === "not-allowed" ||
          event.error === "service-not-allowed"
        ) {
          sessionStorage.removeItem("micPermissionReady");
          releaseMicrophone();
          setError(
            "Microphone permission was blocked. Enable microphone access to continue the interview."
          );
          setCanRetryListening(false);
          setPhase("error");
          phaseRef.current = "error";
          return;
        }

        setError(`Voice recognition issue: ${event.error}. Please try listening again.`);
        setCanRetryListening(true);
        setPhase("listening");
        phaseRef.current = "listening";
      };

      recognition.onend = () => {
        recognitionStartedRef.current = false;

        if (
          phaseRef.current === "listening" &&
          currentTranscriptRef.current.trim() &&
          !isSubmittingRef.current
        ) {
          if (answerTimeoutRef.current) {
            clearTimeout(answerTimeoutRef.current);
          }

          answerTimeoutRef.current = setTimeout(() => {
            submitAnswer(currentTranscriptRef.current);
          }, ANSWER_END_MS);
        } else if (
          phaseRef.current === "listening" &&
          !currentTranscriptRef.current.trim() &&
          !isSubmittingRef.current
        ) {
          setCanRetryListening(true);
        }
      };

      recognitionRef.current = recognition;
      setRecognitionEnabled(true);
      fetchQuestion();
    };

    initializeInterview();

    return () => {
      clearTimers();
      stopListening();
      stopSpeaking();
      releaseMicrophone();
    };
  }, [
    clearTimers,
    fetchQuestion,
    releaseMicrophone,
    requestMicrophoneAccess,
    stopListening,
    stopSpeaking,
    submitAnswer,
  ]);

  useEffect(() => {
    if (phase !== "asking" || !question) {
      return;
    }

    const greeting = greetingDoneRef.current
      ? ""
      : "Hello, welcome to your mock interview. ";

    greetingDoneRef.current = true;

    speakText(`${greeting}Question ${questionIndex}. ${question}`, () => {
      startThinkingPause();
    });
  }, [phase, question, questionIndex, speakText, startThinkingPause]);

  const listeningIndicator = (
    <div className="flex items-center justify-center gap-2">
      <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
      <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse [animation-delay:150ms]" />
      <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse [animation-delay:300ms]" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto mt-16 rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI Interviewer</h2>
            <p className="text-gray-600">
              Question {questionIndex || 1}
              {totalQuestions ? ` of ${totalQuestions}` : ""}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-green-700">
            <Volume2 className="h-4 w-4" />
            <span className="text-sm font-medium">
              {speechEnabled ? "Voice enabled" : "Text mode"}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-5 rounded-2xl bg-red-100 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300">
          <p className="mb-2 text-sm uppercase tracking-wide text-gray-500">
            Current question
          </p>
          <p className="text-lg font-medium text-gray-900">
            {question || "Preparing your interview..."}
          </p>
        </div>

        <div className="mt-6 rounded-3xl border border-green-100 bg-green-50 p-6 transition-all duration-300">
          {phase === "loading" && (
            <p className="text-green-800">Preparing your interview...</p>
          )}

          {phase === "asking" && (
            <div className="flex items-center gap-3 text-green-900">
              <Volume2 className="h-5 w-5" />
              <p className="font-medium">The bot is asking the question.</p>
            </div>
          )}

          {phase === "thinking" && (
            <div className="space-y-3 text-center">
              <p className="font-medium text-green-900">Hold and think...</p>
              <p className="text-green-700">
                Listening will start in {countdown} seconds.
              </p>
            </div>
          )}

          {phase === "listening" && (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-green-600 shadow-sm">
                <Mic className="h-6 w-6" />
              </div>
              {listeningIndicator}
              <p className="font-medium text-green-900">
                Listening to your answer...
              </p>
              {canRetryListening && (
                <button
                  onClick={beginListening}
                  className="rounded-xl bg-green-600 px-5 py-3 text-white"
                >
                  Try Listening Again
                </button>
              )}
            </div>
          )}

          {phase === "processing" && (
            <div className="space-y-4 text-center">
              <LoaderCircle className="mx-auto h-7 w-7 animate-spin text-green-600" />
              <p className="font-medium text-green-900">
                Processing your answer and moving to the next question...
              </p>
            </div>
          )}

          {phase === "error" && (
            <div className="space-y-3 text-center">
              <p className="text-green-900">
                Microphone permission is needed to continue this interview.
              </p>
              <button
                onClick={enableMicrophoneAndContinue}
                disabled={permissionPending}
                className="rounded-xl bg-green-600 px-5 py-3 text-white disabled:opacity-60"
              >
                {permissionPending ? "Enabling Microphone..." : "Enable Microphone"}
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5">
          <p className="mb-3 text-sm text-gray-500">
            Your spoken answer will appear here.
          </p>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows="6"
            placeholder={
              recognitionEnabled
                ? "Start speaking when the listening animation appears..."
                : "Voice recognition is unavailable, so type your answer here..."
            }
            className="w-full rounded-2xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {!recognitionEnabled && (
            <button
              onClick={() => submitAnswer(answer)}
              disabled={!answer.trim() || phase === "processing"}
              className="mt-4 rounded-xl bg-green-600 px-6 py-3 text-white disabled:opacity-60"
            >
              Submit Answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewSession;
