import { formatToINR, calculatePercentage } from "../mathUtils";

describe("mathUtils", () => {
  describe("formatToINR", () => {
    it("should format numbers to INR correctly", () => {
      // Different Intl implementations might have subtle differences in spacing/symbols,
      // but the numeric parts should be consistent.
      expect(formatToINR(1000)).toMatch(/₹?\s?1,000/);
      expect(formatToINR(100000)).toMatch(/₹?\s?1,00,000/);
    });
  });

  describe("calculatePercentage", () => {
    it("should calculate percentage correctly", () => {
      expect(calculatePercentage(50, 200)).toBe(25);
      expect(calculatePercentage(1, 3)).toBe(33.33);
    });

    it("should return 0 if total is 0", () => {
      expect(calculatePercentage(10, 0)).toBe(0);
    });
  });
});
