import SubjectPage from "./SubjectPage";

const DSA = () => {
  const intro = "Strengthen problem-solving skills and master data structures & algorithms.";
  const topics = [
    { title: "Arrays and Strings", content: "Learn basic data structures like arrays and strings and their operations." },
    { title: "Linked Lists", content: "Understand singly and doubly linked lists, and operations like insertion and deletion." },
    { title: "Stacks and Queues", content: "Learn stack (LIFO) and queue (FIFO) data structures and their applications." },
    { title: "Trees and Graphs", content: "Explore binary trees, BSTs, and graph traversal algorithms." },
    { title: "Sorting and Searching", content: "Master sorting algorithms like quicksort, mergesort, and searching techniques." },
  ];

  return <SubjectPage subjectName="Data Structures & Algorithms" intro={intro} topics={topics} />;
};

export default DSA;
