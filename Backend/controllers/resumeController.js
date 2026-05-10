import { createRequire } from "module";
import dotenv from "dotenv";
import { generateJson } from "../utils/aiClient.js";
import asyncHandler from "../utils/asyncHandler.js";
import { createError } from "../utils/appError.js";

dotenv.config();

const require = createRequire(import.meta.url);
const pdfParseModule = require("pdf-parse");
const pdfParse = pdfParseModule.default || pdfParseModule;

export const analyzeResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw createError("No resume uploaded", 400, {
      code: "RESUME_REQUIRED",
    });
  }

  const pdfData = await pdfParse(req.file.buffer);

  if (!pdfData.text?.trim()) {
    throw createError("Could not extract text from the uploaded PDF", 400, {
      code: "PDF_TEXT_EXTRACTION_FAILED",
    });
  }

  const prompt = `
You are an ATS Resume Analyzer.
Return ONLY valid JSON in this format:
{
  "score": number,
  "feedback": [
    { "title": string, "desc": string }
  ]
}

Rules:
- score must be between 0 and 10
- provide 4 to 6 feedback points
- keep feedback specific and concise

Resume Content:
${pdfData.text}
`;

  const aiData = await generateJson({
    prompt,
    temperature: 0.3,
  });

  res.status(200).json({
    score: Number(aiData.score) || 0,
    feedback: Array.isArray(aiData.feedback) ? aiData.feedback : [],
  });
});
