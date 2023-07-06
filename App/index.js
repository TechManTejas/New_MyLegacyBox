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
  getEnrolledLevelAsync,
  supportedAuthenticationTypesAsync,
  SecurityLevel,
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

  const loadBioMetricAuth = async (nextAppState, firstRun = false) => {
    const enrolledLevel = await getEnrolledLevelAsync();

    if (firstRun || (nextAppState === "active" && !splashScreenVisible)) {
      setVisible(true);

      if (enrolledLevel === SecurityLevel.NONE) {
        // ... custom logic to handle edge case

        setVisible(false);
      } else {
        const res = await authenticateAsync({
          promptMessage:
            "Oiconomos uses your biometric to ensure the data is accessed by only You",
        });

        if (res.error === "user_cancel") BackHandler.exitApp();

        if (res.success) setVisible(false);
      }
    }
  };

  useEffect(() => {
    !splashScreenVisible
      ? loadBioMetricAuth("active", true)
      : AppState.addEventListener("change", loadBioMetricAuth);

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
