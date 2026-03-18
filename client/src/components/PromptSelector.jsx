import { useState, useEffect } from "react";
import Select from "react-select";
import { getPrompts } from "../services/api";

export default function PromptSelector({ onSelect }) {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPrompts()
      .then((prompts) => {
        setOptions(
          prompts.map((p) => ({ value: p.id, label: p.label }))
        );
      })
      .catch((err) => {
        console.error("Failed to load prompts:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleChange(selected) {
    onSelect(selected ? selected.value : null);
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
