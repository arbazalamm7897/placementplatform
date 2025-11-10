import { useNavigate } from "react-router-dom";
import {
  Database,
  Cpu,
  Network,
  Code,
  Layers,
  Cog,
  Monitor,
  Lightbulb,
} from "lucide-react";

const CoreSubjects = () => {
  const navigate = useNavigate();

  const subjects = [
    {
      name: "DBMS",
      desc: "Master SQL, normalization, indexing, and transaction management.",
      icon: <Database className="w-10 h-10 text-green-600" />,
      img: "https://media.istockphoto.com/id/2207897252/photo/relational-database-rdb-and-data-model-database-management-system-dbms-technology-businessman.jpg?s=1024x1024&w=is&k=20&c=QhNpizMHane62GcaQNmVhmgY66SDUp_2fEq7Hf9QAV8=",
      path: "/placement-prep/core-subjects/dbms",
    },
    {
      name: "Operating System",
      desc: "Learn scheduling, memory management, threads, and deadlocks.",
      icon: <Cpu className="w-10 h-10 text-blue-600" />,
      img: "https://images.unsplash.com/photo-1729786423717-07716ec501e9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1228",
      path: "/placement-prep/core-subjects/os",
    },
    {
      name: "Computer Networks",
      desc: "Understand TCP/IP, routing, OSI layers, and network protocols.",
      icon: <Network className="w-10 h-10 text-purple-600" />,
      img: "https://images.unsplash.com/photo-1683322499436-f4383dd59f5a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
      path: "/placement-prep/core-subjects/cn",
    },
    {
      name: "Data Structures & Algorithms",
      desc: "Strengthen problem-solving skills and master key algorithms.",
      icon: <Code className="w-10 h-10 text-pink-600" />,
      img: "https://plus.unsplash.com/premium_photo-1753080951569-4134578b1c35?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1112",
      path: "/placement-prep/core-subjects/dsa",
    },
    {
      name: "Software Engineering",
      desc: "Understand SDLC models, design principles, and best practices.",
      icon: <Layers className="w-10 h-10 text-orange-600" />,
      img: "https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      path: "/placement-prep/core-subjects/se",
    },
    {
      name: "Object-Oriented Programming (OOPs)",
      desc: "Learn abstraction, encapsulation, inheritance, and polymorphism.",
      icon: <Cog className="w-10 h-10 text-yellow-600" />,
      img: "https://plus.unsplash.com/premium_photo-1720287601300-cf423c3d6760?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      path: "/placement-prep/core-subjects/oops",
    },
    {
      name: "System Design",
      desc: "Explore scalability, load balancing, caching, and database sharding.",
      icon: <Monitor className="w-10 h-10 text-indigo-600" />,
      img: "https://plus.unsplash.com/premium_photo-1661575228451-9268e521c416?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      path: "/placement-prep/core-subjects/system-design",
    },
    {
      name: "Computer Fundamentals",
      desc: "Revise basics: number systems, logic gates, and computer architecture.",
      icon: <Lightbulb className="w-10 h-10 text-teal-600" />,
      img: "https://plus.unsplash.com/premium_photo-1714618946021-8fbd6394d1a8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332",
      path: "/placement-prep/core-subjects/fundamentals",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-10">
          Core Subjects Preparation 💻
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Strengthen your computer science foundation with topic-wise learning resources.
          Each section includes notes, questions, and AI-generated explanations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject) => (
            <div
              key={subject.name}
              className="bg-white rounded-3xl overflow-hidden shadow-lg transform transition hover:scale-105 cursor-pointer flex flex-col"
            >
              <img
                src={subject.img}
                alt={subject.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gray-100 p-3 rounded-full shadow-inner">
                    {subject.icon}
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {subject.name}
                  </h2>
                </div>

                <p className="text-gray-600 flex-grow">{subject.desc}</p>

                <button
                  onClick={() => navigate(subject.path)}
                  className="mt-6 self-start bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition"
                >
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreSubjects;
