import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Mic, Send, Volume2 } from "lucide-react";
import {
  getApiErrorMessage,
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
      setError(getApiErrorMessage(err, "Could not fetch question"));
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
        setError(getApiErrorMessage(err, "Could not submit answer"));
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
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

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
          setError("I didn't catch that. Please speak again.");
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

        setError(
          `Voice recognition issue: ${event.error}. Please try listening again.`
        );
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

  const replayQuestion = () => {
    if (!question) {
      return;
    }

    speakText(`Question ${questionIndex || 1}. ${question}`);
  };

  const statusToneClass =
    phase === "listening"
      ? "border-emerald-300/20 bg-emerald-400/10 text-emerald-100"
      : phase === "thinking"
        ? "border-amber-300/20 bg-amber-400/10 text-amber-100"
        : phase === "error"
          ? "border-rose-300/20 bg-rose-400/10 text-rose-100"
          : "border-cyan-300/20 bg-cyan-400/10 text-cyan-100";

  const progressWidth = Math.max(
    totalQuestions ? Math.round((questionIndex / totalQuestions) * 100) : 12,
    12
  );

  const botMessage =
    phase === "loading"
      ? "Generating next question..."
      : phase === "processing"
        ? "Analyzing your answer..."
        : question || "Waiting for the first question...";

  return (
    <div className="page-shell overflow-hidden px-3 pb-3 pt-20 sm:px-4 sm:pt-24">
      <div className="page-content">
        <section
          className="glass-panel relative overflow-hidden rounded-[30px] p-3 sm:p-4"
          style={{ height: "calc(100dvh - 6.25rem)" }}
        >
          <div className="absolute -right-10 top-6 h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="absolute left-0 top-0 h-32 w-32 rounded-full bg-sky-400/10 blur-3xl" />

          <div className="relative flex h-full flex-col gap-3">
            {error ? (
              <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-100">
                {error}
              </div>
            ) : null}

            <div className="grid min-h-0 flex-1 gap-0 overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(9,16,30,0.68),rgba(8,14,24,0.58))] lg:grid-cols-2">
              <section className="flex min-h-0 flex-col border-r border-white/10 p-5">
                <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.32em] text-slate-500">
                      AI Interviewer
                    </p>
                    <h2 className="mt-2 font-['Space_Grotesk'] text-[2rem] font-bold tracking-tight text-white">
                      AI Interviewer-Bot
                    </h2>
                  </div>
                  <button
                    onClick={replayQuestion}
                    disabled={!question}
                    className="secondary-button gap-2 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Volume2 className="h-4 w-4" />
                    Replay
                  </button>
                </div>

                <div className="mt-4 flex min-h-0 flex-1 flex-col gap-4">
                  <div className="relative flex h-[190px] flex-none items-center justify-center rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(56,189,248,0.18),transparent_42%),linear-gradient(180deg,rgba(10,20,36,0.95),rgba(7,14,26,0.92))] shadow-[0_24px_65px_rgba(2,6,23,0.32)]">
                    <div className="absolute right-5 top-5">
                      <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusToneClass}`}>
                        {phase === "thinking" ? `${countdown}s` : phase}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="relative h-24 w-24 rounded-full border border-white/10 bg-[radial-gradient(circle_at_50%_32%,rgba(255,255,255,0.2),rgba(51,65,85,0.95))] shadow-[0_20px_45px_rgba(15,23,42,0.45)]">
                        <div className="absolute left-5 top-8 h-3 w-3 rounded-full bg-cyan-100 shadow-[0_0_18px_rgba(207,250,254,0.85)]" />
                        <div className="absolute right-5 top-8 h-3 w-3 rounded-full bg-cyan-100 shadow-[0_0_18px_rgba(207,250,254,0.85)]" />
                        <div
                          className={`absolute left-1/2 top-[62%] -translate-x-1/2 rounded-full bg-cyan-200 transition-all duration-300 ${
                            phase === "asking"
                              ? "h-3 w-9 animate-pulse"
                              : phase === "listening"
                                ? "h-2 w-7"
                                : phase === "processing" || phase === "loading"
                                  ? "h-1.5 w-5"
                                  : "h-1 w-4"
                          }`}
                        />
                      </div>
                      <div className="mt-4 flex h-16 w-32 items-start justify-center rounded-t-[38px] border border-white/10 border-b-0 bg-[linear-gradient(180deg,rgba(56,189,248,0.14),rgba(15,23,42,0.24))] pt-3.5">
                        <div className="h-7 w-16 rounded-full border border-cyan-100/10 bg-cyan-200/10" />
                      </div>
                    </div>
                  </div>

                  <div className="surface-muted relative px-5 py-5">
                    <div className="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t border-cyan-300/30 bg-[rgba(20,36,61,0.96)]" />
                    <p className="text-[1.05rem] leading-8 text-slate-100">
                      {botMessage}
                    </p>
                  </div>

                  <div className="surface-muted px-4 py-3">
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-slate-400">
                      <span>Interview Progress</span>
                      <span>
                        Question {questionIndex || 1}
                        {totalQuestions ? ` / ${totalQuestions}` : ""}
                      </span>
                    </div>
                    <div className="h-4 overflow-hidden rounded-full p-1">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 transition-all duration-700"
                        style={{ width: `${progressWidth}%` }}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="flex min-h-0 flex-col p-5">
                <div className="border-b border-white/10 pb-4">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-slate-500">
                    Candidate
                  </p>
                  <h2 className="mt-2 font-['Space_Grotesk'] text-[2rem] font-bold tracking-tight text-white">
                    Candidate
                  </h2>
                </div>

                <div className="mt-4 flex min-h-0 flex-1 flex-col gap-4">
                  <div className="relative flex items-center justify-center py-2">
                    <button
                      onClick={recognitionEnabled ? beginListening : enableMicrophoneAndContinue}
                      disabled={phase === "processing" || permissionPending}
                      className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/30 bg-gradient-to-b from-cyan-300 to-sky-400 text-slate-950 shadow-[0_14px_28px_rgba(56,189,248,0.24)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Mic className="h-5 w-5" />
                    </button>
                    {phase === "listening" ? (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="h-16 w-16 animate-ping rounded-full border border-emerald-300/20 bg-emerald-300/5" />
                      </div>
                    ) : null}
                  </div>

                  <div className="flex min-h-0 flex-1 flex-col rounded-[30px] border border-white/10 bg-slate-950/35 p-5 shadow-[0_22px_55px_rgba(2,6,23,0.2)]">
                    <textarea
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder={
                        recognitionEnabled
                          ? "Type your answer here or use the microphone..."
                          : "Type your answer here..."
                      }
                      className="input-shell min-h-0 flex-1 resize-none text-[1.02rem] leading-7"
                    />

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="text-sm text-slate-400">
                        {canRetryListening
                          ? "Voice input stopped. You can retry."
                          : "Edit your answer if needed, then submit."}
                      </div>
                      <button
                        onClick={() => submitAnswer(answer)}
                        disabled={!answer.trim() || phase === "processing" || phase === "loading"}
                        className="primary-button gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Send className="h-4 w-4" />
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InterviewSession;
