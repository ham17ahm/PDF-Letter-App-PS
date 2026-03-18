export default function ResponseEditor({ value, onChange, isLoading }) {
  return (
    <div className="response-editor">
      <h3>AI Response</h3>
      {isLoading ? (
        <div className="loading">Processing with AI...</div>
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="AI response will appear here..."
          rows={12}
        />
      )}
    </div>
  );
}
