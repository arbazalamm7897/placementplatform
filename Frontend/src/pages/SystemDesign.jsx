import SubjectPage from "./SubjectPage";

const SystemDesign = () => {
  const intro = "Explore large-scale system architecture, scalability, and design patterns.";
  const topics = [
    { title: "Introduction to System Design", content: "System design focuses on architecture and building scalable, reliable systems." },
    { title: "Scalability", content: "Vertical and horizontal scaling concepts to handle increased load." },
    { title: "Caching", content: "Techniques to improve performance and reduce database load." },
    { title: "Database Sharding & Replication", content: "Splitting data and replicating for high availability." },
    { title: "Load Balancing", content: "Distribute incoming traffic across multiple servers." },
  ];

  return <SubjectPage subjectName="System Design" intro={intro} topics={topics} />;
};

export default SystemDesign;
