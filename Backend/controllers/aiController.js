import { generateText } from "../utils/aiClient.js";
import asyncHandler from "../utils/asyncHandler.js";
import { createError } from "../utils/appError.js";

export const askAI = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    throw createError("Prompt is required", 400, {
      code: "PROMPT_REQUIRED",
    });
  }

  const answer = await generateText({
    prompt,
    provider: "openrouter",
    temperature: 0.4,
    maxTokens: 2000,
  });

  res.status(200).json({ answer });
});
