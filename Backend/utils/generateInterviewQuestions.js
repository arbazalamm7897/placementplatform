import dotenv from "dotenv";
import { generateText } from "./aiClient.js";
import { createError } from "./appError.js";

dotenv.config();

// Helper: extract only real questions
const extractQuestions = (text) => {
  return text
    .split("\n")
    .map((line) =>
      line
        .replace(/^\d+[\).\s]*/, "")
        .replace(/\*\*/g, "")
        .trim()
    )
    .filter((line) => line.endsWith("?") && line.length > 10);
};

const fallbackQuestions = [
  "Can you introduce yourself and walk me through your background?",
  "What are the most important technical skills you have used recently?",
  "Can you describe a project you worked on and your specific contribution?",
  "Tell me about a technical challenge you faced and how you solved it?",
  "How would you debug an issue in a backend application that fails intermittently?",
  "What trade-offs do you consider when designing an API or system component?",
  "Tell me about a time you worked with a team to deliver a project under pressure?",
];

export default async function generateInterviewQuestions(resumeText) {
  if (!resumeText?.trim()) {
    throw createError("Resume text could not be extracted from the uploaded PDF", 400, {
      code: "EMPTY_RESUME_TEXT",
    });
  }

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

  try {
    const rawText = await generateText({
      prompt,
      temperature: 0.7,
    });

    const questions = extractQuestions(rawText);

    if (questions.length >= 5) {
      console.log("Clean AI questions:", questions);
      return questions;
    }

    console.warn("AI returned too few clean interview questions, using fallback set.");
    return fallbackQuestions;
  } catch (error) {
    console.error("Interview question generation failed:", error.message);

    if (error?.message?.includes("Missing GROQ_API_KEY")) {
      throw createError("Interview AI is not configured on the server", 500, {
        code: "INTERVIEW_AI_NOT_CONFIGURED",
        details: error.message,
      });
    }

    if (error?.message?.includes("AI response was empty")) {
      return fallbackQuestions;
    }

    throw createError("Could not generate interview questions from the resume", 500, {
      code: "INTERVIEW_QUESTION_GENERATION_FAILED",
      details: error.message,
    });
  }
}
