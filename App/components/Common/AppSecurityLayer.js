import { useEffect, useState, useRef } from "react";

import {
  ActivityIndicator,
  Alert,
  AppState,
  BackHandler,
  Button,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  authenticateAsync,
  getEnrolledLevelAsync,
  SecurityLevel,
} from "expo-local-authentication";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { useTheme } from "../../theme/ThemeProvider";

const AppSecurityLevel = ({ splashScreenVisible }) => {
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

  const saveCustomUserPin = () => {
    const validPin = /^\d{4}$/.test(userPin);
    if (validPin) {
      setItemAsync("userPin", userPin);
      setShowPinModal(false);
      setBlackScreen(false);
    } else {
      Alert.alert("Invalid PIN", "Your PIN Code should be a 4 digit number", [
        { text: "OK" },
      ]);
    }
  };

  const authenticateUserPin = () => {
    if (userPin === userPinExists.pin) {
      setShowPinModal(false);
      setBlackScreen(false);
    } else {
      Alert.alert(
        "Authentication Failed",
        "You Entered incorrect PIN, Please Try Again",
        [{ text: "OK" }]
      );
    }
  };

  const checkExistingPin = async () => {
    getItemAsync("userPin").then((pin) => {
      pin !== null
        ? setUserPinExists({ exists: true, pin, checked: true })
        : setUserPinExists({ ...userPinExists, checked: true });
    });
  };

  const loadAppUserAuth = async (nextAppState, firstRun = false) => {
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
    !splashScreenVisible && loadAppUserAuth("active", true);
  }, [splashScreenVisible]);

  useEffect(() => {
    let appStateListener = null;
    appStateListener = AppState.addEventListener("change", loadAppUserAuth);
    return () => {
      appStateListener && appStateListener.remove();
    };
  }, []);

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
    <Modal transparent visible={blackScreen} animationType="slide">
      <KeyboardAvoidingView>
        <ImageBackground style={styles.blackScreen}>
          {showPinModal ? (
            userPinExists.checked ? (
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
            ) : (
              <ActivityIndicator size="large" color="white" />
            )
          ) : null}
        </ImageBackground>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AppSecurityLevel;
