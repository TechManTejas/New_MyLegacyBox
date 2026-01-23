import { numberToInr } from "../numberToInr";

describe("numberToInr", () => {
  it("formats regular numbers correctly", () => {
    expect(numberToInr(100)).toBe("100");
    expect(numberToInr(1000)).toBe("1,000");
    expect(numberToInr(10000)).toBe("10,000");
    expect(numberToInr(100000)).toBe("1,00,000"); // Indian system check
  });

  it("formats decimal numbers correctly", () => {
    expect(numberToInr(100.5)).toBe("100.5");
    expect(numberToInr(1234.56)).toBe("1,234.56");
  });

  it("handles negative numbers", () => {
    expect(numberToInr(-5000)).toBe("-5,000");
  });

  it("handles zero", () => {
    expect(numberToInr(0)).toBe("0");
  });
});
