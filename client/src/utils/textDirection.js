const RTL_REGEX = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;

export function getDir(text) {
  if (!text) return 'ltr';
  // Find the first letter character and check if it's RTL
  for (const char of text) {
    if (RTL_REGEX.test(char)) return 'rtl';
    if (/\p{L}/u.test(char)) return 'ltr';
  }
  return 'ltr';
}
