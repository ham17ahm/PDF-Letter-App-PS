import { useState, useCallback } from "react";

/**
 * Simple hook that wraps an async API call with loading/error state.
 * Usage: const { data, isLoading, error, execute } = useApi(apiFunction);
 */
export default function useApi(apiFn) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await apiFn(...args);
        setData(result);
        return result;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [apiFn]
  );

  return { data, isLoading, error, execute };
}
