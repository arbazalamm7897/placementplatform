import SubjectPage from "./SubjectPage";

const SoftwareEngineering = () => {
  const intro =
    "Software Engineering questions are usually shorter than DSA rounds, but they strongly affect interview perception because they test how you think about building real software.";

  const topics = [
    {
      title: "SDLC and Development Models",
      content:
        "Interviewers expect you to know where common models fit best rather than just memorizing names.",
      points: [
        "SDLC phases usually include requirement analysis, design, implementation, testing, deployment, and maintenance.",
        "Waterfall is sequential and works best when requirements are stable.",
        "Agile supports iterative delivery, quick feedback, and changing requirements.",
        "Spiral emphasizes risk analysis and is useful for high-risk projects.",
        "V-Model maps testing phases to development phases.",
      ],
      interviewFocus:
        "Compare Agile and Waterfall with practical scenarios instead of textbook lines only.",
    },
    {
      title: "Software Design Principles",
      content:
        "These principles are especially useful when interviewers ask about maintainability and code quality.",
      points: [
        "SOLID principles guide object-oriented design.",
        "DRY means avoid unnecessary duplication.",
        "KISS means keep solutions simple and easy to maintain.",
        "High cohesion and low coupling improve modularity.",
        "Good design makes code easier to test, extend, and debug.",
      ],
      interviewFocus:
        "If asked about maintainable code, talk about readability, modularity, testability, and change impact.",
    },
    {
      title: "Testing Basics",
      content:
        "Testing is asked frequently in practical interview rounds and project discussions.",
      points: [
        "Unit testing validates small pieces of logic in isolation.",
        "Integration testing checks interactions between modules.",
        "System testing validates the complete application.",
        "Regression testing ensures new changes do not break old functionality.",
        "Black-box testing focuses on behavior, while white-box testing considers internal logic.",
      ],
      interviewFocus:
        "Be ready with one real example of a bug that good testing could catch.",
    },
    {
      title: "Version Control and Code Reviews",
      content:
        "Modern teams care a lot about collaboration habits, especially for freshers joining product teams.",
      points: [
        "Git helps track history, collaborate safely, and manage parallel work.",
        "Branches allow isolated feature development.",
        "Pull requests and code reviews improve quality and shared understanding.",
        "Commit messages should be small, meaningful, and traceable.",
        "Code reviews should focus on correctness, readability, security, and maintainability.",
      ],
      interviewFocus:
        "Project discussions become much stronger when you mention Git workflow and review habits.",
    },
  ];

  return (
    <SubjectPage
      subjectName="Software Engineering"
      intro={intro}
      topics={topics}
    />
  );
};

export default SoftwareEngineering;
