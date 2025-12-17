import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

async function listModels() {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/models", {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
    });

    const data = await res.json();
    console.log("✅ Available Models:", data);
  } catch (error) {
    console.error("❌ Error fetching models:", error);
  }
}

listModels();
