/**
 * Utilities for network and connectivity awareness.
 */
export const ConnectionUtils = {
  /**
   * Checks if the device has an active internet connection (Mock).
   */
  isOnline: async (): Promise<boolean> => {
    return true; // Simple mock for demonstration
  },

  /**
   * Simulates network latency.
   * @param ms Milliseconds to delay.
   */
  simulateLatency: (ms: number = 1000): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  /**
   * Formats a network error message based on error code.
   */
  getErrorMessage: (code: number): string => {
    switch (code) {
      case 404:
        return "Resource not found.";
      case 500:
        return "Internal server error.";
      case 401:
        return "Authentication required.";
      default:
        return "A connectivity issue occurred.";
    }
  },
};
