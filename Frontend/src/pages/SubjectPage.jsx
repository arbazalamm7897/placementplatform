import { useRef } from "react";

const SubjectPage = ({ subjectName, intro, topics }) => {
  const topicRefs = useRef([]);

  const scrollToTopic = (index) => {
    topicRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 pt-24 px-6">
      {/* Sidebar */}
      <aside className="w-64 sticky top-24 h-screen pr-4">
        <h2 className="text-xl font-bold mb-4 text-green-700">{subjectName} Topics</h2>
        <ul className="space-y-2">
          {topics.map((t, idx) => (
            <li
              key={t.title}
              onClick={() => scrollToTopic(idx)}
              className="cursor-pointer text-gray-700 hover:text-green-700 transition"
            >
              {t.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 space-y-12">
        {/* Intro Section */}
        <section className="bg-white rounded-3xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-green-700 mb-4">{subjectName}</h1>
          <p className="text-gray-600">{intro}</p>
        </section>

        {/* Topics */}
        {topics.map((t, idx) => (
          <section
            key={t.title}
            ref={(el) => (topicRefs.current[idx] = el)}
            className="bg-white rounded-3xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-green-700 mb-2">{t.title}</h2>
            <p className="text-gray-700">{t.content}</p>
          </section>
        ))}
      </main>
    </div>
  );
};

export default SubjectPage;
