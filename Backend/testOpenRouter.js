import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

async function testOpenRouter() {
  try {
    const prompt = "Say Hello from Gemma 3 12B and give a small JSON example.";

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gemma-3-12b",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    console.log("✅ API RESPONSE:", data);

  } catch (error) {
    console.error("❌ API TEST ERROR:", error);
  }
}

testOpenRouter();
