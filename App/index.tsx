import React, { useState } from "react";
import messaging from "@react-native-firebase/messaging";
import "expo-dev-client";
import * as ExpoSplashScreen from "expo-splash-screen";
import * as Updates from "expo-updates";
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

import Bugsnag from "@bugsnag/expo";
import { Text, View } from "react-native";
Bugsnag.start();

const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);

// import notifee from "@notifee/react-native";

ExpoSplashScreen.preventAutoHideAsync().catch((err) => {
  console.log(err);
});

const ErrorView = () => (
  <View>
    <Text>Inform users of an error in the component tree.</Text>
  </View>
);

function App() {
  // usePreventScreenCapture();

  const [splashScreenVisible, setSplashScreenVisible] = useState(true);

  messaging().onMessage((message) => {
    console.log(message);
  });

  messaging().setBackgroundMessageHandler(async (message) => {
    console.log(message);
  });

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
