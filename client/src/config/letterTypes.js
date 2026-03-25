// ──────────────────────────────────────────────
// LETTER TYPES — add or remove letter formats here.
//
// Adding a new type requires changes in 5 places:
//   1. Add an entry to LETTER_TYPES below (id + label)
//   2. Add its CSS file in client/src/css/
//   3. Add its template component in client/src/templates/
//   4. Add it to cssMap and templateMap in PrintPage.jsx
//   5. Add its filename prefix in server/config/pdf.js
// ──────────────────────────────────────────────

export const LETTER_TYPES = [
  { id: "ps-english", label: "PS English" },
  { id: "hz-english", label: "HZ English" },
  { id: "ps-urdu",    label: "PS Urdu"    },
  { id: "hz-urdu",    label: "HZ Urdu"    },
];
