import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function generateInterviewFeedback(questions, answers) {
  const prompt = `
You are a senior technical interviewer.

Questions:
${questions.join("\n")}

Candidate Answers:
${answers.map((a, i) => `${i + 1}. ${a.answer}`).join("\n")}

Give:
1. Short overall feedback (5–6 lines)
2. Strengths
3. Areas of improvement
4. Final score out of 10

Respond strictly in JSON:
{
  "feedback": "text",
  "score": number
}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
  });

  return JSON.parse(response.choices[0].message.content);
}
