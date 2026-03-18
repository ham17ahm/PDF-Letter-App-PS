import { getDir } from '../utils/textDirection';

const WORD_LIMIT = 190;

function countWords(text) {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

export default function ResponseEditor({ value, onChange, isLoading }) {
  const wordCount = countWords(value);
  const overLimit = wordCount > WORD_LIMIT;

  return (
    <div className="response-editor">
      <h3>AI Response</h3>
      {isLoading ? (
        <div className="loading">Processing with AI...</div>
      ) : (
        <>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="AI response will appear here..."
            rows={12}
            dir={getDir(value)}
          />
          {overLimit && (
            <div className="word-limit-warning">
              Word limit exceeded — {wordCount} / {WORD_LIMIT} words
            </div>
          )}
        </>
      )}
    </div>
  );
}
