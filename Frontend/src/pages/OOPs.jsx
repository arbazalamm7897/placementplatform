import SubjectPage from "./SubjectPage";

const OOPs = () => {
  const intro = "Learn core object-oriented programming concepts for structured and reusable code.";
  const topics = [
    { title: "Introduction to OOPs", content: "OOPs is a programming paradigm based on objects containing data and behavior." },
    { title: "Classes and Objects", content: "Class is a blueprint; object is an instance of a class." },
    { title: "Inheritance", content: "Inheritance allows a class to acquire properties of another class." },
    { title: "Polymorphism", content: "Polymorphism allows objects to take many forms, like method overloading and overriding." },
    { title: "Encapsulation & Abstraction", content: "Encapsulation hides data; abstraction shows only relevant details." },
  ];

  return <SubjectPage subjectName="Object-Oriented Programming (OOPs)" intro={intro} topics={topics} />;
};

export default OOPs;
