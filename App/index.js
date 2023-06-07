import React, { useState, useEffect } from "react";

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

import BiometricAuthScreen from "./screens/BiometricAuthScreen";
import { authenticateAsync } from "expo-local-authentication";

function App() {

  const [isBioAuthenticated, setIsBioAuthenticated] = useState(false)

  const handleBiometricAuth = async () => {
      const res = await authenticateAsync({ promptMessage: "Authenticate" })
      if (res.error == "user_cancel") BackHandler.exitApp()
      setIsBioAuthenticated(res.success)
  }

  useEffect(() => {

    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background') setIsBioAuthenticated(false)
      if (nextAppState == 'active') handleBiometricAuth()
    }

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    }

  }, [])

  return (
      <Provider store={store}>
        <ThemeProvider>
          <AuthProvider>
            <SplashScreen>
              <SafeAreaProvider>
                { (!isBioAuthenticated) ? <BiometricAuthScreen /> : <RootNavigation /> }
              </SafeAreaProvider>
            </SplashScreen>
          </AuthProvider>
        </ThemeProvider>
      </Provider>
  );
}

export default App;
