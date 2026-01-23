import { NumericAbbrev } from "../numericAbbrev";

describe("NumericAbbrev", () => {
  it("should format numbers correctly", () => {
    expect(NumericAbbrev.format(500)).toBe("500");
    expect(NumericAbbrev.format(1500)).toBe("1.5K");
    expect(NumericAbbrev.format(2000000)).toBe("2.0M");
  });

  it("should handle zero gracefully", () => {
    expect(NumericAbbrev.format(0)).toBe("0");
  });
});
