import React from "react";
import { Bot, LayoutDashboard, LogOut, Moon, Sparkles, Sun } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ theme, onToggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-[24px] px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3 transition hover:opacity-90">
          <span className="icon-badge h-11 w-11 rounded-2xl text-cyan-200">
            <Bot className="h-5 w-5" />
          </span>
          <span>
            <span className="block font-['Space_Grotesk'] text-lg font-bold tracking-wide text-white sm:text-xl">
              Career Bridge
            </span>
            <span className="block text-[11px] uppercase tracking-[0.28em] text-slate-400">
              AI Career Platform
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onToggleTheme}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/15 hover:text-white"
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-4 w-4" />
                Light
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                Dark
              </>
            )}
          </button>
          {!user ? (
            <>
              <Link
                to="/"
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  location.pathname === "/"
                    ? "bg-white/12 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                Home
              </Link>
              <Link
                to="/login"
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  location.pathname === "/login"
                    ? "bg-white/12 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  location.pathname === "/signup"
                    ? "bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 text-slate-950"
                    : "bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                <Sparkles className="h-4 w-4" />
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/student/dashboard"
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                  location.pathname === "/student/dashboard"
                    ? "bg-white/12 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-rose-500/20 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
