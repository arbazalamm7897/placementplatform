import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}
