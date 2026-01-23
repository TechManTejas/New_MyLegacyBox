import { useState, useCallback } from "react";

/**
 * A custom hook to handle asynchronous operations.
 * Provides status tracking (idle, pending, success, error).
 */
export function useAsync<T, E = string>(asyncFunction: () => Promise<T>) {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(async () => {
    setStatus("pending");
    setValue(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setValue(response);
      setStatus("success");
    } catch (e: any) {
      setError(e);
      setStatus("error");
    }
  }, [asyncFunction]);

  return { execute, status, value, error };
}
