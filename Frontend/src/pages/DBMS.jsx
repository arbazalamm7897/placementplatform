import SubjectPage from "./SubjectPage";

const DBMS = () => {
  const intro =
    "DBMS is one of the most asked placement subjects because it connects theory with real backend work. Focus on relational design, SQL, normalization, indexing, and transactions.";

  const topics = [
    {
      title: "DBMS Basics and Keys",
      content:
        "Interviewers usually begin with core terminology to check whether your fundamentals are clean.",
      points: [
        "A DBMS stores, organizes, secures, and retrieves data efficiently.",
        "A schema defines structure, while an instance is the actual data at a given time.",
        "Primary key uniquely identifies a row and cannot be null.",
        "Foreign key creates a relationship between two tables.",
        "Candidate key can uniquely identify tuples; one candidate key becomes the primary key.",
      ],
      interviewFocus:
        "Be ready to explain the difference between primary key, candidate key, super key, and foreign key with a table example.",
    },
    {
      title: "Normalization",
      content:
        "Normalization reduces redundancy and update anomalies. Placement interviews often ask you to normalize a sample table.",
      points: [
        "1NF removes repeating groups and keeps atomic values.",
        "2NF removes partial dependency on a composite primary key.",
        "3NF removes transitive dependency.",
        "BCNF is stronger than 3NF and requires every determinant to be a candidate key.",
        "Over-normalization can increase joins, so practical systems sometimes balance normalization with performance.",
      ],
      interviewFocus:
        "Prepare one clear example that moves a table from unnormalized form to 3NF.",
    },
    {
      title: "SQL for Placements",
      content:
        "SQL questions are very common in online tests and interviews, so strong query practice gives a big advantage.",
      points: [
        "Know SELECT, WHERE, ORDER BY, GROUP BY, HAVING, JOIN, subqueries, and aggregate functions.",
        "INNER JOIN returns matching rows, LEFT JOIN keeps all left-side rows, RIGHT JOIN keeps all right-side rows.",
        "GROUP BY groups rows before aggregation, while HAVING filters grouped results.",
        "Subqueries are useful but joins or CTEs are often clearer in real systems.",
        "Practice top-N queries, second highest salary, duplicate records, and department-wise count problems.",
      ],
      interviewFocus:
        "Write queries by hand and explain your approach before jumping to syntax.",
    },
    {
      title: "Indexing and Query Optimization",
      content:
        "This topic helps interviewers judge whether you understand database performance beyond writing correct queries.",
      points: [
        "An index is a data structure that speeds up data retrieval at the cost of extra storage and write overhead.",
        "B+ trees are commonly used in database indexes because they support efficient search and range queries.",
        "Indexes improve read-heavy workloads but can slow INSERT, UPDATE, and DELETE operations.",
        "Composite indexes work best when query filters follow the leftmost prefix.",
        "Avoid indexing every column blindly; choose columns used often in filtering, sorting, or joins.",
      ],
      interviewFocus:
        "Be able to answer why indexes improve SELECT performance but may hurt writes.",
    },
    {
      title: "Transactions and Concurrency",
      content:
        "ACID and isolation levels are very common theoretical questions in service-based and product-based interviews.",
      points: [
        "Atomicity means all operations in a transaction complete or none do.",
        "Consistency keeps data valid before and after a transaction.",
        "Isolation handles concurrent execution safely.",
        "Durability ensures committed data survives system failure.",
        "Common problems include dirty read, non-repeatable read, and phantom read.",
      ],
      interviewFocus:
        "Learn ACID with a bank transfer example and know basic isolation-level tradeoffs.",
    },
  ];

  return <SubjectPage subjectName="DBMS" intro={intro} topics={topics} />;
};

export default DBMS;
