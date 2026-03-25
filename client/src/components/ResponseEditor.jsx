import { useRef } from 'react';
import { getDir } from '../utils/textDirection';

const WORD_LIMIT = 190;

function countWords(text) {
  const plain = text.replace(/\*\*/g, '').replace(/_/g, '');
  return plain.trim() === '' ? 0 : plain.trim().split(/\s+/).length;
}

function applyFormat(textareaEl, value, onChange, before, after) {
  const start = textareaEl.selectionStart;
  const end = textareaEl.selectionEnd;
  const selected = value.slice(start, end);
  const newValue = value.slice(0, start) + before + selected + after + value.slice(end);
  onChange(newValue);
  requestAnimationFrame(() => {
    textareaEl.focus();
    textareaEl.setSelectionRange(start + before.length, end + before.length);
  });
}

export default function ResponseEditor({ value, onChange, isLoading }) {
  const textareaRef = useRef(null);
  const wordCount = countWords(value);
  const overLimit = wordCount > WORD_LIMIT;

  return (
    <div className="response-editor">
      <h3>AI Response</h3>
      {isLoading ? (
        <div className="loading">Processing with AI...</div>
      ) : (
        <>
          <div className="format-toolbar">
            <button
              type="button"
              className="fmt-btn fmt-bold"
              title="Bold — wraps selection with **"
              onMouseDown={(e) => {
                e.preventDefault();
                applyFormat(textareaRef.current, value, onChange, '**', '**');
              }}
            >B</button>
            <button
              type="button"
              className="fmt-btn fmt-italic"
              title="Italic — wraps selection with _"
              onMouseDown={(e) => {
                e.preventDefault();
                applyFormat(textareaRef.current, value, onChange, '_', '_');
              }}
            >I</button>
          </div>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="AI response will appear here..."
            rows={12}
            dir={getDir(value)}
          />
          <div className={overLimit ? "word-limit-warning" : "word-count"}>
            {wordCount} / {WORD_LIMIT} words{overLimit ? " — limit exceeded" : ""}
          </div>
        </>
      )}
    </div>
  );
}
