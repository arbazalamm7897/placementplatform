import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Helper → extract only real questions
const extractQuestions = (text) => {
  return text
    .split("\n")
    .map(line =>
      line
        .replace(/^\d+[\).\s]*/, "")   // remove numbering (1. 2)
        .replace(/\*\*/g, "")          // remove bold **
        .trim()
    )
    .filter(
      line =>
        line.endsWith("?") &&          // only valid questions
        line.length > 10               // avoid junk
    );
};

export default async function generateInterviewQuestions(resumeText) {
  const prompt = `
You are an interview expert.

Generate ONLY interview questions.
Do NOT include explanations, headings, or numbering.

Requirements:
- 3 technical questions
- 2 project-based questions
- 2 behavioral questions

Resume:
${resumeText}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const rawText = response.choices[0].message.content;

  const questions = extractQuestions(rawText);

  console.log("✅ CLEAN AI QUESTIONS:", questions);

  return questions;
}
