import { useNavigate } from "react-router-dom";
import { Binary, Database, Trophy } from "lucide-react";

const modules = [
  {
    title: "DSA Practice",
    description:
      "Work through coding problems by difficulty and solve them in a split editor with test-case judging.",
    icon: Binary,
    path: "/coding-practice/dsa",
    accent: "from-sky-500 via-cyan-500 to-emerald-400",
  },
  {
    title: "SQL Practice",
    description:
      "Solve database questions with schema previews, query execution, and result validation from easy to hard.",
    icon: Database,
    path: "/coding-practice/sql",
    accent: "from-orange-500 via-amber-500 to-yellow-400",
  },
];

const CodingPracticeHome = () => {
  const navigate = useNavigate();

  return (
    <div className="page-shell">
      <div className="page-content">
        <div className="hero-panel">
          <p className="section-badge">
            <Trophy className="h-4 w-4" />
            Practice like a real coding round
          </p>
          <h1 className="heading-lg mt-6">Coding and SQL workspaces built for focus.</h1>
          <p className="body-lg mt-4 max-w-3xl">
            Choose your track, filter by difficulty, and solve problems in a
            workspace built for interview-style practice.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {modules.map(({ title, description, icon: Icon, path, accent }) => (
            <button
              key={title}
              onClick={() => navigate(path)}
              className="feature-card group p-0 text-left"
            >
              <div className={`h-3 w-full bg-gradient-to-r ${accent}`} />
              <div className="p-8">
                <div className="icon-badge mb-6">
                  <Icon className="h-8 w-8 text-cyan-200" />
                </div>
                <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-white">{title}</h2>
                <p className="body-sm mt-4 text-slate-300">{description}</p>
                <span className="mt-8 inline-flex rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-white/15">
                  Open Workspace
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodingPracticeHome;
