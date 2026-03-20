module.exports = {
  id: "summary-english",
  label: "Summarise in English",
  buildPrompt: (ocrText, note) => {
    let prompt =
      "You are given the OCR text of a letter. Summarise it clearly in English, preserving all key details, names, dates, and action items." +
      `\n\n--- BEGIN OCR TEXT ---\n${ocrText}\n--- END OCR TEXT ---`;
    if (note) prompt += `\n\n--- ADDITIONAL NOTE ---\n${note}\n--- END NOTE ---`;
    return prompt;
  },
};
