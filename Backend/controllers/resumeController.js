import { createRequire } from "module";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const require = createRequire(import.meta.url);
const pdfParseModule = require("pdf-parse");
const pdfParse = pdfParseModule.default || pdfParseModule;

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

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No resume uploaded" });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        error: "Missing GROQ_API_KEY in backend environment",
      });
    }

    const pdfData = await pdfParse(req.file.buffer);

    if (!pdfData.text?.trim()) {
      return res.status(400).json({
        error: "Could not extract text from the uploaded PDF",
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

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const content = completion.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("AI response was empty");
    }

    const aiData = extractJson(content);

    res.status(200).json({
      score: Number(aiData.score) || 0,
      feedback: Array.isArray(aiData.feedback) ? aiData.feedback : [],
    });
  } catch (error) {
    console.error("Resume Analyzer Error:", error);
    res.status(500).json({
      error: "Resume analysis failed",
      details: error.message,
    });
  }
};
