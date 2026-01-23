import { I18nUtils } from "../i18nUtils";

describe("I18nUtils", () => {
  it("should translate keys correctly", () => {
    expect(I18nUtils.t("en", "welcome")).toBe("Welcome");
  });

  it("should handle pluralization", () => {
    expect(I18nUtils.t("en", "items", { count: 1 })).toBe("1 item");
    expect(I18nUtils.t("en", "items", { count: 5 })).toBe("5 items");
  });

  it("should return key if translation missing", () => {
    expect(I18nUtils.t("en", "missing.key")).toBe("missing.key");
  });
});
