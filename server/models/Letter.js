const mongoose = require("mongoose");

const letterSchema = new mongoose.Schema({
  // ── Core content ──
  originalText: { type: String, required: true },
  processedText: { type: String, required: true },
  promptUsed: { type: String, required: true },

  // ── Letter fields ──
  addressee: { type: String },
  footnote: { type: String },

  // ── Metadata ──
  originalFileName: { type: String },

  // ── Optional fields (extend later as needed) ──
  tags: [{ type: String }],
  notes: { type: String },
}, {
  timestamps: true, // Auto-manages createdAt and updatedAt
});

module.exports = mongoose.model("Letter", letterSchema);
