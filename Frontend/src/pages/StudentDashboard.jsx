import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Briefcase, Code, Mic, BarChart } from "lucide-react";

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const modules = [
    {
      name: "Placement Prep",
      desc: "Core subjects, aptitude, and resume analyzer for placements.",
      icon: <Briefcase className="w-10 h-10 text-blue-600" />,
      path: "/placement-prep",
      img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Coding & SQL Practice",
      desc: "Structured DSA sheets and SQL questions with AI guidance.",
      icon: <Code className="w-10 h-10 text-purple-600" />,
      path: "/coding-practice",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "AI Interview Assistant",
      desc: "Mock interviews with real-time AI feedback and evaluation.",
      icon: <Mic className="w-10 h-10 text-pink-600" />,
      path: "/ai-interview",
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Progress & Analytics",
      desc: "Track scores, performance, and earn achievements & badges.",
      icon: <BarChart className="w-10 h-10 text-yellow-600" />,
      path: "/progress",
      img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-24 relative">

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-700 mb-12 text-center">
          Welcome, {userName ? userName : "Student"} 👋
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
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
                  <h2 className="text-2xl font-semibold drop-shadow-md">{m.name}</h2>
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

export default StudentDashboard;
