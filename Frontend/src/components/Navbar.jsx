import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className={`text-2xl font-bold transition ${
            user ? "text-green-600" : "text-white"
          }`}
        >
          Career Bridge
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6 flex items-center">
          {!user ? (
            <>
              <Link
                to="/"
                className={`text-lg font-medium transition hover:text-green-500 ${
                  location.pathname === "/" ? "text-green-600" : "text-white"
                }`}
              >
                Home
              </Link>
              <Link
                to="/login"
                className={`text-lg font-medium transition hover:text-green-500 ${
                  location.pathname === "/login"
                    ? "text-green-600"
                    : "text-white"
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`text-lg font-medium transition hover:text-green-500 ${
                  location.pathname === "/signup"
                    ? "text-green-600"
                    : "text-white"
                }`}
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/student/dashboard"
                className={`text-lg font-medium transition hover:text-green-700 ${
                  location.pathname === "/student/dashboard"
                    ? "text-green-600"
                    : "text-green-700"
                }`}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-lg font-medium transition hover:text-red-600"
              >
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
