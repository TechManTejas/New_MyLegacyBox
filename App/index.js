import { useEffect, useState } from "react";

import {
  AppState,
  BackHandler,
  Dimensions,
  ImageBackground,
  LogBox,
  Modal,
} from "react-native";
import * as ExpoSplashScreen from "expo-splash-screen";
import * as Updates from "expo-updates";
import "react-native-url-polyfill/auto";
import "react-native-gesture-handler";

import { ThemeProvider } from "./theme/ThemeProvider";
import { AuthProvider } from "./authentication/AuthProvider";
import { RootNavigation } from "./navigation/RootNavigation";
import SplashScreen from "./screens/SplashScreen";
import { Provider } from "react-redux";
import { store } from "./services/store";
import { SafeAreaProvider } from "react-native-safe-area-context";

LogBox.ignoreLogs(["Remote debugger"]);
ExpoSplashScreen.preventAutoHideAsync().catch(console.warn);

import {
  authenticateAsync,
  hasHardwareAsync,
  supportedAuthenticationTypesAsync,
} from "expo-local-authentication";
import { usePreventScreenCapture } from "expo-screen-capture";
import AnimatedSplashScreen from "./screens/AnimatedSplashScreen";

function App() {
  const [visible, setVisible] = useState(false);
  const [splashScreenVisible, setSplashScreenVisible] = useState(true);

  // usePreventScreenCapture();

  const reactToUpdates = async () => {
    Updates.addListener((event) => {
      if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        alert("An update is available, Restart the app to see it");
      }
    });
  };

  const loadBioMetricAuth = async (nextAppState) => {
    const hasHardware = await hasHardwareAsync();

    console.log({ c1: nextAppState === "active", c2: hasHardware, c3: !splashScreenVisible })

    if (nextAppState === "active" && hasHardware && !splashScreenVisible) {
      setVisible(true);

      const res = await authenticateAsync({
        promptMessage:
          "Oiconomos uses your biometric to ensure the data is accessed by only You",
      });

      if (res.error === "user_cancel") BackHandler.exitApp();

      if (res.success) setVisible(false);
    }
  };

  useEffect(() => {
    if (!splashScreenVisible) {
      loadBioMetricAuth("active")
    }
    AppState.addEventListener("change", loadBioMetricAuth);
    reactToUpdates();
  }, [splashScreenVisible]);

  const { height } = Dimensions.get("window");

  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <SplashScreen>
            <SafeAreaProvider>
              {splashScreenVisible && (
                <AnimatedSplashScreen
                  onAnimationEnd={() => {
                    setSplashScreenVisible(false);
                    setVisible(true);
                  }}
                />
              )}
              <Modal transparent visible={visible}>
                <ImageBackground style={{ height, backgroundColor: "black" }} />
              </Modal>
              <RootNavigation />
            </SafeAreaProvider>
          </SplashScreen>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
