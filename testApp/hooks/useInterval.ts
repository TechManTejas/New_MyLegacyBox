import { useEffect, useRef } from "react";

/**
 * Custom hook for declarative setInterval.
 * @param callback The function to call.
 * @param delay The delay in milliseconds. Pass null to stop.
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current!(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
