// ──────────────────────────────────────────────
// CHANGE AI PROVIDER SETTINGS HERE ONLY.
// ──────────────────────────────────────────────

// Available Gemini models (swap the model value below as needed):
//
// ── Gemini 2.5 (Stable) ──────────────────────────────────────────────────────
// "gemini-2.5-pro"              – Most capable; best for complex reasoning & coding
// "gemini-2.5-flash"            – Best price/performance balance; low latency
// "gemini-2.5-flash-lite"       – Fastest & most budget-friendly in the 2.5 family
//
// ── Gemini 3 / 3.1 (Preview — not production-ready) ─────────────────────────
// "gemini-3.1-pro-preview"      – Advanced reasoning, agentic & coding tasks
// "gemini-3-flash-preview"      – Frontier-class performance at lower cost
// "gemini-3.1-flash-lite-preview" – Budget variant of the 3.1 Flash line
//
// ── Legacy (deprecated — avoid for new work) ─────────────────────────────────
// "gemini-2.0-flash"            – Current active model (deprecated, still works)
// "gemini-2.0-flash-lite"       – Lighter deprecated variant
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  provider: "gemini",
  model: "gemini-2.5-flash",
  apiKey: process.env.AI_API_KEY,
  maxTokens: 2000,
  temperature: 0.3,
};
