import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generatePdf } from "../services/api";
import { formatDate } from "../utils/letterFormat";

import printPSCss    from "../css/printPS.css?raw";
import printHZCss    from "../css/printHZ.css?raw";
import printPSUrduCss from "../css/printPSUrdu.css?raw";
import printHZUrduCss from "../css/printHZUrdu.css?raw";

import PSEnglishTemplate from "../templates/PSEnglishTemplate";
import HZEnglishTemplate from "../templates/HZEnglishTemplate";
import PSUrduTemplate    from "../templates/PSUrduTemplate";
import HZUrduTemplate    from "../templates/HZUrduTemplate";

// ── Maps keyed by letter type id ──────────────────────────────────────────────
// When adding a new type, add one entry here and one in server/config/pdf.js.
// ──────────────────────────────────────────────────────────────────────────────

const cssMap = {
  "ps-english": printPSCss,
  "hz-english": printHZCss,
  "ps-urdu":    printPSUrduCss,
  "hz-urdu":    printHZUrduCss,
};

const templateMap = {
  "ps-english": PSEnglishTemplate,
  "hz-english": HZEnglishTemplate,
  "ps-urdu":    PSUrduTemplate,
  "hz-urdu":    HZUrduTemplate,
};

// ── Floating control buttons (no-print) ───────────────────────────────────────

const btnBase = {
  padding: "8px 20px",
  fontSize: "14px",
  cursor: "pointer",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
};

// ── Main component ─────────────────────────────────────────────────────────────

export default function PrintPage() {
  const { type } = useParams();
  const [data, setData]     = useState({ text: "", addressee: "", footnote: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("printData");
    if (stored) setData(JSON.parse(stored));
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      const result = await generatePdf(type, data);
      if (result.success) alert(`Saved: ${result.fileName}`);
      else alert("Save failed: " + result.error);
    } catch {
      alert("Failed to connect to server");
    } finally {
      setSaving(false);
    }
  }

  const css      = cssMap[type] || "";
  const Template = templateMap[type];
  const props    = {
    text:      data.text,
    addressee: data.addressee,
    footnote:  data.footnote,
    date:      formatDate(),
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div
        className="no-print"
        style={{ position: "fixed", top: 10, right: 10, zIndex: 999, display: "flex", flexDirection: "column", gap: "6px" }}
      >
        <button onClick={() => window.print()} style={{ ...btnBase, background: "#4361ee" }}>
          Print
        </button>
        <button onClick={() => window.close()} style={{ ...btnBase, background: "#e63946" }}>
          Close
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{ ...btnBase, background: "#2a9d8f", opacity: saving ? 0.7 : 1, cursor: saving ? "default" : "pointer" }}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      {Template && <Template {...props} />}
    </>
  );
}
