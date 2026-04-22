import { useNavigate } from "react-router-dom";
import { aptitudeSections } from "../data/aptitudeData";

const Aptitude = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-10">
          Aptitude Preparation
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Practice topic-wise aptitude questions and strengthen the speed,
          accuracy, and problem-solving skills that matter in placement tests.
        </p>

        <div className="rounded-3xl bg-white p-8 shadow-lg mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-wide text-green-700 mb-2">
                Full Length Practice
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Aptitude Mock Test
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Take a mixed test covering quantitative aptitude, logical reasoning,
                verbal ability, and data interpretation in one place.
              </p>
            </div>
            <button
              onClick={() => navigate("/placement-prep/aptitude/mock-test")}
              className="self-start rounded-xl bg-green-600 px-6 py-3 text-white"
            >
              Start Mock Test
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {aptitudeSections.map((section) => (
            <div
              key={section.slug}
              className="bg-white rounded-3xl overflow-hidden shadow-lg flex flex-col"
            >
              <div className="p-7 flex flex-col flex-grow">
                <p className="text-sm font-semibold text-green-700 mb-2">
                  Practice Set
                </p>
                <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                  {section.title}
                </h2>
                <p className="text-gray-600 flex-grow">{section.shortDescription}</p>

                <button
                  onClick={() => navigate(`/placement-prep/aptitude/${section.slug}`)}
                  className="mt-6 self-start bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition"
                >
                  Open Practice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aptitude;
