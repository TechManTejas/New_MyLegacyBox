import CertificateVerification from "../native/NativeCertificationVerification";
import { Alert, BackHandler } from "react-native";
import { useOnForegroundFocus } from "./useOnForegroundFocus";

export const useCheckSigningCertificates = (
  certificateSHA256List: string[]
) => {
  useOnForegroundFocus(() => {
    console.debug("Checking for app signing signatures");

    CertificateVerification.verifyAppSignatureCertificate(certificateSHA256List)
      .then((result) => {
        if (!result) {
          Alert.alert(
            "Caution",
            "The App signature is incorrect. Exit for safety",
            [{ text: "OK", onPress: () => BackHandler.exitApp() }]
          );
        }
      })
      .catch((error) => {
        Alert.alert(
          "Caution",
          "Unable to verify App signature. Exit for safety",
          [{ text: "OK", onPress: () => BackHandler.exitApp() }]
        );
      });
  }, true);
};
