import { generateText } from "../utils/aiClient.js";

export async function generateInterviewQuestions(resumeText) {
  const prompt = `
You are an interview expert.

Based on the following resume, generate:
- 3 technical questions
- 2 project-based questions
- 2 behavioral questions

Resume:
${resumeText}
`;

  return generateText({
    prompt,
    temperature: 0.7,
  });
}
