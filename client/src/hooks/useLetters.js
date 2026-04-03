import { useState, useEffect, useCallback } from "react";
import { getLetters, deleteLetter } from "../services/api";

const PAGE_SIZE = 20;

export function useLetters() {
  const [letters, setLetters]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [page, setPage]           = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal]         = useState(0);

  // Wrapped in useCallback so the ArchivePage can call it to force a refresh.
  const load = useCallback((pageNum) => {
    setLoading(true);
    setError(null);

    // AbortController cancels the in-flight request if the component unmounts
    // or if a new page is requested before the previous one finishes.
    const controller = new AbortController();

    getLetters(pageNum, PAGE_SIZE, controller.signal)
      .then((data) => {
        if (data.success) {
          setLetters(data.letters);
          setTotal(data.pagination.total);
          setTotalPages(data.pagination.pages);
          setPage(data.pagination.page);
        } else {
          setError(data.error || "Failed to load letters");
        }
      })
      .catch((err) => {
        // Ignore cancellation — it just means we switched pages or unmounted.
        if (err.name !== "AbortError") {
          setError("Failed to load letters");
        }
      })
      .finally(() => setLoading(false));

    // Return the controller so the caller can cancel if needed.
    return controller;
  }, []);

  useEffect(() => {
    const controller = load(page);
    // Clean up: cancel the request if the component unmounts mid-fetch.
    return () => controller.abort();
  }, [load, page]);

  async function remove(id) {
    try {
      const data = await deleteLetter(id);
      if (data.success) {
        // If we just deleted the last item on this page, go back one page.
        const newTotal = total - 1;
        const newPages = Math.max(1, Math.ceil(newTotal / PAGE_SIZE));
        const targetPage = page > newPages ? newPages : page;

        if (targetPage !== page) {
          setPage(targetPage);
        } else {
          // Stay on the same page but refresh the list.
          load(page);
        }
        setTotal(newTotal);
      }
      return data.success;
    } catch {
      return false;
    }
  }

  function goToPage(p) {
    setPage(Math.max(1, Math.min(totalPages, p)));
  }

  return { letters, loading, error, remove, page, totalPages, total, goToPage };
}
