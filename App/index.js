import React, { useState, useEffect } from "react";

// import 'expo-dev-client';

// essential for kratos config
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
  const [bioAuthFlow, setBioAuthFlow] = useState(true)

  const handleBiometricAuth = async () => {
      const res = await authenticateAsync({ promptMessage: "Authenticate" })
      setIsBioAuthenticated(res.success)
      if (!res.success) setBioAuthFlow(false)
  }

  useEffect(() => {
    handleBiometricAuth()
  }, [])

  return (
      <Provider store={store}>
        <ThemeProvider>
          <AuthProvider>
            <SplashScreen>
              <SafeAreaProvider>
                { (!isBioAuthenticated) ? 
                  <BiometricAuthScreen handleBiometricAuth={handleBiometricAuth} setBioAuthFlow={setBioAuthFlow} bioAuthFlow={bioAuthFlow} /> : 
                  <RootNavigation />
                }
              </SafeAreaProvider>
            </SplashScreen>
          </AuthProvider>
        </ThemeProvider>
      </Provider>
  );
}

export default App;
