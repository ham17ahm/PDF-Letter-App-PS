require("dotenv").config({ path: "../.env" });

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const { PORT } = require("./config/constants");

// Routes
const ocrRoutes = require("./routes/ocr");
const promptRoutes = require("./routes/prompts");
const aiRoutes = require("./routes/ai");
const letterRoutes = require("./routes/letters");
const pdfRoutes = require("./routes/pdf");

const app = express();

// ── CORS — only allow requests from the configured frontend origin ──
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(cors({ origin: allowedOrigin }));

// ── Rate limiting — prevent API abuse and runaway AI/OCR costs ──
// General limit: 100 requests per minute for all routes
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,       // 1 minute window
  max: 100,                  // max requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many requests. Please slow down." },
});

// Strict limit for expensive OCR and AI routes
const expensiveLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many requests. Please wait a moment." },
});

app.use(generalLimiter);
app.use(express.json());

// Register routes (OCR and AI get the stricter rate limit)
app.use("/api/ocr", expensiveLimiter, ocrRoutes);
app.use("/api/ai", expensiveLimiter, aiRoutes);
app.use("/api/prompts", promptRoutes);
app.use("/api/letters", letterRoutes);
app.use("/api/pdf", pdfRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Start server
async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
