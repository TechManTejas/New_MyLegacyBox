import { useEffect, useState, useRef } from "react";

import { LogBox } from "react-native";
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

import { usePreventScreenCapture } from "expo-screen-capture";
import AnimatedSplashScreen from "./screens/AnimatedSplashScreen";
import AppSecurityLayer from "./components/Common/AppSecurityLayer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppInfo from "./components/AppInfo/AppInfo";

function App() {
  // usePreventScreenCapture();

  const [splashScreenVisible, setSplashScreenVisible] = useState(true);
  const splashScreenVisibleRef = useRef(splashScreenVisible);
  splashScreenVisibleRef.current = splashScreenVisible;

  useEffect(() => {
    Updates.addListener((event) => {
      if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        alert("An update is available, Restart the app to see it");
      }
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeProvider>
          <AuthProvider>
            <SplashScreen>
              <SafeAreaProvider>
                <AppInfo />
                <AnimatedSplashScreen
                  splashScreenVisible={splashScreenVisible}
                  setSplashScreenVisible={setSplashScreenVisible}
                />
                {/* <AppSecurityLayer splashScreenVisible={splashScreenVisible} /> */}
                <RootNavigation />
              </SafeAreaProvider>
            </SplashScreen>
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
