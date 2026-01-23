/**
 * Standardized logging levels.
 */
export enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  DEBUG = "DEBUG",
}

/**
 * Professional logging utility.
 */
export const Logger = {
  /**
   * Logs a message with a specific level.
   */
  log: (level: LogLevel, message: string, ...args: any[]) => {
    // In production, you might send this to a service like Sentry or LogRocket.
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level}] ${message}`;

    switch (level) {
      case LogLevel.ERROR:
        console.error(formattedMessage, ...args);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage, ...args);
        break;
      default:
        console.log(formattedMessage, ...args);
    }
  },

  info: (message: string, ...args: any[]) =>
    Logger.log(LogLevel.INFO, message, ...args),
  warn: (message: string, ...args: any[]) =>
    Logger.log(LogLevel.WARN, message, ...args),
  error: (message: string, ...args: any[]) =>
    Logger.log(LogLevel.ERROR, message, ...args),
  debug: (message: string, ...args: any[]) =>
    Logger.log(LogLevel.DEBUG, message, ...args),
};
