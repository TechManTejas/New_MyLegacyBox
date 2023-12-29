import React, { useEffect, useState } from "react";
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

// import notifee from "@notifee/react-native";

ExpoSplashScreen.preventAutoHideAsync().catch((err) => {
  console.log(err);
});

function App() {
  // usePreventScreenCapture();

  const [splashScreenVisible, setSplashScreenVisible] = useState(true);

  useEffect(() => {
    Updates.addListener((event) => {
      if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE)
        alert("An update is available, Restart the app to see it");
    });
  }, []);

  messaging().onMessage((message) => {
    console.log(message);
  });

  messaging().setBackgroundMessageHandler(async (message) => {
    console.log(message);
  });

  return (
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
  );
}

export default App;
