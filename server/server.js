require("dotenv").config({ path: "../.env" });

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { PORT } = require("./config/constants");

// Routes
const ocrRoutes = require("./routes/ocr");
const promptRoutes = require("./routes/prompts");
const aiRoutes = require("./routes/ai");
const letterRoutes = require("./routes/letters");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Register routes
app.use("/api/ocr", ocrRoutes);
app.use("/api/prompts", promptRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/letters", letterRoutes);

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
