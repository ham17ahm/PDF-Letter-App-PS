import { useState, useEffect } from "react";
import { getLetters, deleteLetter } from "../services/api";

export function useLetters() {
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLetters()
      .then((data) => {
        if (data.success) setLetters(data.letters);
        else setError(data.error || "Failed to load letters");
      })
      .catch(() => setError("Failed to load letters"))
      .finally(() => setLoading(false));
  }, []);

  async function remove(id) {
    try {
      const data = await deleteLetter(id);
      if (data.success) setLetters((prev) => prev.filter((l) => l._id !== id));
      return data.success;
    } catch {
      return false;
    }
  }

  return { letters, loading, error, remove };
}
