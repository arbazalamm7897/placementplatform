import { useNavigate } from "react-router-dom";

const Aptitude = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Quantitative Aptitude",
      desc: "Covers arithmetic, algebra, geometry, and data interpretation with step-by-step solutions.",
      img: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=800&q=80",
      path: "/placement-prep/aptitude/quantitative",
    },
    {
      title: "Logical Reasoning",
      desc: "Practice puzzles, patterns, seating arrangements, and logical sequences to enhance reasoning skills.",
      img: "https://images.unsplash.com/photo-1758685848406-c737a196f682?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332",
      path: "/placement-prep/aptitude/logical",
    },
    {
      title: "Verbal Ability",
      desc: "Improve grammar, comprehension, sentence correction, and vocabulary through curated exercises.",
      img: "https://plus.unsplash.com/premium_photo-1722859213990-74926fc3290e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2060",
      path: "/placement-prep/aptitude/verbal",
    },
    {
      title: "Data Interpretation",
      desc: "Analyze charts, tables, and graphs with speed and accuracy for real test scenarios.",
      img: "https://plus.unsplash.com/premium_photo-1682430969514-c3136343092d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
      path: "/placement-prep/aptitude/data-interpretation",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-10">
          Aptitude Preparation 🧠
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Strengthen your problem-solving and analytical skills with topic-wise aptitude practice.  
          Each section contains practice sets, tips, and AI explanations to boost your confidence.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-white rounded-3xl overflow-hidden shadow-lg transform transition hover:scale-105 cursor-pointer flex flex-col"
            >
              <img
                src={section.img}
                alt={section.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                  {section.title}
                </h2>
                <p className="text-gray-600 flex-grow">{section.desc}</p>

                <button
                  onClick={() => navigate(section.path)}
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

export default Aptitude;
