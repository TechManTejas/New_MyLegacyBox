import { useState, useCallback } from "react";

/**
 * Custom hook for boolean state management.
 * @param initialValue Initial boolean value.
 * @returns An object with the state and utility functions (setTrue, setFalse, toggle).
 */
export const useBoolean = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((v) => !v), []);

  return { value, setTrue, setFalse, toggle, setValue };
};
