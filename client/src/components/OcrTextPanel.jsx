export default function OcrTextPanel({ text, isLoading }) {
  return (
    <div className="ocr-text-panel">
      <h3>Extracted Text</h3>
      {isLoading ? (
        <div className="loading">Extracting text from PDF...</div>
      ) : (
        <div className="ocr-text-content">
          {text || "OCR text will appear here after upload."}
        </div>
      )}
    </div>
  );
}
