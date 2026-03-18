import { useRef } from "react";

export default function FileUploadButton({ onFileSelected, isLoading }) {
  const inputRef = useRef(null);

  function handleChange(e) {
    const file = e.target.files[0];
    if (file) {
      onFileSelected(file);
    }
  }

  return (
    <div className="file-upload">
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <button
        className="btn btn-primary"
        onClick={() => inputRef.current.click()}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Upload PDF"}
      </button>
    </div>
  );
}
