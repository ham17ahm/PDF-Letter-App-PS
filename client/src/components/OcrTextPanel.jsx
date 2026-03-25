import { getDir } from '../utils/textDirection';

export default function OcrTextPanel({ text, onChange, isLoading }) {
  return (
    <div className="ocr-text-panel">
      <h3>Extracted Text</h3>
      {isLoading ? (
        <div className="loading">Extracting text from PDF...</div>
      ) : (
        <textarea
          className="ocr-text-content"
          value={text}
          onChange={(e) => onChange(e.target.value)}
          placeholder="OCR text will appear here after upload. You can edit it before processing."
          rows={8}
          dir={getDir(text)}
        />
      )}
    </div>
  );
}
