const vision = require("@google-cloud/vision");

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

/**
 * Extract text from a PDF buffer using Google Cloud Vision.
 * The Vision API limits batchAnnotateFiles to 5 pages per request,
 * so we send multiple batched requests to handle longer PDFs.
 */
async function extractTextFromPdf(fileBuffer) {
  const base64Content = fileBuffer.toString("base64");
  const allPages = [];
  const BATCH_SIZE = 5;
  let startPage = 1;

  while (true) {
    const pages = Array.from({ length: BATCH_SIZE }, (_, i) => startPage + i);

    const request = {
      requests: [
        {
          inputConfig: {
            content: base64Content,
            mimeType: "application/pdf",
          },
          features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
          pages: pages,
        },
      ],
    };

    const [result] = await client.batchAnnotateFiles(request);
    const responses = result.responses[0].responses;

    if (!responses || responses.length === 0) break;

    let batchHadText = false;
    for (let i = 0; i < responses.length; i++) {
      const text = responses[i].fullTextAnnotation?.text || "";
      if (text) {
        allPages.push(`── Page ${startPage + i} ──\n${text}`);
        batchHadText = true;
      }
    }

    if (!batchHadText || responses.length < BATCH_SIZE) break;
    startPage += BATCH_SIZE;
  }

  return allPages.join("\n\n");
}

module.exports = { extractTextFromPdf };
