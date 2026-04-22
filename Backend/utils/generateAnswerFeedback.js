import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const extractJson = (text) => {
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}") + 1;

  if (jsonStart === -1 || jsonEnd === 0) {
    throw new Error("AI did not return valid JSON");
  }

  return JSON.parse(text.slice(jsonStart, jsonEnd));
};

export default async function generateAnswerFeedback(question, answer) {
  const prompt = `
You are a friendly professional technical interviewer.

Interview question:
${question}

Candidate answer:
${answer}

Evaluate the answer on:
- Clarity
- Technical accuracy
- Confidence
- Communication

Return ONLY valid JSON in this format:
{
  "summary": "2 to 4 short lines of friendly feedback with light emojis",
  "strengths": ["short point", "short point"],
  "improvement": "one short improvement suggestion",
  "score": number
}

Rules:
- Keep it constructive and realistic
- Mention 1 or 2 strengths
- Mention exactly 1 main improvement area
- Score must be between 0 and 10
- Use light emojis like 👍, 💡, ⚡ naturally
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.4,
  });

  const content = response.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Empty answer feedback from AI");
  }

  const parsed = extractJson(content);

  return {
    summary: parsed.summary || "Good effort 👍 Keep refining the structure of your answer.",
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 2) : [],
    improvement: parsed.improvement || "Add a little more structure and technical depth.",
    score: Number(parsed.score) || 0,
  };
}
