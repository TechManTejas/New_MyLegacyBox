import { useEffect, useState, useRef } from "react";

import {
  Alert,
  AppState,
  BackHandler,
  Button,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  LogBox,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as ExpoSplashScreen from "expo-splash-screen";
import * as Updates from "expo-updates";
import "react-native-url-polyfill/auto";
import "react-native-gesture-handler";

import { ThemeProvider, useTheme } from "./theme/ThemeProvider";
import { AuthProvider } from "./authentication/AuthProvider";
import { RootNavigation } from "./navigation/RootNavigation";
import SplashScreen from "./screens/SplashScreen";
import { Provider } from "react-redux";
import { store } from "./services/store";
import { SafeAreaProvider } from "react-native-safe-area-context";

LogBox.ignoreLogs(["Remote debugger"]);
ExpoSplashScreen.preventAutoHideAsync().catch(console.warn);

import {
  authenticateAsync,
  getEnrolledLevelAsync,
  SecurityLevel,
} from "expo-local-authentication";
import { usePreventScreenCapture } from "expo-screen-capture";
import AnimatedSplashScreen from "./screens/AnimatedSplashScreen";
import { getItemAsync, setItemAsync } from "expo-secure-store";

function App() {
  // usePreventScreenCapture();

  const [splashScreenVisible, setSplashScreenVisible] = useState(true);
  const [blackScreen, setBlackScreen] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [userPin, setUserPin] = useState();
  const [userPinExists, setUserPinExists] = useState({
    checked: false,
    exists: false,
    pin: null,
  });

  const splashScreenVisibleRef = useRef(splashScreenVisible);
  splashScreenVisibleRef.current = splashScreenVisible;

  const CustomAlert = (title, message) =>
    Alert.alert(title, message, [{ text: "OK" }]);

  const saveCustomUserPin = () => {
    const validPin = /^\d{4}$/.test(userPin);
    if (validPin) {
      setItemAsync("userPin", userPin);
      setShowPinModal(false);
      setBlackScreen(false);
    } else {
      CustomAlert("Invalid PIN", "Your PIN Code should be a 4 digit number");
    }
  };

  const authenticateUserPin = () => {
    if (userPin === userPinExists.pin) {
      setShowPinModal(false);
      setBlackScreen(false);
    } else {
      CustomAlert(
        "Authentication Failed",
        "You Entered incorrect PIN, Please Try Again"
      );
    }
  };

  const checkExistingPin = async () => {
    getItemAsync("userPin").then((pin) => {
      if (pin !== null) {
        setUserPinExists({ exists: true, pin, checked: true });
      } else {
        setUserPinExists({ ...userPinExists, checked: true });
      }
    });
  };

  const reactToUpdates = async () => {
    Updates.addListener((event) => {
      if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        alert("An update is available, Restart the app to see it");
      }
    });
  };

  const loadExtraUserAuth = async (nextAppState, firstRun = false) => {
    const enrolledLevel = await getEnrolledLevelAsync();

    if (
      firstRun ||
      (nextAppState === "active" && !splashScreenVisibleRef.current)
    ) {
      setBlackScreen(true);

      if (enrolledLevel === SecurityLevel.NONE) {
        checkExistingPin();
        setShowPinModal(true);
      } else {
        const res = await authenticateAsync({
          promptMessage:
            "Oiconomos uses your biometric to ensure the data is accessed by only You",
        });

        if (res.error === "user_cancel") BackHandler.exitApp();

        if (res.success) setBlackScreen(false);
      }
    }
  };

  useEffect(() => {
    let appStateListener = null;

    if (!splashScreenVisible) {
      loadExtraUserAuth("active", true);
    } else {
      appStateListener = AppState.addEventListener("change", loadExtraUserAuth);
    }

    reactToUpdates();
    return () => {
      if (appStateListener) {
        appStateListener.remove();
      }
    };
  }, [splashScreenVisible]);

  const { height } = Dimensions.get("window");

  const {
    theme: { spacing, colors, fontFamily },
  } = useTheme();

  const styles = StyleSheet.create({
    blackScreen: {
      height,
      backgroundColor: "black",
      alignItems: "center",
      justifyContent: "center",
    },
    customPinModal: {
      padding: spacing.x4l,
      borderRadius: spacing.sm,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
    },
    pinInput: {
      borderColor: colors.black300,
      borderRadius: spacing.xs,
      borderStyle: "solid",
      borderWidth: 1,
      paddingVertical: spacing.sm,
      textAlign: "center",
      marginBottom: spacing.lg,
      width: 150,
    },
    headText: {
      marginBottom: spacing.md,
      fontFamily: fontFamily.semiBold,
      color: colors.blue500,
      textAlign: "center",
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <SplashScreen>
            <SafeAreaProvider>
              {splashScreenVisible && (
                <AnimatedSplashScreen
                  onAnimationEnd={() => {
                    // setSplashScreenVisible(false);
                    // setBlackScreen(true);
                  }}
                />
              )}

              <Modal transparent visible={blackScreen}>
                <KeyboardAvoidingView>
                  <ImageBackground style={styles.blackScreen}>
                    {showPinModal && userPinExists.checked && (
                      <View style={styles.customPinModal}>
                        <Text style={styles.headText}>
                          {userPinExists.exists
                            ? "Enter the PIN to Authenticate"
                            : "Since your device has no security you need to set a 4 digit PIN"}
                        </Text>
                        <TextInput
                          keyboardType="numeric"
                          style={styles.pinInput}
                          maxLength={4}
                          onChangeText={(num) => setUserPin(num)}
                          secureTextEntry={true}
                        />
                        <View style={{ width: 100 }}>
                          <Button
                            onPress={
                              userPinExists.exists
                                ? authenticateUserPin
                                : saveCustomUserPin
                            }
                            color={colors.blue500}
                            title={userPinExists.exists ? "CHECK" : "SET"}
                          />
                        </View>
                      </View>
                    )}
                  </ImageBackground>
                </KeyboardAvoidingView>
              </Modal>

              <RootNavigation />
            </SafeAreaProvider>
          </SplashScreen>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
