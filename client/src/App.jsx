import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";
import PrintPage from "./pages/PrintPage";
import ArchivePage from "./pages/ArchivePage";
import LetterViewPage from "./pages/LetterViewPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/archive/:id" element={<LetterViewPage />} />
        <Route path="/print/:type" element={<PrintPage />} />
      </Routes>
    </BrowserRouter>
  );
}
