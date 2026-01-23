import { Logger, LogLevel } from "../loggerUtils";

describe("Logger", () => {
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  beforeAll(() => {
    console.log = jest.fn();
    console.error = jest.fn();
    console.warn = jest.fn();
  });

  afterAll(() => {
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
  });

  it("should log info messages", () => {
    Logger.info("test info");
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("[INFO] test info"),
    );
  });

  it("should log error messages", () => {
    Logger.error("test error");
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("[ERROR] test error"),
    );
  });
});
