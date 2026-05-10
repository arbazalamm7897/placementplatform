import React from "react";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const highlights = [
    {
      icon: Bot,
      title: "AI-guided preparation",
      detail: "Mock interviews, resume scoring, and feedback loops tuned for placement success.",
    },
    {
      icon: ChartNoAxesCombined,
      title: "Actionable analytics",
      detail: "Track your momentum, practice depth, and improvement patterns in one command center.",
    },
    {
      icon: ShieldCheck,
      title: "Structured workflows",
      detail: "One workspace for resume polish, coding rounds, aptitude training, and interview readiness.",
    },
  ];

  return (
    <div className="page-shell flex items-center">
      <div className="page-content">
        <div className="hero-panel animate-aurora overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(110,231,200,0.16),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(122,162,255,0.18),transparent_28%)]" />
          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="section-badge">
                <BriefcaseBusiness className="h-4 w-4" />
                Future-ready placement OS
              </p>
              <h1 className="heading-xl mt-6 text-balance">
                Modern AI prep for students who want sharper outcomes.
              </h1>
              <p className="body-lg mt-6 max-w-2xl text-balance">
                Career Bridge brings interview simulation, coding practice, resume
                intelligence, and performance analytics into one premium workflow
                designed to feel like a modern AI SaaS platform.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/signup" className="primary-button">
                  Start Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/login" className="secondary-button">
                  Sign In
                </Link>
              </div>
            </div>

            <div className="grid gap-5">
              {highlights.map(({ icon: Icon, title, detail }, index) => (
                <div
                  key={title}
                  className={`feature-card group animate-float-soft ${index === 1 ? "sm:ml-10" : ""}`}
                  style={{ animationDelay: `${index * 0.45}s` }}
                >
                  <div className="icon-badge">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-['Space_Grotesk'] text-2xl font-bold text-white">
                    {title}
                  </h3>
                  <p className="body-sm mt-3">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
