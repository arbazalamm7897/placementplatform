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
    panel: "bg-sky-50 border-sky-100",
  },
  {
    title: "SQL Practice",
    description:
      "Solve database questions with schema previews, query execution, and result validation from easy to hard.",
    icon: Database,
    path: "/coding-practice/sql",
    accent: "from-orange-500 via-amber-500 to-yellow-400",
    panel: "bg-amber-50 border-amber-100",
  },
];

const CodingPracticeHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 px-6 pb-12 pt-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 rounded-[32px] bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 px-8 py-10 text-white shadow-xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-emerald-100">
            <Trophy className="h-4 w-4" />
            Practice like a real coding round
          </p>
          <h1 className="text-4xl font-bold">Coding and SQL Practice</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-200">
            Choose your track, filter by difficulty, and solve problems in a
            workspace built for interview-style practice.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {modules.map(({ title, description, icon: Icon, path, accent, panel }) => (
            <button
              key={title}
              onClick={() => navigate(path)}
              className={`group overflow-hidden rounded-[32px] border p-0 text-left shadow-lg transition hover:-translate-y-1 hover:shadow-2xl ${panel}`}
            >
              <div className={`h-3 w-full bg-gradient-to-r ${accent}`} />
              <div className="p-8">
                <div className="mb-6 inline-flex rounded-2xl bg-white p-4 shadow-sm">
                  <Icon className="h-8 w-8 text-slate-900" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
                <p className="mt-4 text-base leading-7 text-slate-700">
                  {description}
                </p>
                <span className="mt-8 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-emerald-600">
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
