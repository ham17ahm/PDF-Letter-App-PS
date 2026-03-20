module.exports = {
  id: "summary-urdu",
  label: "Summarise in Urdu",
  buildPrompt: (ocrText, note) => {
    let prompt =
      "You are given the OCR text of a letter. Provide a concise Urdu summary, preserving all key details, names, dates, and action items." +
      `\n\n--- BEGIN OCR TEXT ---\n${ocrText}\n--- END OCR TEXT ---`;
    if (note) prompt += `\n\n--- ADDITIONAL NOTE ---\n${note}\n--- END NOTE ---`;
    return prompt;
  },
};
