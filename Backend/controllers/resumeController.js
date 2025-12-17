import { createRequire } from "module";
import fetch from "node-fetch";

const require = createRequire(import.meta.url);
const pdfParseModule = require("pdf-parse");
const pdfParse = pdfParseModule.default || pdfParseModule;

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No resume uploaded" });

    const pdfData = await pdfParse(req.file.buffer);

    const prompt = `
You are an ATS Resume Analyzer.
Return ONLY valid JSON in this format:
{
  "score": number (0-10),
  "feedback": [
    { "title": string, "desc": string }
  ]
}
Resume Content:
${pdfData.text}
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gemma-3-12b",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2000,
      }),
    });

    const data = await response.json();
    const text = data.choices[0].message.content;

    // Parse JSON safely
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;
    const aiData = JSON.parse(text.slice(jsonStart, jsonEnd));

    res.status(200).json(aiData);

  } catch (error) {
    console.error("Resume Analyzer Error:", error);
    res.status(500).json({ error: "Resume analysis failed", details: error.message });
  }
};
