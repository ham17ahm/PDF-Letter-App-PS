import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1>Letter Processor</h1>
      <p>Upload, process, and print PDF letters with AI</p>
      <button className="btn btn-primary btn-large" onClick={() => navigate("/main")}>
        Letter Generator
      </button>
    </div>
  );
}
