const express = require("express");
const prompts = require("../config/prompts");

const router = express.Router();

// GET /api/prompts — Return prompt list (id + label only, no prompt text)
router.get("/", (_req, res) => {
  const safeList = prompts.map(({ id, label }) => ({ id, label }));
  res.json(safeList);
});

module.exports = router;
