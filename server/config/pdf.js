// ──────────────────────────────────────────────
// PDF GENERATION SETTINGS — configure here only.
// ──────────────────────────────────────────────

module.exports = {
  // Folder where generated PDFs are saved
  savePath: "H:\\PS Office Islamabad UK\\online_letter_app",

  // Path to your Chrome executable
  chromePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",

  // URL of the frontend (Vite dev server)
  frontendUrl: "http://localhost:5173",

  // Filename prefix per print type (rest of name is timestamp)
  prefixes: {
    "ps-english": "PS_ENG",
    "hz-english": "HZ_ENG",
    "ps-urdu":    "PS_URD",
    "hz-urdu":    "HZ_URD",
  },
};
