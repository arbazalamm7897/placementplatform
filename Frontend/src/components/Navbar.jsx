import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-600 hover:text-green-700 transition"
        >
          Career Bridge
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6">
          <Link
            to="/"
            className={`text-lg font-medium transition ${
              location.pathname === "/"
                ? "text-green-600"
                : "text-white hover:text-green-500"
            }`}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={`text-lg font-medium transition ${
              location.pathname === "/about"
                ? "text-green-600"
                : "text-white hover:text-green-500"
            }`}
          >
            About
          </Link>

          <Link
            to="/contact"
            className={`text-lg font-medium transition ${
              location.pathname === "/contact"
                ? "text-green-600"
                : "text-white hover:text-green-500"
            }`}
          >
            Contact
          </Link>

          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
