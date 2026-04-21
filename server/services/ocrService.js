const vision = require("@google-cloud/vision");
const { PDFDocument } = require("pdf-lib");

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

/**
 * Extract a single page from a PDF document and return it as a new PDF buffer.
 */
async function extractSinglePageBuffer(pdfDoc, pageIndex) {
  const newDoc = await PDFDocument.create();
  const [copiedPage] = await newDoc.copyPages(pdfDoc, [pageIndex]);
  newDoc.addPage(copiedPage);
  return Buffer.from(await newDoc.save());
}

/**
 * Send one single-page PDF buffer to Vision API and return the extracted text.
 */
async function ocrPage(pageBuffer, pageNumber) {
  const base64Content = pageBuffer.toString("base64");

  const request = {
    requests: [
      {
        inputConfig: {
          content: base64Content,
          mimeType: "application/pdf",
        },
        features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
        pages: [1],
      },
    ],
  };

  const [result] = await client.batchAnnotateFiles(request);

  if (!result?.responses?.[0]) return null;
  if (result.responses[0].error) {
    throw new Error(`Vision API error: ${result.responses[0].error.message}`);
  }

  const responses = result.responses[0].responses;
  if (!responses || responses.length === 0) return null;

  const text = responses[0].fullTextAnnotation?.text || "";
  return text ? `── Page ${pageNumber} ──\n${text}` : null;
}

/**
 * Extract text from a PDF buffer using Google Cloud Vision.
 * Splits the PDF into individual single-page buffers and processes all pages
 * in parallel. Results are assembled in original page order.
 */
async function extractTextFromPdf(fileBuffer) {
  const pdfDoc = await PDFDocument.load(fileBuffer);
  const pageCount = pdfDoc.getPageCount();

  const pageBuffers = await Promise.all(
    Array.from({ length: pageCount }, (_, i) => extractSinglePageBuffer(pdfDoc, i))
  );

  const pageTexts = await Promise.all(
    pageBuffers.map((buf, i) => ocrPage(buf, i + 1))
  );

  return pageTexts.filter(Boolean).join("\n\n");
}

module.exports = { extractTextFromPdf };
