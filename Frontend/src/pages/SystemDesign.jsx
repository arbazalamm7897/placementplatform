import SubjectPage from "./SubjectPage";

const SystemDesign = () => {
  const intro =
    "For placements, system design should be practical and high-level. Focus on scalability, caching, databases, load balancing, and trade-offs instead of overcomplicating architecture.";

  const topics = [
    {
      title: "Scalability Basics",
      content:
        "System design interviews often begin with how you would handle more users, traffic, and data.",
      points: [
        "Vertical scaling means increasing power of a single machine.",
        "Horizontal scaling means adding more machines.",
        "Horizontal scaling improves fault tolerance and flexibility.",
        "Read-heavy and write-heavy systems may need different scaling strategies.",
        "Stateless services scale more easily behind a load balancer.",
      ],
      interviewFocus:
        "Explain when horizontal scaling is preferred and why state management becomes important.",
    },
    {
      title: "Caching",
      content:
        "Caching is a very common interview topic because it directly improves performance and reduces backend load.",
      points: [
        "Caching stores frequently accessed data closer to the application or user.",
        "Common cache layers include browser cache, CDN, application cache, and database cache.",
        "Cache hit improves latency, while cache miss falls back to the source system.",
        "Popular eviction strategies include LRU and LFU.",
        "Cache invalidation is one of the hardest practical problems in system design.",
      ],
      interviewFocus:
        "Discuss both the performance benefit and the consistency challenge of caching.",
    },
    {
      title: "Database Choices and Scaling",
      content:
        "Interviewers want to know when you would choose SQL, NoSQL, sharding, or replication.",
      points: [
        "SQL databases are strong for structured data and transactions.",
        "NoSQL databases are useful for flexible schema or very large-scale distributed workloads.",
        "Replication improves read scalability and availability.",
        "Sharding distributes data across multiple machines.",
        "Trade-offs usually involve consistency, query flexibility, and operational complexity.",
      ],
      interviewFocus:
        "Be ready to justify SQL vs NoSQL based on data relationships and scale.",
    },
    {
      title: "Load Balancing and Availability",
      content:
        "This is essential for explaining how systems stay responsive under traffic.",
      points: [
        "A load balancer distributes incoming traffic across multiple servers.",
        "It improves availability, fault tolerance, and horizontal scalability.",
        "Health checks help remove unhealthy instances from rotation.",
        "Session stickiness may be needed for stateful applications but is usually avoided when possible.",
        "High availability requires removing single points of failure.",
      ],
      interviewFocus:
        "Mention redundancy and failure handling, not just traffic distribution.",
    },
  ];

  return (
    <SubjectPage
      subjectName="System Design"
      intro={intro}
      topics={topics}
    />
  );
};

export default SystemDesign;
