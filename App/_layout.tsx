import { Slot, usePathname } from "expo-router";
import React from "react";
import { getAuthenticatedSessionTokenParsed } from "../testApp/utils/auth";
import Bugsnag, { Event } from "@bugsnag/expo";
import BugsnagPerformance from "@bugsnag/react-native-performance";
import { Text, View } from "react-native";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useCheckSigningCertificates } from "../testApp/hooks/useCheckSigningCertificates";
import messaging from "@react-native-firebase/messaging";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "../testApp/screens/Splash/SplashScreen";
import { AuthProvider } from "../testApp/authentication/AuthProvider";
import { ThemeProvider } from "../testApp/theme/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "../testApp/redux/store";
import AppTour from "../testApp/components/AppTour";
import { useJailBreaker } from "../testApp/hooks/useJailBreaker";
import { usePreventScreenCapture } from "expo-screen-capture"

const onErrorCallBack = async (event: Event) => {
  try {
    const res = await getAuthenticatedSessionTokenParsed();
    event.setUser(res?.identity!.traits?.email);
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

ExpoSplashScreen.preventAutoHideAsync().catch((err) => {
  console.error(err);
});

const ErrorView = () => (
  <View>
    <Text>Inform users of an error in the component tree.</Text>
  </View>
);

const RootLayout = () => {

  // usePreventScreenCapture()

  // console.log(usePathname());

  // useJailBreaker();

  // useCheckSigningCertificates([
  //   process.env.EXPO_PUBLIC_APP_PLAYSTORE_CERTIFICATE_SHA256,
  //   process.env.EXPO_PUBLIC_APP_PLAYSTORE_CERTIFICATE_SHA256,
  // ]);

  messaging().onMessage((message) => {});

  messaging().setBackgroundMessageHandler(async (message) => {});

  return (
    <ErrorBoundary FallbackComponent={ErrorView}>
      <Provider store={store}>
        <ThemeProvider>
          <AuthProvider>
            <SplashScreen>
              <SafeAreaProvider>
                <AppTour />
                <Slot />
              </SafeAreaProvider>
            </SplashScreen>
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default RootLayout;
