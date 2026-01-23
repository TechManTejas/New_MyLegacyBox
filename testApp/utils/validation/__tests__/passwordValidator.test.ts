import { validatePassword } from "../passwordValidator";

describe("validatePassword", () => {
  it("should return true for strong passwords", () => {
    expect(validatePassword("StrongP@ss123")).toBe(true);
  });

  it("should return false for passwords without uppercase", () => {
    expect(validatePassword("weakpass123!")).toBe(false);
  });

  it("should return false for passwords without numbers", () => {
    expect(validatePassword("WeakPass@")).toBe(false);
  });

  it("should return false for too short passwords", () => {
    expect(validatePassword("Sh0rt!")).toBe(false);
  });
});
