import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUploadButton from "../components/FileUploadButton";
import PdfViewer from "../components/PdfViewer";
import OcrTextPanel from "../components/OcrTextPanel";
import PromptSelector from "../components/PromptSelector";
import ResponseEditor from "../components/ResponseEditor";
import ActionButtons from "../components/ActionButtons";
import { uploadForOcr, processWithAI, saveLetter } from "../services/api";
import { getDir } from "../utils/textDirection";

export default function MainPage() {
  const navigate = useNavigate();
  const [pdfFile, setPdfFile] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [selectedPromptId, setSelectedPromptId] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [addressee, setAddressee] = useState("");
  const [footnote, setFootnote] = useState("");
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [isOcrLoading, setIsOcrLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [originalFileName, setOriginalFileName] = useState("");

  function handleFileSelected(file) {
    setPdfFile(file);
    setOriginalFileName(file.name);
    setOcrText("");
    setAiResponse("");
  }

  async function handleExtractText() {
    if (!pdfFile) {
      alert("Please upload a PDF first");
      return;
    }

    setIsOcrLoading(true);
    try {
      const result = await uploadForOcr(pdfFile);
      if (result.success) {
        setOcrText(result.text);
      } else {
        alert("OCR failed: " + result.error);
      }
    } catch {
      alert("Failed to connect to server");
    } finally {
      setIsOcrLoading(false);
    }
  }

  async function handleProcess() {
    if (!ocrText || !selectedPromptId) {
      alert("Please upload a PDF and select a prompt first");
      return;
    }

    setIsAiLoading(true);
    try {
      const result = await processWithAI(ocrText, selectedPromptId, showNote ? note : "");
      if (result.success) {
        setAiResponse(result.response);
      } else {
        alert("AI processing failed: " + result.error);
      }
    } catch {
      alert("Failed to connect to server");
    } finally {
      setIsAiLoading(false);
    }
  }

  async function handleSave() {
    try {
      const result = await saveLetter({
        originalText: ocrText,
        processedText: aiResponse,
        promptUsed: selectedPromptId,
        originalFileName,
        addressee,
        footnote,
        ...(showNote && note ? { notes: note } : {}),
      });
      if (result.success) {
        alert("Letter saved successfully!");
      } else {
        alert("Save failed: " + result.error);
      }
    } catch {
      alert("Failed to connect to server");
    }
  }

  function handlePrint(type) {
    localStorage.setItem(
      "printData",
      JSON.stringify({ text: aiResponse, addressee, footnote, fileName: originalFileName })
    );
    window.open(`/print/${type}`, "_blank");
  }

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
            isLoading={false}
          />
          <button
            className="btn btn-extract"
            onClick={handleExtractText}
            disabled={!pdfFile || isOcrLoading}
          >
            {isOcrLoading ? "Extracting..." : "Extract Text"}
          </button>
        </div>
      </header>

      <div className="workspace">
        <div className="panel panel-left">
          <PdfViewer pdfFile={pdfFile} />
        </div>

        <div className="panel panel-right">
          <OcrTextPanel text={ocrText} isLoading={isOcrLoading} />

          <PromptSelector onSelect={setSelectedPromptId} />

          <button
            className="btn btn-primary"
            onClick={handleProcess}
            disabled={!ocrText || !selectedPromptId || isAiLoading}
          >
            {isAiLoading ? "Processing..." : "Process"}
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
            isLoading={isAiLoading}
          />

          <div className="footnote-field">
            <h3>Footnote</h3>
            <textarea
              value={footnote}
              onChange={(e) => setFootnote(e.target.value)}
              placeholder="Enter footnote text (optional)..."
              rows={3}
              dir={getDir(footnote)}
            />
          </div>

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
