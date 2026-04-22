import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { aptitudeSections } from "../data/aptitudeData";

const AptitudeSectionPage = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const [openSolutions, setOpenSolutions] = useState({});

  const currentSection = useMemo(
    () => aptitudeSections.find((item) => item.slug === section),
    [section]
  );

  if (!currentSection) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="rounded-3xl bg-white p-8 shadow-lg text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Section not found
          </h1>
          <button
            onClick={() => navigate("/placement-prep/aptitude")}
            className="rounded-xl bg-green-600 px-5 py-3 text-white"
          >
            Back to Aptitude
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-3xl bg-white p-8 shadow-lg mb-10">
          <p className="text-sm uppercase tracking-wide text-green-700 mb-2">
            Practice Section
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {currentSection.title}
          </h1>
          <p className="text-gray-600 mb-6">{currentSection.intro}</p>

          <div className="rounded-2xl bg-green-50 px-5 py-4">
            <h2 className="text-lg font-semibold text-green-900 mb-3">
              Quick Tips
            </h2>
            <ul className="space-y-2 list-disc pl-5 text-green-900">
              {currentSection.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          {currentSection.questions.map((item, index) => (
            <section key={item.question} className="rounded-3xl bg-white p-8 shadow-lg">
              <p className="text-sm font-semibold text-green-700 mb-2">
                Practice Question {index + 1}
              </p>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {item.question}
              </h2>

              {!openSolutions[index] ? (
                <button
                  onClick={() =>
                    setOpenSolutions((prev) => ({
                      ...prev,
                      [index]: true,
                    }))
                  }
                  className="rounded-xl bg-green-600 px-5 py-3 text-white"
                >
                  View Solution
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-blue-50 px-5 py-4">
                    <p className="font-semibold text-blue-900 mb-1">Answer</p>
                    <p className="text-blue-900">{item.answer}</p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 px-5 py-4">
                    <p className="font-semibold text-gray-800 mb-1">Explanation</p>
                    <p className="text-gray-700">{item.explanation}</p>
                  </div>
                  <button
                    onClick={() =>
                      setOpenSolutions((prev) => ({
                        ...prev,
                        [index]: false,
                      }))
                    }
                    className="rounded-xl bg-slate-700 px-5 py-3 text-white"
                  >
                    Hide Solution
                  </button>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AptitudeSectionPage;
