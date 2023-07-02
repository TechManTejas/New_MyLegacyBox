import { useEffect } from "react";

import { AppState, BackHandler, LogBox } from "react-native";
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

import { authenticateAsync } from "expo-local-authentication";
import { usePreventScreenCapture } from "expo-screen-capture";

function App() {

  usePreventScreenCapture()

  const reactToUpdates = async () => {
    Updates.addListener((event) => {
      if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        alert("An update is available, Restart the app to see it");
      }
    });
  };

  useEffect(() => {
    
    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState == "active") {
        const res = await authenticateAsync({ promptMessage: "Authenticate" });
        if (res.error == "user_cancel") BackHandler.exitApp();
      }
    };

    reactToUpdates();

    AppState.addEventListener("change", handleAppStateChange);
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <SplashScreen>
            <SafeAreaProvider>
              <RootNavigation />
            </SafeAreaProvider>
          </SplashScreen>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
