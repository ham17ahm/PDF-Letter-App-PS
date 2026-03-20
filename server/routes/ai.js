const express = require("express");
const prompts = require("../config/prompts");
const { processWithAI } = require("../services/aiService");

const router = express.Router();

// POST /api/ai/process — Process OCR text with a selected prompt
router.post("/process", async (req, res) => {
  try {
    const { ocrText, promptId, note } = req.body;

    if (!ocrText || !promptId) {
      return res
        .status(400)
        .json({ success: false, error: "ocrText and promptId are required" });
    }

    const prompt = prompts.find((p) => p.id === promptId);
    if (!prompt) {
      return res
        .status(400)
        .json({ success: false, error: `Unknown prompt ID: ${promptId}` });
    }

    const response = await processWithAI(prompt.buildPrompt(ocrText, note));
    res.json({ success: true, response });
  } catch (error) {
    console.error("AI processing error:", error.message);
    res
      .status(500)
      .json({ success: false, error: "AI processing failed" });
  }
});

module.exports = router;
