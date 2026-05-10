import SubjectPage from "./SubjectPage";

const ComputerFundamentals = () => {
  const intro =
    "Computer Fundamentals helps in aptitude-like technical screening and basic interview rounds. Focus on number systems, digital logic, architecture, memory, and general machine-level understanding.";

  const topics = [
    {
      title: "Number Systems",
      content:
        "Binary and hexadecimal are especially useful when interviewers check low-level basics.",
      points: [
        "Decimal is base 10, binary is base 2, octal is base 8, and hexadecimal is base 16.",
        "Computers work internally in binary.",
        "Hexadecimal is used because it is compact and maps neatly to binary.",
        "Practice decimal-binary-hex conversions.",
        "Two's complement is commonly used for representing signed integers.",
      ],
      interviewFocus:
        "Be ready to convert small numbers quickly and explain why hexadecimal is practical.",
    },
    {
      title: "Logic Gates and Boolean Logic",
      content:
        "These basics appear in foundational rounds and are useful for digital reasoning questions.",
      points: [
        "Basic gates are AND, OR, NOT, NAND, NOR, XOR, and XNOR.",
        "NAND and NOR are universal gates.",
        "Truth tables help describe gate behavior.",
        "Boolean algebra is used to simplify logical expressions.",
        "XOR is useful for parity and bit manipulation style reasoning.",
      ],
      interviewFocus:
        "Know at least one practical use of XOR and why NAND/NOR are called universal gates.",
    },
    {
      title: "Computer Architecture Basics",
      content:
        "Architecture questions often appear in quick-fire rounds to test overall technical awareness.",
      points: [
        "CPU contains ALU, control unit, and registers.",
        "Registers are the fastest small storage units near the CPU.",
        "RAM is volatile memory, while storage devices keep data permanently.",
        "Input devices provide data to the system, output devices present processed results.",
        "Instruction cycle broadly includes fetch, decode, and execute.",
      ],
      interviewFocus:
        "Explain memory hierarchy from registers to cache to RAM to disk in simple terms.",
    },
    {
      title: "Memory and Performance Basics",
      content:
        "This bridges fundamentals with operating systems and performance topics.",
      points: [
        "Cache memory is faster than RAM and helps reduce average memory access time.",
        "Locality of reference explains why caches work well in many programs.",
        "Temporal locality means recently accessed data may be used again soon.",
        "Spatial locality means nearby data is likely to be accessed soon.",
        "Performance discussions often connect directly to cache behavior.",
      ],
      interviewFocus:
        "Memory hierarchy and locality are simple topics that create very strong answers when explained clearly.",
    },
  ];

  return (
    <SubjectPage
      subjectName="Computer Fundamentals"
      intro={intro}
      topics={topics}
    />
  );
};

export default ComputerFundamentals;
