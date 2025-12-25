// Backend/seed/interviewQuestions.js

export default function generateInterviewQuestions(profile) {
  const questions = [];

  // Warm-up
  questions.push("Tell me about yourself");
  questions.push("Walk me through your resume");

  // Skill-based
  profile.skills.forEach(skill => {
    questions.push(`Explain ${skill} and where you used it`);
    questions.push(`What challenges did you face while working with ${skill}?`);
  });

  // Projects
  if (profile.hasProjects) {
    questions.push("Explain your most challenging project");
    questions.push("How did you handle errors in your project?");
  }

  // Internship / Experience
  if (profile.hasInternship || profile.hasExperience) {
    questions.push("Describe your role in your internship or job");
    questions.push("What real-world problem did you solve?");
  }

  // Behavioral
  questions.push("What is your biggest strength?");
  questions.push("Where do you see yourself in 5 years?");
  questions.push("Why should we hire you?");

  return questions.slice(0, 15);
}
