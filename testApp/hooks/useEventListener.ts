import { useEffect, useRef } from "react";

/**
 * A hook to safely manage event listeners (window or custom emitters).
 */
export function useEventListener(
  eventName: string,
  handler: (...args: any[]) => void,
  element: any = typeof window !== "undefined" ? window : null,
) {
  const savedHandler = useRef<(...args: any[]) => void>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!element || !element.addEventListener) return;

    const eventListener = (event: any) => savedHandler.current!(event);
    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
