export default function ActionButtons({ onSave, onPrint, disabled }) {
  return (
    <div className="action-buttons">
      <button className="btn btn-success" onClick={onSave} disabled={disabled}>
        Save
      </button>
      <button className="btn btn-print" onClick={() => onPrint("ps-english")} disabled={disabled}>
        Print PS English
      </button>
      <button className="btn btn-print" onClick={() => onPrint("hz-english")} disabled={disabled}>
        Print HZ English
      </button>
      <button className="btn btn-print" onClick={() => onPrint("ps-urdu")} disabled={disabled}>
        Print PS Urdu
      </button>
      <button className="btn btn-print" onClick={() => onPrint("hz-urdu")} disabled={disabled}>
        Print HZ Urdu
      </button>
    </div>
  );
}
