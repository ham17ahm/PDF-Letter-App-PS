module.exports = {
  id: "translate-urdu-to-english",
  label: "Translate Urdu → English (dummy)",
  buildPrompt: (ocrText, note) => {
    let prompt =
      "Translate the following Urdu text into fluent, natural English. Preserve the original meaning, tone, and formatting as closely as possible." +
      `\n\n--- BEGIN OCR TEXT ---\n${ocrText}\n--- END OCR TEXT ---`;
    if (note)
      prompt += `\n\n--- ADDITIONAL NOTE ---\n${note}\n--- END NOTE ---`;
    return prompt;
  },
};
