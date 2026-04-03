const express = require("express");
const mongoose = require("mongoose");
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

// GET /api/letters — paginated list (summary fields only, newest first)
// Query params: ?page=1&limit=20
router.get("/", async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip  = (page - 1) * limit;

    const [letters, total] = await Promise.all([
      Letter.find({}, { originalText: 0 })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Letter.countDocuments(),
    ]);

    res.json({
      success: true,
      letters,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (error) {
    console.error("List letters error:", error.message);
    res.status(500).json({ success: false, error: "Failed to retrieve letters" });
  }
});

// DELETE /api/letters/:id — Delete a letter
router.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ success: false, error: "Invalid record ID" });
  }
  try {
    const letter = await Letter.findByIdAndDelete(req.params.id);
    if (!letter) {
      return res.status(404).json({ success: false, error: "Letter not found" });
    }
    res.json({ success: true });
  } catch (error) {
    console.error("Delete letter error:", error.message);
    res.status(500).json({ success: false, error: "Failed to delete letter" });
  }
});

// GET /api/letters/:id — Retrieve a letter by ID
router.get("/:id", async (req, res) => {
  // Validate the ID format before hitting the database.
  // A bad ID would otherwise cause mongoose to throw a CastError.
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ success: false, error: "Invalid record ID" });
  }
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
