/* eslint-disable no-undef */
import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  })),
  usePathname: jest.fn(() => "/"),
  Slot: ({ children }) => children,
}));

jest.mock("@bugsnag/expo", () => ({
  start: jest.fn(),
  notify: jest.fn(),
  getPlugin: jest.fn(() => ({
    createErrorBoundary: (React) => (props) => props.children,
  })),
}));

jest.mock("@bugsnag/react-native-performance", () => ({
  start: jest.fn(),
}));

jest.mock("jail-monkey", () => ({
  isDebuggedMode: jest.fn(() => Promise.resolve(false)),
  isDevelopmentSettingsMode: jest.fn(() => Promise.resolve(false)),
  trustFall: jest.fn(() => false),
  AdbEnabled: jest.fn(() => false),
}));

jest.mock("expo-screen-capture", () => ({
  usePreventScreenCapture: jest.fn(),
  preventAutoHideAsync: jest.fn(),
}));

jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

jest.mock("expo-font");
jest.mock("expo-asset");

jest.mock("@react-native-firebase/messaging", () => () => ({
  onMessage: jest.fn(),
  setBackgroundMessageHandler: jest.fn(),
  getToken: jest.fn(() => Promise.resolve("mock-token")),
}));

jest.mock("@react-native-firebase/app", () => ({}));

// Mock Redux
jest.mock("react-redux", () => {
  const ActualReactRedux = jest.requireActual("react-redux");
  return {
    ...ActualReactRedux,
    useDispatch: () => jest.fn(),
    useSelector: jest.fn(),
  };
});

jest.mock("@shopify/react-native-skia", () => ({}));

// Mock navigation
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});
