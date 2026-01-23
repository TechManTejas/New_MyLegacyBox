import { calculateCompoundInterest } from "../compoundInterest";

describe("calculateCompoundInterest", () => {
  it("should calculate simple compounding correctly", () => {
    // 1000 at 5% for 2 years compounded annually
    expect(calculateCompoundInterest(1000, 0.05, 2, 1)).toBe(1102.5);
  });

  it("should handle different frequencies", () => {
    // Compounded quarterly
    expect(calculateCompoundInterest(1000, 0.05, 2, 4)).toBe(1104.49);
  });
});
