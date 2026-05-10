import dotenv from "dotenv";
import { generateJson } from "./aiClient.js";

dotenv.config();

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
  "summary": "2 to 4 short lines of friendly feedback",
  "strengths": ["short point", "short point"],
  "improvement": "one short improvement suggestion",
  "score": number
}

Rules:
- Keep it constructive and realistic
- Mention 1 or 2 strengths
- Mention exactly 1 main improvement area
- Score must be between 0 and 10
- You may use light emojis sparingly if they fit naturally
`;

  const parsed = await generateJson({
    prompt,
    temperature: 0.4,
  });

  return {
    summary: parsed.summary || "Good effort. Keep refining the structure of your answer.",
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 2) : [],
    improvement: parsed.improvement || "Add a little more structure and technical depth.",
    score: Number(parsed.score) || 0,
  };
}
