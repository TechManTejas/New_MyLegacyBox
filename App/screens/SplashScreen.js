import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import {
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { Asset } from "expo-asset";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useAuth } from "../authentication/AuthProvider";

const SplashScreen = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const { sessionToken, syncSession } = useAuth();

  useEffect(() => {
    const loadModuleImages = (images) =>
      images.map((image) => Asset.fromModule(image).downloadAsync());

    const prepare = () => {
      Promise.all([
        syncSession(sessionToken),
        Font.loadAsync({
          Poppins_200ExtraLight,
          Poppins_400Regular,
          Poppins_600SemiBold,
          Poppins_800ExtraBold,
        }),
        ...loadModuleImages([
          require("../assets/images/1.png"),
          require("../assets/images/2.png"),
          require("../assets/images/3.png"),
          require("../assets/images/logoFullDark.png"),
          require("../assets/images/logoFullLight.png"),
          // require("../assets/images/logoSmallLight.png"),
        ]),
      ])
        .then(async () => {
          setIsAppReady(true);
          await ExpoSplashScreen.hideAsync();
        })
        .catch(console.error);
    };

    prepare();
  }, []);

  return isAppReady ? <>{children}</> : null;
};

export default SplashScreen;
