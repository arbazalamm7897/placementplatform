import SubjectPage from "./SubjectPage";

const SoftwareEngineering = () => {
  const intro = "Understand software development lifecycle, design principles, and best practices.";
  const topics = [
    { title: "Introduction to Software Engineering", content: "Software Engineering involves systematic development of software products." },
    { title: "SDLC Models", content: "Learn Waterfall, Agile, Spiral, and V-Model software development models." },
    { title: "Software Design Principles", content: "Principles like SOLID and DRY help in building maintainable software." },
    { title: "Software Testing", content: "Testing ensures quality; includes unit testing, integration testing, and system testing." },
  ];

  return <SubjectPage subjectName="Software Engineering" intro={intro} topics={topics} />;
};

export default SoftwareEngineering;
