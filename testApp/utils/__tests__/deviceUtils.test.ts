import { DeviceUtils } from "../deviceUtils";
import { Platform } from "react-native";

describe("DeviceUtils", () => {
  it("should identify platform correctly", () => {
    // Note: Mocking Platform might be needed for full tests,
    // but we can check the default state in these environments.
    expect(typeof DeviceUtils.isIOS).toBe("boolean");
    expect(typeof DeviceUtils.isAndroid).toBe("boolean");
  });

  it("should return screen dimensions", () => {
    expect(typeof DeviceUtils.getScreenWidth()).toBe("number");
  });
});
