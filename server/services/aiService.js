const { GoogleGenerativeAI } = require("@google/generative-ai");
const aiConfig = require("../config/ai-service");

let genAI = null;

function getClient() {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(aiConfig.apiKey);
  }
  return genAI;
}

/**
 * Send prompt + OCR text to the configured AI provider and return the response.
 */
async function processWithAI(promptText, ocrText, note = "") {
  if (aiConfig.provider === "gemini") {
    const client = getClient();
    const model = client.getGenerativeModel({ model: aiConfig.model });

    let fullPrompt = `${promptText}\n\n--- BEGIN OCR TEXT ---\n${ocrText}\n--- END OCR TEXT ---`;
    if (note) {
      fullPrompt += `\n\n--- ADDITIONAL NOTE ---\n${note}\n--- END NOTE ---`;
    }

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: fullPrompt,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: aiConfig.maxTokens,
        temperature: aiConfig.temperature,
      },
    });

    return result.response.text();
  }

  throw new Error(`Unsupported AI provider: ${aiConfig.provider}`);
}

module.exports = { processWithAI };
