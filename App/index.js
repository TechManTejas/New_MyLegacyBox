import React, { useEffect } from "react";

import { AppState, BackHandler, LogBox } from "react-native";
import * as ExpoSplashScreen from "expo-splash-screen";
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

function App() {

  useEffect(() => {

    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState == 'active') {
        const res = await authenticateAsync({ promptMessage: "Authenticate" })
        if (res.error == "user_cancel") BackHandler.exitApp()
      }
    }

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      
    }

  }, [])

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
