import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, BarChart, Briefcase, Code, Mic } from "lucide-react";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.name);
    }
  }, []);

  const modules = [
    {
      name: "Placement Prep",
      desc: "Core subjects, aptitude, and resume analyzer for placements.",
      icon: <Briefcase className="h-10 w-10 text-cyan-200" />,
      path: "/placement-prep",
      img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Coding & SQL Practice",
      desc: "Structured DSA sheets and SQL questions with AI guidance.",
      icon: <Code className="h-10 w-10 text-cyan-200" />,
      path: "/coding-practice",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "AI Interview Assistant",
      desc: "Mock interviews with real-time AI feedback and evaluation.",
      icon: <Mic className="h-10 w-10 text-cyan-200" />,
      path: "/ai-interview",
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Progress & Analytics",
      desc: "Track scores, performance, and earn achievements and badges.",
      icon: <BarChart className="h-10 w-10 text-cyan-200" />,
      path: "/progress",
      img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <div className="page-shell">
      <div className="page-content">
        <div className="hero-panel">
          <p className="section-badge">Student Workspace</p>
          <h1 className="heading-lg mt-6 text-balance">
            Welcome back, {userName ? userName : "Student"}.
          </h1>
          <p className="body-lg mt-4 max-w-3xl">
            Move through your preparation stack with one clean workflow for
            interviews, coding rounds, resume optimization, and performance tracking.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {modules.map((m) => (
            <div
              key={m.name}
              onClick={() => navigate(m.path)}
              className="feature-card group cursor-pointer"
            >
              <img
                src={m.img}
                alt={m.name}
                className="absolute inset-0 h-full w-full object-cover opacity-25 transition duration-500 group-hover:scale-105 group-hover:opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950/75 via-slate-950/60 to-cyan-950/45" />

              <div className="relative flex min-h-[280px] flex-col justify-between">
                <div className="flex items-center justify-between gap-3">
                  <div className="icon-badge">{m.icon}</div>
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                    Explore
                  </span>
                </div>

                <div>
                  <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-white">
                    {m.name}
                  </h2>
                  <p className="body-sm mt-3 max-w-md text-slate-300">{m.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition group-hover:text-white">
                    Open workspace
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

export default StudentDashboard;
