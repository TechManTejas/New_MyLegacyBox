import { Platform, Dimensions } from "react-native";

/**
 * Utilities for device and platform detection.
 */
export const DeviceUtils = {
  isIOS: Platform.OS === "ios",
  isAndroid: Platform.OS === "android",

  getScreenWidth: () => Dimensions.get("window").width,
  getScreenHeight: () => Dimensions.get("window").height,

  isSmallDevice: () => Dimensions.get("window").width < 375,
};
