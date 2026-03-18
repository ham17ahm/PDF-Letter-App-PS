const vision = require("@google-cloud/vision");

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

/**
 * Extract text from a PDF buffer using Google Cloud Vision.
 * Vision API supports PDF natively via asyncBatchAnnotateFiles,
 * but for simplicity we use document text detection on the raw buffer.
 */
async function extractTextFromPdf(fileBuffer) {
  const request = {
    requests: [
      {
        inputConfig: {
          content: fileBuffer.toString("base64"),
          mimeType: "application/pdf",
        },
        features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
      },
    ],
  };

  const [result] = await client.batchAnnotateFiles(request);
  const responses = result.responses[0].responses;

  const fullText = responses
    .map((page, i) => {
      const text = page.fullTextAnnotation?.text || "";
      return `── Page ${i + 1} ──\n${text}`;
    })
    .join("\n\n");

  return fullText;
}

module.exports = { extractTextFromPdf };
