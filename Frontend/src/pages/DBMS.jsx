import SubjectPage from "./SubjectPage";

const DBMS = () => {
  const intro = "Learn DBMS concepts, SQL, normalization, indexing, and transactions.";
  const topics = [
    { title: "Introduction to DBMS", content: "DBMS stands for Database Management System, which allows you to store, manage, and retrieve data efficiently." },
    { title: "SQL Basics", content: "SQL is a language used to interact with databases, covering commands like SELECT, INSERT, UPDATE, and DELETE." },
    { title: "Normalization", content: "Normalization is the process of organizing data to minimize redundancy and dependency." },
  ];

  return <SubjectPage subjectName="DBMS" intro={intro} topics={topics} />;
};

export default DBMS;
