import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Mic, Sparkles } from "lucide-react";
import { getApiErrorMessage, signup } from "../services/api";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup({ name, email, password });
      navigate("/login", {
        state: { message: "Account created successfully. Please log in." },
      });
    } catch (err) {
      setError(getApiErrorMessage(err, "Something went wrong"));
    }
  };

  return (
    <div className="page-shell flex items-center justify-center px-4 pb-6 pt-24 sm:px-6 sm:pt-28">
      <div className="page-content flex w-full max-w-5xl items-center justify-center">
        <div className="glass-card grid w-full max-w-4xl overflow-hidden lg:grid-cols-[0.98fr_1.02fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mx-auto w-full max-w-md">
              <span className="section-badge">Signup</span>
              <h2 className="heading-lg mt-5">Create your account</h2>
              <p className="body-sm mt-3">
                Join the platform to unlock resume analysis, coding practice,
                and AI interview sessions.
              </p>

              {error && (
                <div className="mt-5 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-shell"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-shell"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-shell"
                />
                <button type="submit" className="primary-button w-full gap-2">
                  Create account
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-slate-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-cyan-200 transition hover:text-white"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>

          <div className="relative hidden min-h-full overflow-hidden border-l border-white/10 bg-white/[0.03] p-8 lg:block xl:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.14),transparent_28%)]" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <span className="section-badge">Career Bridge</span>
                <h1 className="heading-lg mt-6 max-w-md text-balance">
                  Build a stronger placement routine from your very first login.
                </h1>
                <p className="body-lg mt-4 max-w-md">
                  Track your progress, sharpen interview answers, and organize
                  your preparation in a single dashboard.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="surface-muted flex items-start gap-4 p-4">
                  <span className="icon-badge h-12 w-12 shrink-0 rounded-2xl">
                    <Mic className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-base font-semibold text-white">
                      Voice mock interviews
                    </h2>
                    <p className="body-sm mt-1">
                      Practice real-time answers with AI-guided interview rounds
                      tailored to your resume.
                    </p>
                  </div>
                </div>
                <div className="surface-muted flex items-start gap-4 p-4">
                  <span className="icon-badge h-12 w-12 shrink-0 rounded-2xl">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-base font-semibold text-white">
                      Personalized preparation
                    </h2>
                    <p className="body-sm mt-1">
                      Keep aptitude, coding, and resume work moving together
                      with one clean flow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
