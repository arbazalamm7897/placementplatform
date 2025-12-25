
const SKILL_KEYWORDS = [
  "javascript", "react", "node", "express", "mongodb",
  "mysql", "sql", "java", "python", "aws", "docker",
  "git", "html", "css", "tailwind"
];

export default function extractSkills(text = "") {
  const lower = text.toLowerCase();
  return SKILL_KEYWORDS.filter(skill => lower.includes(skill));
}