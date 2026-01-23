import { calculateEMI } from "../loanEmi";

describe("calculateEMI", () => {
  it("should calculate EMI correctly", () => {
    // 1L loan, 12% annual rate, 1 year
    // monthly rate = 1%
    // 100000 * 0.01 * (1.1268) / (0.1268) ~= 8885
    expect(calculateEMI(100000, 12, 1)).toBe(8885);
  });

  it("should handle different principal amounts", () => {
    expect(calculateEMI(500000, 10, 5)).toBe(10624);
  });
});
