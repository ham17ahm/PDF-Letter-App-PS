module.exports = {
  id: "dua-acknowledgement-eng",
  label: "PS Acknowledgement Dua (Eng)",
  buildPrompt: (ocrText, note) => {
    let prompt = `{
  "task": "prayer_acknowledgement_letter_generation",
  "objective": "Write a formal prayer acknowledgement letter using the specified format by extracting relevant details from provided correspondence",
  "letter_template": {
    "format": "Huzoor Anwar (may Allah be his Helper) has received your letter [regarding/pertaining to/with regards to/concerning] [executive_summary].\n\nPlease note that in compliance with the directives and guidance of Huzoor Anwar (aa), this matter is being inquired about.\n\n[prayer_phrases]",
    "variables": {
      "prayer_phrases": {
        "description": "Appropriate and formal short prayer sentences in alignment to the content of the letter",
        "phrase_beginning": "May Allah Taala",
        "phrase_ending": "Amin",
        "example_1": "remove all your difficulties and keep you in His benign care and protection.",
        "example_2": "shower His infinite blessings upon you, guide you in every way and keep you always in His care.",
        "example_3": "be your Guide and Helper and continue to bless you with His divine favour and bounties.",
      },
      "executive_summary": {
        "description": "Very brief executive summary of the matter at hand, the crux of the matter",
        "constraints": "No more than one comprehensively constructed sentence",
        "extraction_from": "raw correspondence"
      }
    }
  },
  "output": {
    "type": "formal_letter",
    "format": "text",
    "structure": "Complete acknowledgement letter following the specified template"
  },
  "instructions": [
    "Create a concise executive summary (one sentence) of the matter",
    "Create the prayer phrase according to the letter’s content",
    "Generate the formal acknowledgement letter using the extracted information",
    "Maintain the formal tone and exact phrasing of the template"
  ]
}

--- BEGIN OCR TEXT ---
${ocrText}
--- END OCR TEXT ---`;

    if (note)
      prompt += `\n\n--- ADDITIONAL NOTE ---\n${note}\n--- END NOTE ---`;
    return prompt;
  },
};
