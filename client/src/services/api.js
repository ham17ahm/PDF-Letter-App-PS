const BASE_URL = "/api";

export async function uploadForOcr(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/ocr`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

export async function getPrompts() {
  const res = await fetch(`${BASE_URL}/prompts`);
  return res.json();
}

export async function processWithAI(ocrText, promptId, note = "") {
  const res = await fetch(`${BASE_URL}/ai/process`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ocrText, promptId, note }),
  });
  return res.json();
}

export async function saveLetter(letterData) {
  const res = await fetch(`${BASE_URL}/letters`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(letterData),
  });
  return res.json();
}

export async function getLetter(id) {
  const res = await fetch(`${BASE_URL}/letters/${id}`);
  return res.json();
}

export async function generatePdf(type, printData) {
  const res = await fetch(`${BASE_URL}/pdf/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, printData }),
  });
  return res.json();
}
