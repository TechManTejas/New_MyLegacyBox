import { formatDate, daysBetween } from "../dateUtils";

describe("dateUtils", () => {
  describe("formatDate", () => {
    it("should format date correctly", () => {
      const date = new Date("2023-10-25");
      expect(formatDate(date)).toBe("2023-10-25");
    });
  });

  describe("daysBetween", () => {
    it("should calculate days difference", () => {
      const d1 = new Date("2023-10-01");
      const d2 = new Date("2023-10-10");
      expect(daysBetween(d1, d2)).toBe(9);
    });
  });
});
