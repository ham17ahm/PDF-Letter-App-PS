// ──────────────────────────────────────────────
// ADD, REMOVE, OR EDIT PROMPTS HERE ONLY.
// The dropdown on the frontend auto-updates.
// ──────────────────────────────────────────────

const prompts = [
  {
    id: "summary-english",
    label: "Summarise in English",
    promptText:
      "You are given the OCR text of a letter. Summarise it clearly in English, preserving all key details, names, dates, and action items.",
  },
  {
    id: "summary-urdu",
    label: "Summarise in Urdu",
    promptText:
      "You are given the OCR text of a letter. Provide a concise Urdu summary, preserving all key details, names, dates, and action items.",
  },
  {
    id: "translate-urdu-to-english",
    label: "Translate Urdu → English",
    promptText:
      "Translate the following Urdu text into fluent, natural English. Preserve the original meaning, tone, and formatting as closely as possible.",
  },
  // ← Just add a new object here for a new prompt
];

module.exports = prompts;
