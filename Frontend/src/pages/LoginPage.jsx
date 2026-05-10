import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Bot, ShieldCheck } from "lucide-react";
import { getApiErrorMessage, login } from "../services/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await login({ email, password });

      if (!data.token || !data.user) {
        setError(data.message || "Invalid response from server");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/student/dashboard");
    } catch (err) {
      setError(getApiErrorMessage(err, "Something went wrong"));
    }
  };

  return (
    <div className="page-shell flex items-center justify-center px-4 pb-6 pt-24 sm:px-6 sm:pt-28">
      <div className="page-content flex w-full max-w-5xl items-center justify-center">
        <div className="glass-card grid w-full max-w-4xl overflow-hidden lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative hidden min-h-full overflow-hidden border-r border-white/10 bg-white/[0.03] p-8 lg:block xl:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(167,139,250,0.18),transparent_28%)]" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <span className="section-badge">Welcome Back</span>
                <h1 className="heading-lg mt-6 max-w-md text-balance">
                  Practice smarter and return exactly where you left off.
                </h1>
                <p className="body-lg mt-4 max-w-md">
                  Log in to continue your coding practice, resume prep, and AI
                  interview sessions from one place.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="surface-muted flex items-start gap-4 p-4">
                  <span className="icon-badge h-12 w-12 shrink-0 rounded-2xl">
                    <Bot className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-base font-semibold text-white">
                      AI-powered preparation
                    </h2>
                    <p className="body-sm mt-1">
                      Keep your interview, aptitude, and coding practice aligned
                      in one focused workspace.
                    </p>
                  </div>
                </div>
                <div className="surface-muted flex items-start gap-4 p-4">
                  <span className="icon-badge h-12 w-12 shrink-0 rounded-2xl">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-base font-semibold text-white">
                      Secure account access
                    </h2>
                    <p className="body-sm mt-1">
                      Your saved progress and personalized sessions stay ready
                      every time you come back.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mx-auto w-full max-w-md">
              <span className="section-badge">Login</span>
              <h2 className="heading-lg mt-5">Sign in to your account</h2>
              <p className="body-sm mt-3">
                Enter your credentials and continue your placement preparation.
              </p>

              {error && (
                <div className="mt-5 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {error}
                </div>
              )}

              {successMessage && !error && (
                <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                  Login
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-slate-400">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-cyan-200 transition hover:text-white"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
