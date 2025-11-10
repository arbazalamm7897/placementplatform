import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, BarChart, FileText } from "lucide-react"; // icons for cards

const PlacementPrep = () => {
  const navigate = useNavigate();

  const modules = [
    {
      name: "Core Subjects",
      desc: "DSA, DBMS, OOP, OS, CN - all core subjects for placements.",
      icon: <BookOpen className="w-10 h-10 text-green-600" />,
      path: "/placement-prep/core-subjects",
      img: "https://plus.unsplash.com/premium_photo-1750859860309-ce707c193ea5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    },
    {
      name: "Aptitude",
      desc: "Quant, Logical Reasoning, Verbal Ability, and Mock Tests.",
      icon: <BarChart className="w-10 h-10 text-blue-600" />,
      path: "/placement-prep/aptitude",
      img: "https://plus.unsplash.com/premium_photo-1753715474322-99cb33f60e2f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=117",
    },
    {
      name: "Resume Analyzer",
      desc: "Upload your resume and get AI-based suggestions to improve it.",
      icon: <FileText className="w-10 h-10 text-purple-600" />,
      path: "/placement-prep/resume-analyzer",
      img: "https://images.unsplash.com/photo-1698047681432-006d2449c631?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6 pt-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">
          Placement Preparation
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((m) => (
            <div
              key={m.name}
              onClick={() => navigate(m.path)}
              className="relative rounded-3xl overflow-hidden shadow-lg transform transition hover:scale-105 cursor-pointer group"
            >
              {/* Background Image */}
              <img
                src={m.img}
                alt={m.name}
                className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:brightness-90 transition"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition"></div>

              {/* Content */}
              <div className="relative p-6 flex flex-col justify-end h-64 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-white/90 p-3 rounded-full shadow-inner">
                    {m.icon}
                  </div>
                  <h2 className="text-2xl font-semibold drop-shadow-md">
                    {m.name}
                  </h2>
                </div>
                <p className="text-sm text-gray-100">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacementPrep;
