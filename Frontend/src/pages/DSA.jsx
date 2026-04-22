import SubjectPage from "./SubjectPage";

const DSA = () => {
  const intro =
    "DSA is the highest-impact subject for coding rounds. For placements, focus on patterns, complexity analysis, and explaining your approach before coding.";

  const topics = [
    {
      title: "Arrays, Strings, and Two Pointers",
      content:
        "These are the most common starting topics for online assessments and interview rounds.",
      points: [
        "Master traversal, prefix sum, sliding window, and two-pointer patterns.",
        "Common problems include longest substring, remove duplicates, and subarray sum.",
        "Strings often test indexing, hashing, or frequency arrays.",
        "Time complexity should be discussed before implementation.",
        "Try to replace nested loops with hashing or window techniques when possible.",
      ],
      interviewFocus:
        "Be ready to explain why your optimized solution improves from O(n^2) to O(n).",
    },
    {
      title: "Linked Lists, Stacks, and Queues",
      content:
        "These structures are asked both for operations and for problem-solving patterns.",
      points: [
        "Linked lists are useful for dynamic memory scenarios and pointer-based questions.",
        "Practice reverse list, detect cycle, merge lists, and middle node problems.",
        "Stacks are used in expression evaluation, monotonic stack problems, and recursion simulation.",
        "Queues help in BFS, scheduling, and producer-consumer style models.",
        "Deque is useful for sliding window maximum and efficient front/back operations.",
      ],
      interviewFocus:
        "Understand pointer movement carefully because most mistakes in linked-list problems are pointer-update bugs.",
    },
    {
      title: "Trees, BST, and Graphs",
      content:
        "These topics appear in interviews because they reveal how well you reason recursively and structurally.",
      points: [
        "Know preorder, inorder, postorder, and level-order traversal.",
        "Binary Search Tree property helps prune search efficiently.",
        "Graph basics include representation, BFS, DFS, cycle detection, and topological sort.",
        "Tree recursion often relies on divide-and-combine thinking.",
        "Graph questions usually test traversal plus state tracking with visited arrays or sets.",
      ],
      interviewFocus:
        "Practice one strong explanation for BFS vs DFS and when each is preferred.",
    },
    {
      title: "Sorting, Searching, and Binary Search",
      content:
        "This is a core interview area because it connects algorithm choice to complexity.",
      points: [
        "Know the time and space complexity of bubble, selection, insertion, merge, quick, and heap sort.",
        "Binary search is not just for sorted arrays; it also applies to answer-space problems.",
        "Merge sort is stable and O(n log n), quicksort is fast on average but worst-case O(n^2).",
        "Understand stable vs unstable sorting.",
        "Search problems often become easier after sorting or using hashing.",
      ],
      interviewFocus:
        "Learn how to identify monotonic conditions for binary search on answers.",
    },
    {
      title: "Dynamic Programming and Greedy",
      content:
        "For placements, you do not need every advanced DP, but you do need a clean way to derive states and transitions.",
      points: [
        "DP works well when there are overlapping subproblems and optimal substructure.",
        "Start with recursion, memoize it, then convert to tabulation if needed.",
        "Greedy works when a local optimal choice leads to a global optimal solution.",
        "Practice LIS basics, knapsack pattern, coin change, and grid DP.",
        "Always justify greedy correctness; it is not enough to say it feels optimal.",
      ],
      interviewFocus:
        "State definition is the heart of DP. If you define state well, the solution usually follows.",
    },
  ];

  return (
    <SubjectPage
      subjectName="Data Structures & Algorithms"
      intro={intro}
      topics={topics}
    />
  );
};

export default DSA;
