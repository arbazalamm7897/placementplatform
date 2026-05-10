import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart, BookOpen, FileText } from "lucide-react";

const PlacementPrep = () => {
  const navigate = useNavigate();

  const modules = [
    {
      name: "Core Subjects",
      desc: "DSA, DBMS, OOP, OS, CN - all core subjects for placements.",
      icon: <BookOpen className="h-10 w-10 text-cyan-200" />,
      path: "/placement-prep/core-subjects",
      img: "https://plus.unsplash.com/premium_photo-1750859860309-ce707c193ea5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    },
    {
      name: "Aptitude",
      desc: "Quant, logical reasoning, verbal ability, and mock tests.",
      icon: <BarChart className="h-10 w-10 text-cyan-200" />,
      path: "/placement-prep/aptitude",
      img: "https://plus.unsplash.com/premium_photo-1753715474322-99cb33f60e2f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    },
    {
      name: "Resume Analyzer",
      desc: "Upload your resume and get AI-based suggestions to improve it.",
      icon: <FileText className="h-10 w-10 text-cyan-200" />,
      path: "/placement-prep/resume-analyzer",
      img: "https://images.unsplash.com/photo-1698047681432-006d2449c631?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    },
  ];

  return (
    <div className="page-shell">
      <div className="page-content">
        <div className="hero-panel">
          <p className="section-badge">Placement Preparation</p>
          <h1 className="heading-lg mt-6">Sharpen every part of your placement journey.</h1>
          <p className="body-lg mt-4 max-w-3xl">
            Build stronger fundamentals, raise your aptitude confidence, and refine
            your resume with an interface designed like a premium AI learning suite.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((m) => (
            <div
              key={m.name}
              onClick={() => navigate(m.path)}
              className="feature-card group cursor-pointer"
            >
              <img
                src={m.img}
                alt={m.name}
                className="absolute inset-0 h-full w-full object-cover opacity-20 transition duration-500 group-hover:scale-105 group-hover:opacity-30"
              />

              <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/70 to-cyan-950/35" />

              <div className="relative flex min-h-[300px] flex-col justify-between">
                <div className="icon-badge">{m.icon}</div>

                <div>
                  <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-white">
                    {m.name}
                  </h2>
                  <p className="body-sm mt-3 text-slate-300">{m.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition group-hover:text-white">
                    Open module
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacementPrep;
