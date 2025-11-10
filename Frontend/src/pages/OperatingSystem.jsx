import SubjectPage from "./SubjectPage";

const OperatingSystem = () => {
  const intro = "Learn OS concepts including processes, threads, memory management, and scheduling.";
  const topics = [
    { title: "Introduction to OS", content: "Operating System manages hardware and software resources and provides common services for computer programs." },
    { title: "Processes and Threads", content: "A process is a program in execution. Threads are lightweight processes sharing the same memory." },
    { title: "Memory Management", content: "OS handles memory allocation, paging, segmentation, and virtual memory." },
    { title: "Scheduling Algorithms", content: "Scheduling determines which process runs at a given time, e.g., FCFS, SJF, Round Robin." },
  ];

  return <SubjectPage subjectName="Operating System" intro={intro} topics={topics} />;
};

export default OperatingSystem;
