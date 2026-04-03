// ──────────────────────────────────────────────────────────────────────────────
// PDF GENERATION SETTINGS
//
// Set PDF_SAVE_PATH and CHROME_PATH in your .env file to override the defaults.
// This keeps machine-specific paths out of the code so the app works on any PC.
// ──────────────────────────────────────────────────────────────────────────────

module.exports = {
  // Folder where generated PDFs are saved.
  // Set PDF_SAVE_PATH in .env to override (e.g. H:\PS Office Islamabad UK\online_letter_app)
  savePath: process.env.PDF_SAVE_PATH || "./generated_pdfs",

  // Path to your Chrome or Chromium executable.
  // Set CHROME_PATH in .env to override (e.g. C:\Program Files\Google\Chrome\Application\chrome.exe)
  chromePath: process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",

  // URL of the frontend (Vite dev server)
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",

  // Filename prefix per print type (rest of name is timestamp)
  prefixes: {
    "ps-english": "PS_ENG",
    "hz-english": "HZ_ENG",
    "ps-urdu":    "PS_URD",
    "hz-urdu":    "HZ_URD",
  },
};
