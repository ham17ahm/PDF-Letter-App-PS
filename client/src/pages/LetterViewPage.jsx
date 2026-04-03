import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLetter } from "../services/api";

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

function PromptTag({ value }) {
  if (!value) return <span className="lv-empty">—</span>;
  return <span className="lv-tag">{value}</span>;
}

export default function LetterViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [letter, setLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // "cancelled" flag stops state updates if the component unmounts before
    // the fetch finishes (e.g. navigating away, or React Strict Mode cleanup).
    let cancelled = false;

    getLetter(id)
      .then((data) => {
        if (cancelled) return;
        if (data && data.letter && data.letter._id) {
          setLetter(data.letter);
        } else {
          setError(data.error || "Record not found.");
        }
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load record.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <div className="lv-page">
        <div className="lv-loading">Loading record…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lv-page">
        <div className="lv-header">
          <div className="lv-header-left">
            <span className="lv-breadcrumb">Archive &rsaquo; Record</span>
            <h1 className="lv-title">Letter Details</h1>
          </div>
          <div className="lv-header-right">
            <button className="lv-close-btn" onClick={() => { window.close(); setTimeout(() => navigate("/archive"), 300); }}>
              Close Tab
            </button>
          </div>
        </div>
        <div className="lv-body">
          <div className="lv-error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="lv-page">
      {/* ── Header ── */}
      <div className="lv-header">
        <div className="lv-header-left">
          <span className="lv-breadcrumb">Archive &rsaquo; Record</span>
          <h1 className="lv-title">Letter Details</h1>
        </div>
        <div className="lv-header-right">
          <button
            className="lv-close-btn"
            onClick={() => {
              // Try to close the tab (works when opened via window.open).
              // If the browser blocks it (e.g. direct navigation), fall back
              // to the archive page after a short delay.
              window.close();
              setTimeout(() => navigate("/archive"), 300);
            }}
          >
            Close Tab
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="lv-body">

        {/* ── Meta row ── */}
        <div className="lv-meta-row">
          <div className="lv-meta-card">
            <span className="lv-meta-label">Date Saved</span>
            <span className="lv-meta-value">{formatDate(letter.createdAt)}</span>
          </div>
          <div className="lv-meta-card">
            <span className="lv-meta-label">Addressee</span>
            <span className="lv-meta-value">{letter.addressee || "—"}</span>
          </div>
          <div className="lv-meta-card">
            <span className="lv-meta-label">Process Tag</span>
            <span className="lv-meta-value">
              <PromptTag value={letter.promptUsed} />
            </span>
          </div>
          {letter.originalFileName && (
            <div className="lv-meta-card">
              <span className="lv-meta-label">Source File</span>
              <span className="lv-meta-value lv-filename">{letter.originalFileName}</span>
            </div>
          )}
        </div>

        {/* ── Note ── */}
        {letter.note && (
          <div className="lv-section">
            <h2 className="lv-section-title">Note</h2>
            <div className="lv-section-body lv-note-body">{letter.note}</div>
          </div>
        )}

        {/* ── Processed Text ── */}
        <div className="lv-section">
          <h2 className="lv-section-title">Processed Text</h2>
          <div className="lv-section-body lv-processed-body">
            {letter.processedText || <span className="lv-empty">No processed text.</span>}
          </div>
        </div>

        {/* ── Footnote ── */}
        {letter.footnote && (
          <div className="lv-section">
            <h2 className="lv-section-title">Footnote</h2>
            <div className="lv-section-body lv-footnote-body">{letter.footnote}</div>
          </div>
        )}

      </div>
    </div>
  );
}
