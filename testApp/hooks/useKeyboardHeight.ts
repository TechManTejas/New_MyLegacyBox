import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

export const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showEventName =
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow";

    const hideEventName =
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide";

    function onKeyboardDidShow(e: any) {
      setKeyboardHeight(Math.floor(e.endCoordinates.height));
    }

    function onKeyboardDidHide() {
      setKeyboardHeight(0);
    }

    const showSubscription = Keyboard.addListener(
      showEventName,
      onKeyboardDidShow,
    );
    const hideSubscription = Keyboard.addListener(
      hideEventName,
      onKeyboardDidHide,
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return keyboardHeight;
};
