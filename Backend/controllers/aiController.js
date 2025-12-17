import fetch from "node-fetch";

export const askAI = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

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
    const answer = data.choices[0].message.content;

    res.status(200).json({ answer });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "AI request failed", details: error.message });
  }
};
