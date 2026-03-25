import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUploadButton from "../components/FileUploadButton";
import PdfViewer from "../components/PdfViewer";
import OcrTextPanel from "../components/OcrTextPanel";
import PromptSelector from "../components/PromptSelector";
import ResponseEditor from "../components/ResponseEditor";
import ActionButtons from "../components/ActionButtons";
import useApi from "../hooks/useApi";
import { uploadForOcr, processWithAI, saveLetter } from "../services/api";
import { getDir } from "../utils/textDirection";

export default function MainPage() {
  const navigate = useNavigate();

  // ── Content state ──────────────────────────────────────────────────────────
  const [pdfFile, setPdfFile]               = useState(null);
  const [ocrText, setOcrText]               = useState("");
  const [selectedPromptId, setSelectedPromptId] = useState(null);
  const [aiResponse, setAiResponse]         = useState("");

  // ── Letter fields ──────────────────────────────────────────────────────────
  const [addressee, setAddressee]   = useState("");
  const [footnote, setFootnote]     = useState("");
  const [note, setNote]             = useState("");
  const [showNote, setShowNote]     = useState(false);

  // ── Metadata ───────────────────────────────────────────────────────────────
  const [originalFileName, setOriginalFileName] = useState("");

  // ── Inline status message ──────────────────────────────────────────────────
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text: '' }

  // ── API hooks (manage loading state automatically) ─────────────────────────
  const ocr  = useApi(uploadForOcr);
  const ai   = useApi(processWithAI);
  const save = useApi(saveLetter);

  // ── Handlers ───────────────────────────────────────────────────────────────

  function handleFileSelected(file) {
    setPdfFile(file);
    setOriginalFileName(file.name);
    setOcrText("");
    setAiResponse("");
    setStatus(null);
  }

  async function handleExtractText() {
    if (!pdfFile) {
      setStatus({ type: "error", text: "Please upload a PDF first." });
      return;
    }
    setStatus(null);
    try {
      const result = await ocr.execute(pdfFile);
      if (result.success) {
        setOcrText(result.text);
        setStatus({ type: "success", text: "Text extracted successfully. You can edit it before processing." });
      } else {
        setStatus({ type: "error", text: "OCR failed: " + result.error });
      }
    } catch {
      setStatus({ type: "error", text: "Failed to connect to server." });
    }
  }

  async function handleProcess() {
    if (!ocrText || !selectedPromptId) {
      setStatus({ type: "error", text: "Please extract text and select a prompt first." });
      return;
    }
    setStatus(null);
    try {
      const result = await ai.execute(ocrText, selectedPromptId, showNote ? note : "");
      if (result.success) {
        setAiResponse(result.response);
        setStatus({ type: "success", text: "Processing complete." });
      } else {
        setStatus({ type: "error", text: "AI processing failed: " + result.error });
      }
    } catch {
      setStatus({ type: "error", text: "Failed to connect to server." });
    }
  }

  async function handleSave() {
    setStatus(null);
    try {
      const result = await save.execute({
        originalText:    ocrText,
        processedText:   aiResponse,
        promptUsed:      selectedPromptId,
        originalFileName,
        addressee,
        footnote,
...(showNote && note ? { note } : {}),
      });
      if (result.success) {
        setStatus({ type: "success", text: "Letter saved successfully." });
      } else {
        setStatus({ type: "error", text: "Save failed: " + result.error });
      }
    } catch {
      setStatus({ type: "error", text: "Failed to connect to server." });
    }
  }

  function handlePrint(type) {
    const printData = { text: aiResponse, addressee, footnote, fileName: originalFileName };
    localStorage.setItem("printData", JSON.stringify(printData));
    window.open(`/print/${type}`, "_blank");
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="main-page">
      <header className="app-header">
        <button className="btn btn-back" onClick={() => navigate("/")}>
          Back
        </button>
        <h1>Letter Processor</h1>
        <div className="header-actions">
          <FileUploadButton
            onFileSelected={handleFileSelected}
            isLoading={ocr.isLoading}
          />
          <button
            className="btn btn-extract"
            onClick={handleExtractText}
            disabled={!pdfFile || ocr.isLoading}
          >
            {ocr.isLoading ? "Extracting..." : "Extract Text"}
          </button>
        </div>
      </header>

      <div className="workspace">
        <div className="panel panel-left">
          <PdfViewer pdfFile={pdfFile} />
        </div>

        <div className="panel panel-right">
          <OcrTextPanel
            text={ocrText}
            onChange={setOcrText}
            isLoading={ocr.isLoading}
          />

          <PromptSelector onSelect={setSelectedPromptId} />

          <button
            className="btn btn-primary"
            onClick={handleProcess}
            disabled={!ocrText || !selectedPromptId || ai.isLoading}
          >
            {ai.isLoading ? "Processing..." : "Process"}
          </button>

          <div className="addressee-field">
            <h3>Addressee</h3>
            <input
              type="text"
              value={addressee}
              onChange={(e) => setAddressee(e.target.value)}
              placeholder="e.g. Mr. John Smith,"
              dir={getDir(addressee)}
            />
          </div>

          <div className="note-field">
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
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter additional note/context for AI processing..."
                rows={3}
                dir={getDir(note)}
              />
            )}
          </div>

          <ResponseEditor
            value={aiResponse}
            onChange={setAiResponse}
            isLoading={ai.isLoading}
          />

          <div className="footnote-field">
            <h3>Footnote</h3>
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
              value={footnote}
              onChange={(e) => setFootnote(e.target.value)}
              placeholder="Enter footnote text (optional)..."
              rows={3}
              dir={getDir(footnote)}
            />
          </div>

{status && (
            <div className={`status-message status-${status.type}`}>
              {status.text}
            </div>
          )}

          <ActionButtons
            onSave={handleSave}
            onPrint={handlePrint}
            disabled={!aiResponse}
          />
        </div>
      </div>
    </div>
  );
}
