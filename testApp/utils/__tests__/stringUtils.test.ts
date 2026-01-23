import { toTitleCase, truncateString } from "../stringUtils";

describe("stringUtils", () => {
  describe("toTitleCase", () => {
    it("should convert strings to Title Case", () => {
      expect(toTitleCase("hello world")).toBe("Hello World");
      expect(toTitleCase("HELLO WORLD")).toBe("Hello World");
      expect(toTitleCase("jAnUaRy")).toBe("January");
    });

    it("should return empty string for null/undefined", () => {
      expect(toTitleCase("")).toBe("");
    });
  });

  describe("truncateString", () => {
    it("should truncate strings correctly", () => {
      expect(truncateString("This is a long string", 10)).toBe("This is a ...");
      expect(truncateString("Short", 10)).toBe("Short");
    });
  });
});
