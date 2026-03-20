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
 * Send a fully assembled prompt to the configured AI provider and return the response.
 */
async function processWithAI(fullPrompt) {
  if (aiConfig.provider === "gemini") {
    const client = getClient();
    const model = client.getGenerativeModel({ model: aiConfig.model });

    console.log("\n========== GEMINI PROMPT ==========\n");
    console.log(fullPrompt);
    console.log("\n====================================\n");

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
