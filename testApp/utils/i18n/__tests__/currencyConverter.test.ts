import { CurrencyConverter } from "../currencyConverter";

describe("CurrencyConverter", () => {
  it("should convert USD to INR correctly", () => {
    expect(CurrencyConverter.convert(10, "USD", "INR")).toBe(835);
  });

  it("should convert INR to USD correctly", () => {
    expect(CurrencyConverter.convert(835, "INR", "USD")).toBe(10);
  });

  it("should handle unknown currencies safely", () => {
    expect(CurrencyConverter.convert(100, "XYZ", "USD")).toBe(100);
  });
});
