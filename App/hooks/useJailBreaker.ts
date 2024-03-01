import JailMonkey from "jail-monkey";
import { useEffect } from "react";
import { Alert, BackHandler } from "react-native";

export const useJailBreaker = () => {
  useEffect(() => {

    console.debug("Checking for jail breaks");

    Promise.all([
        JailMonkey.isDebuggedMode(),
        JailMonkey.isDevelopmentSettingsMode()
    ]).then(([isDebugged, isDevelopmentSettings]) => {
        if (
            JailMonkey.trustFall() ||
            isDebugged ||
            isDevelopmentSettings ||
            JailMonkey.AdbEnabled()
        ) {
            Alert.alert(
                "Warning",
                "Your device is rooted or has suspicious configurations. Exiting the app for security reasons.",
                [{ text: "OK", onPress: () => BackHandler.exitApp() }]
            );
        }
    })

  }, []);
};
