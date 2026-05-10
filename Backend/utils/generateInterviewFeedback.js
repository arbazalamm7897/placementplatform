import dotenv from "dotenv";
import { generateJson } from "./aiClient.js";

dotenv.config();

export default async function generateInterviewFeedback(questions, answers) {
  const prompt = `
You are a friendly senior technical interviewer.

Interview questions:
${questions.map((question, index) => `${index + 1}. ${question}`).join("\n")}

Candidate answers:
${answers
  .map(
    (item, index) =>
      `${index + 1}. Question: ${item.question}\nAnswer: ${item.answer}\nQuick feedback: ${item.feedback?.summary || "N/A"}`
  )
  .join("\n\n")}

Return ONLY valid JSON in this format:
{
  "overallPerformance": "3 to 5 lines",
  "strongAreas": ["topic", "topic", "topic"],
  "weakAreas": ["topic", "topic", "topic"],
  "communicationFeedback": "short feedback",
  "actionableImprovements": ["action", "action", "action"],
  "closingMessage": "encouraging closing message",
  "score": number
}

Rules:
- Keep the tone professional and friendly
- Mention realistic strong and weak topics based on the answers
- Action items must be practical
- You may use light emojis sparingly if they fit naturally
- Score must be between 0 and 10
`;

  const parsed = await generateJson({
    prompt,
    temperature: 0.4,
  });

  return {
    overallPerformance:
      parsed.overallPerformance ||
      "Solid effort overall. You showed useful understanding, and there is still room to sharpen depth and structure.",
    strongAreas: Array.isArray(parsed.strongAreas) ? parsed.strongAreas.slice(0, 4) : [],
    weakAreas: Array.isArray(parsed.weakAreas) ? parsed.weakAreas.slice(0, 4) : [],
    communicationFeedback:
      parsed.communicationFeedback ||
      "Your communication was understandable, but clearer structure would make your answers stronger.",
    actionableImprovements: Array.isArray(parsed.actionableImprovements)
      ? parsed.actionableImprovements.slice(0, 4)
      : [],
    closingMessage:
      parsed.closingMessage ||
      "Keep practicing consistently and your interview confidence will grow.",
    score: Number(parsed.score) || 0,
  };
}
