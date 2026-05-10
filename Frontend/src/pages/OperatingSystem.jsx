import SubjectPage from "./SubjectPage";

const OperatingSystem = () => {
  const intro =
    "Operating System questions test whether you understand how programs actually run on machines. Focus on processes, threads, scheduling, memory, synchronization, and deadlocks.";

  const topics = [
    {
      title: "Processes vs Threads",
      content:
        "This is one of the most repeated OS interview questions, and your answer should be crisp and example-based.",
      points: [
        "A process is an independent program in execution with its own address space.",
        "A thread is a lightweight unit of execution inside a process.",
        "Threads of the same process share code, data, and resources.",
        "Context switching between threads is cheaper than between processes.",
        "Multithreading improves responsiveness but increases synchronization complexity.",
      ],
      interviewFocus:
        "Always mention memory sharing and context-switch cost when comparing process and thread.",
    },
    {
      title: "CPU Scheduling",
      content:
        "Scheduling questions test both theory and your ability to compare algorithms.",
      points: [
        "FCFS is simple but can suffer from convoy effect.",
        "SJF gives minimum average waiting time in theory but needs burst prediction.",
        "Round Robin is fair and suited for time-sharing systems.",
        "Priority scheduling can cause starvation if low-priority tasks keep waiting.",
        "Response time matters for interactive systems, while throughput matters for batch systems.",
      ],
      interviewFocus:
        "Know when to prefer Round Robin over FCFS and how starvation can be prevented with aging.",
    },
    {
      title: "Memory Management",
      content:
        "Interviewers often ask paging, segmentation, fragmentation, and virtual memory together.",
      points: [
        "Paging divides memory into fixed-size pages and frames.",
        "Segmentation divides memory logically based on program structure.",
        "Internal fragmentation happens inside allocated blocks; external fragmentation happens between blocks.",
        "Virtual memory allows processes to use more memory than physically available.",
        "Page replacement algorithms include FIFO, LRU, and Optimal.",
      ],
      interviewFocus:
        "Be ready to explain why paging reduces external fragmentation but may still have internal fragmentation.",
    },
    {
      title: "Synchronization and Critical Section",
      content:
        "This is important for interviews because it connects directly to concurrent programming.",
      points: [
        "A critical section is a code segment where shared data is accessed.",
        "Race condition occurs when multiple threads access shared state without proper control.",
        "Mutex, semaphore, and monitor are common synchronization tools.",
        "Binary semaphore behaves similarly to a lock, while counting semaphore manages multiple resources.",
        "Good synchronization provides mutual exclusion without causing unnecessary blocking.",
      ],
      interviewFocus:
        "Explain race condition with a shared counter example and how a mutex fixes it.",
    },
    {
      title: "Deadlock",
      content:
        "Deadlock is a classic OS topic and often appears in theory rounds.",
      points: [
        "Deadlock occurs when a set of processes waits forever for resources held by each other.",
        "Necessary conditions are mutual exclusion, hold and wait, no preemption, and circular wait.",
        "Deadlock handling approaches are prevention, avoidance, detection, and recovery.",
        "Banker's algorithm is used for deadlock avoidance.",
        "Breaking any one necessary condition prevents deadlock.",
      ],
      interviewFocus:
        "Memorize the four Coffman conditions and explain them with a simple resource example.",
    },
  ];

  return (
    <SubjectPage
      subjectName="Operating System"
      intro={intro}
      topics={topics}
    />
  );
};

export default OperatingSystem;
