// ──────────────────────────────────────────────
// CHANGE AI PROVIDER SETTINGS HERE ONLY.
// ──────────────────────────────────────────────

module.exports = {
  provider: "gemini",
  model: "gemini-2.0-flash",
  apiKey: process.env.AI_API_KEY,
  maxTokens: 2000,
  temperature: 0.3,
};
