import { useState, useEffect } from "react";
import Select from "react-select";
import { getPrompts } from "../services/api";

export default function PromptSelector({ onSelect }) {
  const [options, setOptions]   = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    getPrompts()
      .then((prompts) => {
        setOptions(prompts.map((p) => ({ value: p.id, label: p.label })));
      })
      .catch(() => {
        setLoadError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleChange(selected) {
    onSelect(selected ? selected.value : null);
  }

  if (loadError) {
    return (
      <div className="prompt-selector">
        <h3>Select Prompt</h3>
        <p style={{ color: "#c0392b", fontSize: "0.9rem", margin: "6px 0" }}>
          Could not load prompts. Please refresh the page or restart the server.
        </p>
      </div>
    );
  }

  return (
    <div className="prompt-selector">
      <h3>Select Prompt</h3>
      <Select
        options={options}
        onChange={handleChange}
        placeholder="Search prompts..."
        isClearable
        isLoading={isLoading}
      />
    </div>
  );
}
