import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function generateInterviewFeedback(questions, answers) {
  const prompt = `
You are a senior technical interviewer.

Based on the following interview:

Questions:
${questions.map((q, i) => `${i + 1}. ${q}`).join("\n")}

Answers:
${answers.map((a, i) => `${i + 1}. ${a}`).join("\n")}

Give:
1. Overall score out of 10
2. Technical strengths
3. Areas of improvement
4. Final hiring recommendation (Yes / Maybe / No)
`;

  const res = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
  });

  return res.choices[0].message.content;
}
