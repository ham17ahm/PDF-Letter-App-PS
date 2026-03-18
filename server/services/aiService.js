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
async function processWithAI(promptText, ocrText) {
  if (aiConfig.provider === "gemini") {
    const client = getClient();
    const model = client.getGenerativeModel({ model: aiConfig.model });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${promptText}\n\n--- BEGIN OCR TEXT ---\n${ocrText}\n--- END OCR TEXT ---`,
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
