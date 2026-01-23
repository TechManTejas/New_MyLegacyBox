import { calculateIndianTax } from "../taxCalc";

describe("calculateIndianTax", () => {
  it("should return 0 for income below rebate limit", () => {
    expect(calculateIndianTax(600000)).toBe(0);
    expect(calculateIndianTax(775000)).toBe(0); // 7.75L - 75k = 7L (Limit)
  });

  it("should calculate tax correctly for higher slabs", () => {
    // 10.75L - 75K = 10L
    // 0-3L: 0
    // 3-7L: 4L * 5% = 20000
    // 7-10L: 3L * 10% = 30000
    // Total: 50000
    expect(calculateIndianTax(1075000)).toBe(50000);
  });
});
