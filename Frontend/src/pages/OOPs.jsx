import SubjectPage from "./SubjectPage";

const OOPs = () => {
  const intro =
    "OOPs is one of the safest scoring theory topics in placements. Interviewers expect clear explanations, relatable examples, and comparison-based answers.";

  const topics = [
    {
      title: "Class, Object, and Constructor",
      content:
        "These are the basics from which almost every OOP interview question starts.",
      points: [
        "A class is a blueprint, while an object is an instance of that class.",
        "Constructors initialize objects when they are created.",
        "Objects combine state and behavior together.",
        "Methods define behavior and fields define state.",
        "Good examples usually make OOP answers easier to understand.",
      ],
      interviewFocus:
        "Always answer with a small real-world example like Car, Student, or BankAccount.",
    },
    {
      title: "Four Pillars of OOP",
      content:
        "This is the most asked OOP question set in freshers’ interviews.",
      points: [
        "Encapsulation binds data and methods together and restricts direct access.",
        "Abstraction hides implementation details and shows only essential behavior.",
        "Inheritance allows one class to reuse properties of another.",
        "Polymorphism lets the same interface behave differently in different contexts.",
        "Strong answers focus on why each principle is useful, not just definitions.",
      ],
      interviewFocus:
        "Be able to define each pillar in one line and then explain it with a simple example.",
    },
    {
      title: "Overloading vs Overriding",
      content:
        "This comparison appears very frequently because it checks detail-level clarity.",
      points: [
        "Overloading means same method name with different parameters in the same class.",
        "Overriding means redefining parent class behavior in a child class.",
        "Overloading is compile-time polymorphism.",
        "Overriding is runtime polymorphism.",
        "Method signature matters in overloading, inheritance relationship matters in overriding.",
      ],
      interviewFocus:
        "Keep your answer structured: definition, condition, and one code-style example.",
    },
    {
      title: "Interface vs Abstract Class",
      content:
        "This is a common Java interview topic and a good way to show design understanding.",
      points: [
        "An abstract class can contain both abstract and concrete methods.",
        "An interface defines a contract that classes agree to implement.",
        "Use abstract class when related classes share behavior and state.",
        "Use interface when unrelated classes should follow the same contract.",
        "Modern languages sometimes blur the line, but design intent still matters.",
      ],
      interviewFocus:
        "Answer in terms of use case, not only syntax differences.",
    },
  ];

  return (
    <SubjectPage
      subjectName="Object-Oriented Programming (OOPs)"
      intro={intro}
      topics={topics}
    />
  );
};

export default OOPs;
