import { validateEmail } from "../emailValidator";

describe("validateEmail", () => {
  it("should return true for valid emails", () => {
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("user.name@domain.co.in")).toBe(true);
  });

  it("should return false for invalid emails", () => {
    expect(validateEmail("test@example")).toBe(false);
    expect(validateEmail("user@.com")).toBe(false);
    expect(validateEmail("plainstring")).toBe(false);
  });
});
