import { useCallback, useRef } from "react";

/**
 * Custom hook for debouncing a callback function.
 *
 * @param callback - The function to debounce.
 * @param delay - The delay time in milliseconds.
 * @returns A debounced version of the callback.
 */
export default function useDebouncedCallback(callback: (...args: any[]) => void, delay: number) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: any[]) => {
      // Clear the previous timer
      if (timer.current) {
        clearTimeout(timer.current);
      }

      // Set a new timer
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
}
