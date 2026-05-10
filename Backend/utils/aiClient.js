import fetch from "node-fetch";
import Groq from "groq-sdk";

const getGroqClient = () => {
  if (!process.env.GROQ_API_KEY) {
    return null;
  }

  return new Groq({ apiKey: process.env.GROQ_API_KEY });
};

const getDefaultProvider = () => process.env.AI_PROVIDER || "groq";

const getDefaultModels = () => ({
  groq: {
    chat: process.env.GROQ_CHAT_MODEL || "llama-3.1-8b-instant",
    structured: process.env.GROQ_STRUCTURED_MODEL || "llama-3.1-8b-instant",
  },
  openrouter: {
    chat: process.env.OPENROUTER_CHAT_MODEL || "gemma-3-12b",
    structured: process.env.OPENROUTER_STRUCTURED_MODEL || "gemma-3-12b",
  },
});

const extractTextContent = (content) => {
  if (typeof content === "string") {
    return content.trim();
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part;
        if (part?.type === "text" && typeof part.text === "string") {
          return part.text;
        }
        return "";
      })
      .join("")
      .trim();
  }

  return "";
};

const getProvider = (preferredProvider) =>
  preferredProvider || getDefaultProvider();

const getDefaultModel = (provider, mode) => {
  const providerModels = getDefaultModels()[provider];
  if (!providerModels) {
    throw new Error(`Unsupported AI provider: ${provider}`);
  }

  return providerModels[mode] || providerModels.chat;
};

const ensureProviderConfig = (provider) => {
  if (provider === "groq" && !process.env.GROQ_API_KEY) {
    throw new Error("Missing GROQ_API_KEY in backend environment");
  }

  if (provider === "openrouter" && !process.env.OPENROUTER_API_KEY) {
    throw new Error("Missing OPENROUTER_API_KEY in backend environment");
  }
};

const buildMessages = ({ systemPrompt, prompt }) => {
  const messages = [];

  if (systemPrompt?.trim()) {
    messages.push({ role: "system", content: systemPrompt.trim() });
  }

  messages.push({ role: "user", content: prompt.trim() });
  return messages;
};

const callGroq = async ({ messages, model, temperature, maxTokens }) => {
  const groqClient = getGroqClient();

  if (!groqClient) {
    throw new Error("Missing GROQ_API_KEY in backend environment");
  }

  const response = await groqClient.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens: maxTokens,
  });

  return extractTextContent(response.choices?.[0]?.message?.content);
};

const callOpenRouter = async ({ messages, model, temperature, maxTokens }) => {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const details = data?.error?.message || data?.message || "Unknown AI provider error";
    throw new Error(`OpenRouter request failed: ${details}`);
  }

  return extractTextContent(data?.choices?.[0]?.message?.content);
};

const providerCallers = {
  groq: callGroq,
  openrouter: callOpenRouter,
};

export const extractJson = (text) => {
  if (!text?.trim()) {
    throw new Error("AI response was empty");
  }

  const fencedMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fencedMatch ? fencedMatch[1] : text;
  const jsonStart = candidate.indexOf("{");
  const jsonEnd = candidate.lastIndexOf("}") + 1;

  if (jsonStart === -1 || jsonEnd === 0) {
    throw new Error("AI did not return valid JSON");
  }

  return JSON.parse(candidate.slice(jsonStart, jsonEnd));
};

export const generateText = async ({
  prompt,
  systemPrompt = "",
  provider,
  model,
  temperature = 0.4,
  maxTokens = 2000,
  mode = "chat",
}) => {
  if (!prompt?.trim()) {
    throw new Error("Prompt is required");
  }

  const resolvedProvider = getProvider(provider);
  ensureProviderConfig(resolvedProvider);

  const caller = providerCallers[resolvedProvider];
  if (!caller) {
    throw new Error(`Unsupported AI provider: ${resolvedProvider}`);
  }

  const content = await caller({
    messages: buildMessages({ systemPrompt, prompt }),
    model: model || getDefaultModel(resolvedProvider, mode),
    temperature,
    maxTokens,
  });

  if (!content) {
    throw new Error("AI response was empty");
  }

  return content;
};

export const generateJson = async (options) => {
  const content = await generateText({
    ...options,
    mode: options.mode || "structured",
  });

  return extractJson(content);
};
