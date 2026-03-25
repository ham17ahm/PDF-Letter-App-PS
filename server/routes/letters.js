const express = require("express");
const Letter = require("../models/Letter");

const router = express.Router();

// POST /api/letters — Save a letter
router.post("/", async (req, res) => {
  try {
    const { originalText, processedText, promptUsed, originalFileName, addressee, footnote, note } =
      req.body;

    if (!originalText || !processedText || !promptUsed) {
      return res.status(400).json({
        success: false,
        error: "originalText, processedText, and promptUsed are required",
      });
    }

    const letter = await Letter.create({
      originalText,
      processedText,
      promptUsed,
      originalFileName,
      addressee,
      footnote,
      note,
    });

    res.status(201).json({ success: true, letter });
  } catch (error) {
    console.error("Save letter error:", error.message);
    res.status(500).json({ success: false, error: "Failed to save letter" });
  }
});

// GET /api/letters/:id — Retrieve a letter by ID
router.get("/:id", async (req, res) => {
  try {
    const letter = await Letter.findById(req.params.id);
    if (!letter) {
      return res.status(404).json({ success: false, error: "Letter not found" });
    }
    res.json({ success: true, letter });
  } catch (error) {
    console.error("Get letter error:", error.message);
    res.status(500).json({ success: false, error: "Failed to retrieve letter" });
  }
});

module.exports = router;
