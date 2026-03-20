module.exports = {
  id: "for-report-eng",
  label: "For Report (English)",
  buildPrompt: (ocrText, note) => {
    let prompt = `{
  "task": "formal_letter_generation",
  "objective": "Write a formal letter using specified format by extracting and organising details and information from a raw OCR-generated document",
  "letter_formats": {
    "format_1": {
      "template": "Huzoor Anwar (may Allah be his Helper) has received a letter from [Name of Author] (Add: [Address, Location and Details of Author]), wherein he/she has written the following:\\n\\n[SUMMARY]\\n\\nAs per the directives and guidance of Huzoor Anwar (aa), you are kindly requested to provide your report on the aforementioned matter. Jazakumullah",
      "components": {
        "opening": "Huzoor Anwar (may Allah be his Helper) has received a letter from",
        "author_details": "[Name of Author] (Add: [Address, Location and Details of Author])",
        "transition": "wherein he/she has written the following:",
        "summary_section": "[SUMMARY]",
        "closing": "As per the directives and guidance of Huzoor Anwar (aa), you are kindly requested to provide your report on the aforementioned matter. Jazakumullah"
      }
    },
    "format_2": {
      "template": "[Name of Author] (Add: [Address, Location and Details of Author]) has written a letter to Huzoor Anwar (may Allah be his Helper), a gist of which is as follows:\\n\\n[SUMMARY]\\n\\nAs per the directives and guidance of Huzoor Anwar (aa), you are kindly requested to provide your report on the aforementioned matter. Jazakumullah",
      "components": {
        "opening": "[Name of Author] (Add: [Address, Location and Details of Author]) has written a letter to Huzoor Anwar (may Allah be his Helper)",
        "transition": "a gist of which is as follows:",
        "summary_section": "[SUMMARY]",
        "closing": "As per the directives and guidance of Huzoor Anwar (aa), you are kindly requested to provide your report on the aforementioned matter. Jazakumullah"
      }
    }
  },
  "extraction_requirements": {
    "author_name": {
      "description": "Extract full name of letter author",
      "placement": "Replace [Name of Author] in templates"
    },
    "author_details": {
      "description": "Extract address, location and other identifying details",
      "format": "[Address, Location and Details of Author]",
      "placement": "Within parentheses after author name"
    },
    "summary_content": {
      "description": "Concise executive summary of letter content",
      "requirements": {
        "length": "Few sentences comprehensively",
        "perspective": "First person as if author is writing themselves",
        "focus": "Main complaint or issue(s) discussed by author",
        "style": "Executive summary approach"
      }
    }
  },
  "processing_instructions": {
    "step_1": "Read and analyze the raw letter thoroughly",
    "step_2": "Extract author name and personal details",
    "step_3": "Identify main complaints or issues raised",
    "step_4": "Create first-person summary focusing on complaints/issues",
    "step_5": "Choose appropriate format (1 or 2)",
    "step_6": "Generate formal letter using selected template"
  },
  "content_focus": {
    "primary": "Complaints or issues discussed by the author",
    "secondary": "Any relevant context supporting the main issues",
    "perspective": "First-person narrative as if written by original author"
  },
  "formatting_rules": {
    "summary_placement": "Between template opening and standard closing",
    "paragraph_structure": "Clear separation between sections",
    "closing_formula": "Always end with standard closing phrase",
    "formality_level": "Formal administrative correspondence"
  },
  "output_requirements": {
    "format": "Complete formal letter ready for use",
    "completeness": "All template fields filled with extracted information",
    "accuracy": "Faithful representation of original letter's complaints/issues",
    "tone": "Formal, respectful, administrative"
  }
}

--- BEGIN OCR TEXT ---
${ocrText}
--- END OCR TEXT ---`;

    if (note)
      prompt += `\n\n--- ADDITIONAL NOTE ---\n${note}\n--- END NOTE ---`;
    return prompt;
  },
};
