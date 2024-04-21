import { Stack, usePathname } from "expo-router";
import React, { useState } from "react";
import { getAuthenticatedSessionTokenParsed } from "../testApp/utils/auth";
import Bugsnag, { Event } from "@bugsnag/expo";
import BugsnagPerformance from "@bugsnag/react-native-performance";
import { Text, View } from "react-native";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useCheckSigningCertificates } from "../testApp/hooks/useCheckSigningCertificates";
import messaging from "@react-native-firebase/messaging";
import AnimatedSplashScreen from "../testApp/screens/Splash/AnimatedSplashScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "../testApp/screens/Splash/SplashScreen";
import { AuthProvider, useAuth } from "../testApp/authentication/AuthProvider";
import { ThemeProvider } from "../testApp/theme/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "../testApp/redux/store";
import AppTour from "../testApp/components/AppTour";

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

ExpoSplashScreen.preventAutoHideAsync().catch((err) => {
  console.error(err);
});

const ErrorView = () => (
  <View>
    <Text>Inform users of an error in the component tree.</Text>
  </View>
);

const Screens = () => {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated);

  if (isAuthenticated) {
    console.log("loading drawer");

    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="drawer" />
      </Stack>
    );
  }

  console.log("loading index stack");

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
};

const RootLayout = () => {
  const path = usePathname();

  console.log(path);
  // useJailBreaker();

  // useCheckSigningCertificates([
  //   process.env.EXPO_PUBLIC_APP_PLAYSTORE_CERTIFICATE_SHA256,
  //   process.env.EXPO_PUBLIC_APP_PLAYSTORE_CERTIFICATE_SHA256,
  // ]);

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
                <Screens />
              </SafeAreaProvider>
            </SplashScreen>
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default RootLayout;
