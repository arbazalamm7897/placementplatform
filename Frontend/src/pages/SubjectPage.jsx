import { BookOpenText, Sparkles, Target } from "lucide-react";
import { useRef } from "react";

const SubjectPage = ({ subjectName, intro, topics }) => {
  const topicRefs = useRef([]);

  const scrollToTopic = (index) => {
    topicRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="page-shell">
      <div className="page-content">
        <div className="hero-panel">
          <p className="section-badge">
            <BookOpenText className="h-4 w-4" />
            Core Subject Track
          </p>
          <h1 className="heading-lg mt-6">{subjectName}</h1>
          <p className="body-lg mt-4 max-w-4xl">{intro}</p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="glass-card h-fit p-5 lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
              Topic Navigator
            </p>
            <h2 className="mt-3 font-['Space_Grotesk'] text-2xl font-bold text-white">
              {subjectName} topics
            </h2>
            <div className="mt-5 space-y-2">
              {topics.map((topic, idx) => (
                <button
                  key={topic.title}
                  onClick={() => scrollToTopic(idx)}
                  className="surface-muted flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-300 transition hover:border-cyan-300/30 hover:bg-white/10 hover:text-white"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xs font-semibold text-cyan-200">
                    {idx + 1}
                  </span>
                  <span>{topic.title}</span>
                </button>
              ))}
            </div>
          </aside>

          <main className="space-y-6">
            {topics.map((topic, idx) => (
              <section
                key={topic.title}
                ref={(el) => (topicRefs.current[idx] = el)}
                className="glass-card p-6 sm:p-7"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                      Topic {idx + 1}
                    </p>
                    <h2 className="mt-3 font-['Space_Grotesk'] text-2xl font-bold text-white sm:text-3xl">
                      {topic.title}
                    </h2>
                  </div>
                  <span className="icon-badge h-12 w-12">
                    <Sparkles className="h-5 w-5" />
                  </span>
                </div>

                {topic.content && (
                  <p className="body-lg mt-5 text-slate-300">{topic.content}</p>
                )}

                {topic.points?.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {topic.points.map((point) => (
                      <li
                        key={point}
                        className="surface-muted flex items-start gap-3 px-4 py-4 text-sm leading-7 text-slate-300"
                      >
                        <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cyan-300/15 text-cyan-200">
                          •
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {topic.interviewFocus && (
                  <div className="mt-6 rounded-[24px] border border-cyan-300/20 bg-cyan-300/10 px-5 py-4 text-sm text-cyan-50">
                    <div className="flex items-center gap-2 font-semibold text-cyan-200">
                      <Target className="h-4 w-4" />
                      Interview Focus
                    </div>
                    <p className="mt-2 leading-7 text-slate-200">{topic.interviewFocus}</p>
                  </div>
                )}
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
