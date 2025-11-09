import React from "react";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ✅ Background Image with blur */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 blur-sm"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1488998427799-e3362cec87c3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170')",
        }}
      ></div>

      {/* ✅ Dark transparent layer (for readability, very light) */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* ✅ Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl font-extrabold text-green-700 mb-4 drop-shadow-lg">
          Welcome to Career Bridge
        </h1>
        <p className="text-white text-lg max-w-2xl mx-auto mb-6 drop-shadow-md">
  A unified platform connecting students and recruiters for a smarter,
  faster, and more transparent placement process.
</p>
        <div className="space-x-4">
          <a
            href="/login"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow-lg transition"
          >
            Login
          </a>
          <a
            href="/signup"
            className="px-6 py-3 bg-transparent border border-green-600 text-green-700 hover:bg-green-600 hover:text-white rounded-lg font-semibold transition"
          >
            Signup
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
