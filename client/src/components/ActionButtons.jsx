import { LETTER_TYPES } from '../config/letterTypes';

export default function ActionButtons({ onSave, onPrint, disabled }) {
  return (
    <div className="action-buttons">
      <button className="btn btn-success" onClick={onSave} disabled={disabled}>
        Save
      </button>
      {LETTER_TYPES.map(({ id, label }) => (
        <button
          key={id}
          className="btn btn-print"
          onClick={() => onPrint(id)}
          disabled={disabled}
        >
          Print {label}
        </button>
      ))}
    </div>
  );
}
