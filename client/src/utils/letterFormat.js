/**
 * Convert markdown-like syntax and newlines to HTML for letter rendering.
 * Supports: **bold**, _italic_, paragraph breaks (\n\n), line breaks (\n).
 */
export function formatText(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*([\s\S]*?)\*\*/g, '<b>$1</b>')
    .replace(/_([\s\S]*?)_/g, '<i>$1</i>')
    .replace(/\n\n+/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
}

/**
 * Return today's date formatted as DD-MM-YYYY.
 */
export function formatDate() {
  const today = new Date();
  const dd   = String(today.getDate()).padStart(2, '0');
  const mm   = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}
