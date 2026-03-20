const express = require("express");
const { generateAndSavePdf } = require("../services/pdfService");

const router = express.Router();

// POST /api/pdf/generate — Generate and save PDF to configured directory
router.post("/generate", async (req, res) => {
  try {
    const { type, printData } = req.body;

    if (!type || !printData) {
      return res
        .status(400)
        .json({ success: false, error: "type and printData are required" });
    }

    const fileName = await generateAndSavePdf(type, printData);
    res.json({ success: true, fileName });
  } catch (error) {
    console.error("PDF generation error:", error.message);
    res.status(500).json({ success: false, error: "PDF generation failed" });
  }
});

module.exports = router;
