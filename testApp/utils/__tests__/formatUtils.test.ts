import { formatBytes, maskPhone } from "../formatUtils";

describe("formatUtils", () => {
  describe("formatBytes", () => {
    it("should format bytes to KB/MB correctly", () => {
      expect(formatBytes(1024)).toBe("1 KB");
      expect(formatBytes(1048576)).toBe("1 MB");
    });
  });

  describe("maskPhone", () => {
    it("should mask phone numbers correctly", () => {
      expect(maskPhone("1234567890")).toBe("12******90");
    });
  });
});
