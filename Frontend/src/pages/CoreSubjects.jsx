import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Code,
  Cog,
  Cpu,
  Database,
  Layers,
  Lightbulb,
  Monitor,
  Network,
} from "lucide-react";

const CoreSubjects = () => {
  const navigate = useNavigate();

  const subjects = [
    {
      name: "DBMS",
      desc: "Master SQL, normalization, indexing, and transaction management.",
      icon: <Database className="h-10 w-10 text-cyan-200" />,
      img: "https://media.istockphoto.com/id/2207897252/photo/relational-database-rdb-and-data-model-database-management-system-dbms-technology-businessman.jpg?s=1024x1024&w=is&k=20&c=QhNpizMHane62GcaQNmVhmgY66SDUp_2fEq7Hf9QAV8=",
      path: "/placement-prep/core-subjects/dbms",
    },
    {
      name: "Operating System",
      desc: "Learn scheduling, memory management, threads, and deadlocks.",
      icon: <Cpu className="h-10 w-10 text-cyan-200" />,
      img: "https://images.unsplash.com/photo-1729786423717-07716ec501e9?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1228",
      path: "/placement-prep/core-subjects/os",
    },
    {
      name: "Computer Networks",
      desc: "Understand TCP/IP, routing, OSI layers, and network protocols.",
      icon: <Network className="h-10 w-10 text-cyan-200" />,
      img: "https://images.unsplash.com/photo-1683322499436-f4383dd59f5a?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1171",
      path: "/placement-prep/core-subjects/cn",
    },
    {
      name: "Data Structures & Algorithms",
      desc: "Strengthen problem-solving skills and master key algorithms.",
      icon: <Code className="h-10 w-10 text-cyan-200" />,
      img: "https://plus.unsplash.com/premium_photo-1753080951569-4134578b1c35?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1112",
      path: "/placement-prep/core-subjects/dsa",
    },
    {
      name: "Software Engineering",
      desc: "Understand SDLC models, design principles, and best practices.",
      icon: <Layers className="h-10 w-10 text-cyan-200" />,
      img: "https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
      path: "/placement-prep/core-subjects/se",
    },
    {
      name: "Object-Oriented Programming",
      desc: "Learn abstraction, encapsulation, inheritance, and polymorphism.",
      icon: <Cog className="h-10 w-10 text-cyan-200" />,
      img: "https://plus.unsplash.com/premium_photo-1720287601300-cf423c3d6760?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
      path: "/placement-prep/core-subjects/oops",
    },
    {
      name: "System Design",
      desc: "Explore scalability, load balancing, caching, and database sharding.",
      icon: <Monitor className="h-10 w-10 text-cyan-200" />,
      img: "https://plus.unsplash.com/premium_photo-1661575228451-9268e521c416?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
      path: "/placement-prep/core-subjects/system-design",
    },
    {
      name: "Computer Fundamentals",
      desc: "Revise number systems, logic gates, and computer architecture basics.",
      icon: <Lightbulb className="h-10 w-10 text-cyan-200" />,
      img: "https://plus.unsplash.com/premium_photo-1714618946021-8fbd6394d1a8?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1332",
      path: "/placement-prep/core-subjects/fundamentals",
    },
  ];

  return (
    <div className="page-shell">
      <div className="page-content">
        <div className="hero-panel">
          <p className="section-badge">Core Subjects</p>
          <h1 className="heading-lg mt-6">Build deep technical confidence, one subject at a time.</h1>
          <p className="body-lg mt-4 max-w-3xl">
            Strengthen your computer science foundation with topic-wise learning resources,
            interview focus areas, and structured revision pages that feel like a polished AI learning product.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {subjects.map((subject) => (
            <div
              key={subject.name}
              onClick={() => navigate(subject.path)}
              className="feature-card group cursor-pointer"
            >
              <img
                src={subject.img}
                alt={subject.name}
                className="absolute inset-0 h-full w-full object-cover opacity-20 transition duration-500 group-hover:scale-105 group-hover:opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/70 to-cyan-950/35" />

              <div className="relative flex min-h-[300px] flex-col justify-between">
                <div className="icon-badge">{subject.icon}</div>

                <div>
                  <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-white">
                    {subject.name}
                  </h2>
                  <p className="body-sm mt-3 text-slate-300">{subject.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition group-hover:text-white">
                    Open subject
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

export default CoreSubjects;
