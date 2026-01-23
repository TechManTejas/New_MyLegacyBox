import { validatePAN } from "../panValidator";

describe("validatePAN", () => {
  it("should return true for valid PAN numbers", () => {
    expect(validatePAN("ABCDE1234F")).toBe(true);
    expect(validatePAN("abcde1234f")).toBe(true); // Should handle lowercase
  });

  it("should return false for invalid PAN numbers", () => {
    expect(validatePAN("ABC1234F")).toBe(false); // Too short
    expect(validatePAN("ABCDE12345")).toBe(false); // No trailing letter
    expect(validatePAN("12345ABCDE")).toBe(false); // Wrong pattern
  });
});
