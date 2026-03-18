const express = require("express");
const upload = require("../middleware/upload");
const { extractTextFromPdf } = require("../services/ocrService");

const router = express.Router();

// POST /api/ocr — Upload a PDF and extract text via OCR
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }

    const text = await extractTextFromPdf(req.file.buffer);
    res.json({ success: true, text });
  } catch (error) {
    console.error("OCR error:", error.message);
    res.status(500).json({ success: false, error: "OCR processing failed" });
  }
});

module.exports = router;
