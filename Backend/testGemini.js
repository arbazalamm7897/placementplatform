import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

async function testGemini() {
  const response = await fetch("https://openrouter.ai/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-preview-09-2025",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello! Can you summarize a resume for me?" }
      ],
      max_tokens: 500
    }),
  });

  const data = await response.json();
  console.log(data);
}

testGemini();
