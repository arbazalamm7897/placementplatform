import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function generateInterviewQuestions(resumeText) {
  const prompt = `
You are an interview expert.
Based on the following resume, generate:
- 3 technical questions
- 2 project-based questions
- 2 behavioral questions

Resume:
${resumeText}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.choices[0].message.content;

  // Return as array of questions
  return text
    .split("\n")
    .map(q => q.trim())
    .filter(q => q.length > 0);
}
