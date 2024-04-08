import React, { useState } from "react";
import messaging from "@react-native-firebase/messaging";
import "expo-dev-client";
import * as ExpoSplashScreen from "expo-splash-screen";
import "react-native-url-polyfill/auto";

import { ThemeProvider } from "./theme/ThemeProvider";
import { AuthProvider } from "./authentication/AuthProvider";
import { RootNavigator } from "./navigation/RootNavigator/RootNavigator";
import SplashScreen from "./screens/Splash/SplashScreen";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { usePreventScreenCapture } from "expo-screen-capture";
import AnimatedSplashScreen from "./screens/Splash/AnimatedSplashScreen";
import AppSecurityLayer from "./components/Common/AppSecurityLayer";
import AppTour from "./components/AppTour";

import BugsnagPerformance from "@bugsnag/react-native-performance";
import Bugsnag, { Event } from "@bugsnag/expo";
import { Text, View } from "react-native";
import {
  getAuthenticatedSessionTokenParsed,
} from "./utils/auth";

import {} from "jail-monkey";
import { useJailBreaker } from "./hooks/useJailBreaker";

const onErrorCallBack = async (event: Event) => {
  try {
    const res = await getAuthenticatedSessionTokenParsed();
    event.setUser(res.identity.traits?.email);
  } catch (err) {
    console.error(err);
  }
};

Bugsnag.start({
  apiKey: process.env.EXPO_PUBLIC_BUGSNAG_API_KEY,
  appVersion: process.env.EXPO_PUBLIC_BUGSNAG_APP_VERSION,
  releaseStage: process.env.EXPO_PUBLIC_BUGSNAG_APP_STAGE,
  onError: onErrorCallBack,
});

BugsnagPerformance.start({
  apiKey: process.env.EXPO_PUBLIC_BUGSNAG_API_KEY,
  appVersion: process.env.EXPO_PUBLIC_BUGSNAG_APP_VERSION,
  releaseStage: process.env.EXPO_PUBLIC_BUGSNAG_APP_STAGE,
});

const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);

// import notifee from "@notifee/react-native";

ExpoSplashScreen.preventAutoHideAsync().catch((err) => {
  console.error(err);
});

const ErrorView = () => (
  <View>
    <Text>Inform users of an error in the component tree.</Text>
  </View>
);

function App() {
  // usePreventScreenCapture();

  useJailBreaker();

  const [splashScreenVisible, setSplashScreenVisible] = useState(true);

  messaging().onMessage((message) => {});

  messaging().setBackgroundMessageHandler(async (message) => {});

  return (
    <ErrorBoundary FallbackComponent={ErrorView}>
      <Provider store={store}>
        <ThemeProvider>
          <AuthProvider>
            <SplashScreen>
              <SafeAreaProvider>
                <AnimatedSplashScreen
                  splashScreenVisible={splashScreenVisible}
                  setSplashScreenVisible={setSplashScreenVisible}
                />

                <AppTour />

                {/* <AppSecurityLayer splashScreenVisible={splashScreenVisible} /> */}
                <RootNavigator />
              </SafeAreaProvider>
            </SplashScreen>
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
