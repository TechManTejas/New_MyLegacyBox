import React, { useEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";
import "expo-dev-client";
import { LogBox } from "react-native";
import * as ExpoSplashScreen from "expo-splash-screen";
import * as Updates from "expo-updates";
import "react-native-url-polyfill/auto";
import "react-native-gesture-handler";
import { PermissionsAndroid } from "react-native";

import { ThemeProvider } from "./theme/ThemeProvider";
import { AuthProvider } from "./authentication/AuthProvider";
import { RootNavigator } from "./navigation/RootNavigator/RootNavigator";
import SplashScreen from "./screens/Splash/SplashScreen";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";

LogBox.ignoreLogs(["Remote debugger"]);
ExpoSplashScreen.preventAutoHideAsync().catch(console.warn);

import { usePreventScreenCapture } from "expo-screen-capture";
import AnimatedSplashScreen from "./screens/Splash/AnimatedSplashScreen";
import AppSecurityLayer from "./components/Common/AppSecurityLayer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeTourModal from "./components/TourModals/HomeTourModal";
import WillTourModal from "./components/TourModals/WillTourModal";
import MyCircleTourModal from "./components/TourModals/MyCircleTourModal";
import { Alert } from "react-native";

function App() {
  // usePreventScreenCapture();

  const [splashScreenVisible, setSplashScreenVisible] = useState(true);

  useEffect(() => {
    Updates.addListener((event) => {
      if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        alert("An update is available, Restart the app to see it");
      }
    });
  }, []);

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    ).then((permissionStatus) => {
      if (permissionStatus === "granted") {
        messaging()
          .getToken()
          .then((token) => {
            console.log(token);
          });
      }
    });
  }, []);

  // messaging().onMessage(async (remoteMessage) => {
  //   console.log("A new FCM message arrived!", JSON.stringify(remoteMessage))
  // });

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeProvider>
          <AuthProvider>
            <SplashScreen>
              <SafeAreaProvider>
                <AnimatedSplashScreen
                  splashScreenVisible={splashScreenVisible}
                  setSplashScreenVisible={setSplashScreenVisible}
                />

                <HomeTourModal />
                <WillTourModal />
                <MyCircleTourModal />

                {/* <AppSecurityLayer splashScreenVisible={splashScreenVisible} /> */}
                <RootNavigator />
              </SafeAreaProvider>
            </SplashScreen>
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
