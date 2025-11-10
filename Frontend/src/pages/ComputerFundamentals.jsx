import SubjectPage from "./SubjectPage";

const ComputerFundamentals = () => {
  const intro = "Revise the basics of computer science including architecture, logic, and operating concepts.";
  const topics = [
    { title: "Number Systems", content: "Binary, octal, decimal, and hexadecimal number systems." },
    { title: "Logic Gates", content: "Basic logic gates like AND, OR, NOT, XOR used in digital circuits." },
    { title: "Computer Architecture", content: "Understand CPU, memory, input/output, and storage devices." },
    { title: "Basic OS Concepts", content: "Processes, memory, and file management basics." },
    { title: "Networking Basics", content: "Intro to LAN, WAN, protocols, and IP addressing." },
  ];

  return <SubjectPage subjectName="Computer Fundamentals" intro={intro} topics={topics} />;
};

export default ComputerFundamentals;
