import { useNavigate } from "react-router-dom";
import { useLetters } from "../hooks/useLetters";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const TRUNCATE = 500;
function truncate(str) {
  if (!str) return "—";
  return str.length > TRUNCATE ? str.slice(0, TRUNCATE) + "…" : str;
}

function LetterRow({ letter, index, onDelete }) {
  const navigate = useNavigate();

  async function handleDelete() {
    if (!window.confirm("Delete this record permanently?")) return;
    const ok = await onDelete(letter._id);
    if (!ok) alert("Delete failed. Please try again.");
  }

  function handleView() {
    window.open(`/archive/${letter._id}`, "_blank");
  }

  function handleEdit() {
    navigate(`/archive/${letter._id}/edit`);
  }

  return (
    <tr>
      <td className="archive-col-num">{index + 1}</td>
      <td className="archive-col-date">{formatDate(letter.createdAt)}</td>
      <td className="archive-col-addressee">{letter.addressee || "—"}</td>
      <td className="archive-col-text">{truncate(letter.processedText)}</td>
      <td className="archive-col-note">{truncate(letter.note)}</td>
      <td className="archive-col-footnote">{truncate(letter.footnote)}</td>
      <td className="archive-col-action">
        <button className="btn-view" onClick={handleView}>
          View
        </button>
        <button className="btn-edit" onClick={handleEdit}>
          Edit
        </button>
        <button className="btn-delete" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default function ArchivePage() {
  const navigate = useNavigate();
  const { letters, loading, error, remove, page, totalPages, total, goToPage } = useLetters();

  return (
    <div className="archive-page">
      <div className="app-header">
        <h1>Archive</h1>
        <div className="header-actions">
          <button className="btn-back" onClick={() => navigate("/")}>
            Back
          </button>
          <button className="btn-back btn-back--teal" onClick={() => navigate("/main")}>
            Letter Generator
          </button>
        </div>
      </div>

      <div className="archive-body">
        {loading && <p className="archive-status">Loading…</p>}
        {error && (
          <p className="archive-status archive-status--error">{error}</p>
        )}

        {!loading && !error && letters.length === 0 && (
          <p className="archive-status">No records saved yet.</p>
        )}

        {!loading && !error && letters.length > 0 && (
          <>
            <table className="archive-table">
              <thead>
                <tr>
                  <th className="archive-col-num">#</th>
                  <th className="archive-col-date">Date</th>
                  <th className="archive-col-addressee">Addressee</th>
                  <th className="archive-col-text">Processed Text</th>
                  <th className="archive-col-note">Note</th>
                  <th className="archive-col-footnote">Footnote</th>
                  <th className="archive-col-action"></th>
                </tr>
              </thead>
              <tbody>
                {letters.map((letter, i) => (
                  <LetterRow
                    key={letter._id}
                    letter={letter}
                    index={(page - 1) * 20 + i}
                    onDelete={remove}
                  />
                ))}
              </tbody>
            </table>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="archive-pagination">
                <button
                  className="archive-page-btn"
                  onClick={() => goToPage(page - 1)}
                  disabled={page <= 1}
                >
                  ← Prev
                </button>
                <span className="archive-page-info">
                  Page {page} of {totalPages}
                  <span className="archive-page-total"> ({total} records)</span>
                </span>
                <button
                  className="archive-page-btn"
                  onClick={() => goToPage(page + 1)}
                  disabled={page >= totalPages}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
