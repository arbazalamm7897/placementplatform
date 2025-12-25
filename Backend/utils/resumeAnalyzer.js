import extractSkills from "./extractSkills.js";

export default function analyzeResume(resumeText) {
  const skills = extractSkills(resumeText);

  const hasProjects = resumeText.toLowerCase().includes("project");
  const hasInternship = resumeText.toLowerCase().includes("intern");
  const hasExperience = resumeText.toLowerCase().includes("experience");

  return { skills, hasProjects, hasInternship, hasExperience };
}
