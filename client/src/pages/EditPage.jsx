import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLetter, updateLetter } from "../services/api";
import ResponseEditor from "../components/ResponseEditor";
import { getDir } from "../utils/textDirection";
import { LETTER_TYPES } from "../config/letterTypes";

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [letter, setLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Editable fields
  const [addressee, setAddressee] = useState("");
  const [processedText, setProcessedText] = useState("");
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [footnote, setFootnote] = useState("");

  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', text }

  useEffect(() => {
    let cancelled = false;

    getLetter(id)
      .then((data) => {
        if (cancelled) return;
        if (data && data.letter && data.letter._id) {
          const l = data.letter;
          setLetter(l);
          setAddressee(l.addressee || "");
          setProcessedText(l.processedText || "");
          setNote(l.note || "");
          setShowNote(!!l.note);
          setFootnote(l.footnote || "");
        } else {
          setFetchError(data.error || "Record not found.");
        }
      })
      .catch(() => {
        if (!cancelled) setFetchError("Failed to load record.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [id]);

  async function handleSave() {
    if (!processedText.trim()) {
      setStatus({ type: "error", text: "Processed text cannot be empty." });
      return;
    }
    setSaving(true);
    setStatus(null);
    try {
      const result = await updateLetter(id, {
        addressee,
        processedText,
        note: showNote ? note : "",
        footnote,
      });
      if (result.success) {
        setStatus({ type: "success", text: "Changes saved successfully." });
        setTimeout(() => navigate("/archive"), 1200);
      } else {
        setStatus({ type: "error", text: result.error || "Save failed." });
        setSaving(false);
      }
    } catch {
      setStatus({ type: "error", text: "Failed to connect to server." });
      setSaving(false);
    }
  }

  function handleCancel() {
    navigate("/archive");
  }

  function handlePrint(type) {
    const printData = {
      text: processedText,
      addressee,
      footnote,
      fileName: letter.originalFileName || "",
    };
    localStorage.setItem("printData", JSON.stringify(printData));
    window.open(`/print/${type}`, "_blank");
  }

  // ── Loading state ──
  if (loading) {
    return (
      <div className="lv-page">
        <div className="lv-loading">Loading record…</div>
      </div>
    );
  }

  // ── Fetch error state ──
  if (fetchError) {
    return (
      <div className="lv-page">
        <div className="lv-header">
          <div className="lv-header-left">
            <span className="lv-breadcrumb">Archive &rsaquo; Edit Record</span>
            <h1 className="lv-title">Edit Letter</h1>
          </div>
          <div className="lv-header-right">
            <button className="lv-close-btn" onClick={handleCancel}>
              Back to Archive
            </button>
          </div>
        </div>
        <div className="lv-body">
          <div className="lv-error">{fetchError}</div>
        </div>
      </div>
    );
  }

  // ── Main form ──
  return (
    <div className="lv-page">

      {/* ── Header ── */}
      <div className="lv-header">
        <div className="lv-header-left">
          <span className="lv-breadcrumb">Archive &rsaquo; Edit Record</span>
          <h1 className="lv-title">Edit Letter</h1>
        </div>
        <div className="lv-header-right">
          <button className="lv-close-btn" onClick={handleCancel} disabled={saving}>
            Cancel
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="lv-body">

        {/* ── Read-only meta row ── */}
        <div className="lv-meta-row">
          <div className="lv-meta-card">
            <span className="lv-meta-label">Date Saved</span>
            <span className="lv-meta-value">{formatDate(letter.createdAt)}</span>
          </div>
          <div className="lv-meta-card">
            <span className="lv-meta-label">Process Tag</span>
            <span className="lv-meta-value">
              {letter.promptUsed
                ? <span className="lv-tag">{letter.promptUsed}</span>
                : <span className="lv-empty">—</span>
              }
            </span>
          </div>
          {letter.originalFileName && (
            <div className="lv-meta-card">
              <span className="lv-meta-label">Source File</span>
              <span className="lv-meta-value lv-filename">{letter.originalFileName}</span>
            </div>
          )}
        </div>

        {/* ── Addressee ── */}
        <div className="lv-section">
          <h2 className="lv-section-title">Addressee</h2>
          <div className="ep-section-body">
            <input
              className="ep-input"
              type="text"
              value={addressee}
              onChange={(e) => setAddressee(e.target.value)}
              placeholder="e.g. Mr. John Smith,"
              dir={getDir(addressee)}
            />
          </div>
        </div>

        {/* ── Note ── */}
        <div className="lv-section">
          <h2 className="lv-section-title">Note</h2>
          <div className="ep-section-body">
            <label className="note-toggle">
              <input
                type="checkbox"
                checked={showNote}
                onChange={(e) => {
                  setShowNote(e.target.checked);
                  if (!e.target.checked) setNote("");
                }}
              />
              Include Note
            </label>
            {showNote && (
              <textarea
                className="ep-textarea"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter additional note/context..."
                rows={3}
                dir={getDir(note)}
              />
            )}
          </div>
        </div>

        {/* ── Processed Text ── */}
        <div className="lv-section">
          <h2 className="lv-section-title">Processed Text</h2>
          <div className="ep-section-body ep-response-body">
            <ResponseEditor
              value={processedText}
              onChange={setProcessedText}
              isLoading={false}
            />
          </div>
        </div>

        {/* ── Footnote ── */}
        <div className="lv-section">
          <h2 className="lv-section-title">Footnote</h2>
          <div className="ep-section-body">
            <div className="format-toolbar">
              <button
                type="button"
                className="fmt-btn"
                title="Insert English footnote"
                onClick={() => setFootnote("Copy PS Office")}
              >
                EN
              </button>
              <button
                type="button"
                className="fmt-btn"
                title="Insert Urdu footnote"
                onClick={() => setFootnote("نقل دفتر پی ایس اسلام آباد (یوکے)")}
              >
                UR
              </button>
            </div>
            <textarea
              className="ep-textarea"
              value={footnote}
              onChange={(e) => setFootnote(e.target.value)}
              placeholder="Enter footnote text (optional)..."
              rows={3}
              dir={getDir(footnote)}
            />
          </div>
        </div>

        {/* ── Status message ── */}
        {status && (
          <div className={`status-message status-${status.type}`}>
            {status.text}
          </div>
        )}

        {/* ── Actions ── */}
        <div className="ep-actions">
          <button
            className="btn btn-success ep-save-btn"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
          {LETTER_TYPES.map(({ id: typeId, label }) => (
            <button
              key={typeId}
              className="btn btn-print"
              onClick={() => handlePrint(typeId)}
              disabled={!processedText || saving}
            >
              Print {label}
            </button>
          ))}
          <button
            className="btn btn-secondary ep-cancel-btn"
            onClick={handleCancel}
            disabled={saving}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
