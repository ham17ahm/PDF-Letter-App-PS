// ──────────────────────────────────────────────
// PROMPT ORCHESTRATOR — do not add prompts here.
// To add or edit a prompt, work in server/prompts/
// Each .js file there is one prompt. This file
// auto-loads all of them; the dropdown updates
// automatically.
// ──────────────────────────────────────────────

const fs = require("fs");
const path = require("path");

const promptsDir = path.join(__dirname, "../prompts");

const prompts = fs
  .readdirSync(promptsDir)
  .filter((f) => f.endsWith(".js"))
  .map((f) => require(path.join(promptsDir, f)));

module.exports = prompts;
