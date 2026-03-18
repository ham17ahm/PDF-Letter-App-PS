import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

const SCALE = 2;

function PdfPage({ page }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const viewport = page.getViewport({ scale: SCALE });
    const canvas = canvasRef.current;
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    page.render({
      canvasContext: canvas.getContext("2d"),
      viewport,
    });
  }, [page]);

  return <canvas ref={canvasRef} className="pdf-page-canvas" />;
}

export default function PdfViewer({ pdfFile }) {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pdfFile) {
      setPages([]);
      return;
    }

    setLoading(true);
    const fileUrl = URL.createObjectURL(pdfFile);

    pdfjsLib.getDocument(fileUrl).promise.then(async (pdf) => {
      const loadedPages = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        loadedPages.push(page);
      }
      setPages(loadedPages);
      setLoading(false);
    });

    return () => URL.revokeObjectURL(fileUrl);
  }, [pdfFile]);

  if (!pdfFile) {
    return (
      <div className="pdf-viewer pdf-viewer--empty">
        <p>Upload a PDF to preview it here</p>
      </div>
    );
  }

  return (
    <div className="pdf-viewer">
      {loading && <p className="loading">Loading PDF...</p>}
      {pages.map((page, i) => (
        <PdfPage key={i} page={page} />
      ))}
    </div>
  );
}
