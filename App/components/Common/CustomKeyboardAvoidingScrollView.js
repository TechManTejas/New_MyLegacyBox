import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
// specifically if you use header in react native
import { useHeaderHeight } from "@react-navigation/elements";

const CustomKeyboardAvoidingScrollView = ({
  children,
  keyboardVerticalOffset,
}) => {
  const headerHeight = useHeaderHeight();
  // const [heightOffset, setHeightOffset] = useState(0);
  // const { width, height } = useWindowDimensions();

  // useEffect(() => {
  //   const showEventName =
  //     Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow";

  //   const hideEventName =
  //     Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide";

  //   const showEventListener = Keyboard.addListener(showEventName, (event) => {
  //     if (!event.endCoordinates) return;

  //     const heightOffset = height - event.endCoordinates.screenY;

  //     setHeightOffset(heightOffset);
  //   });

  //   const hideEventListener = Keyboard.addListener(hideEventName, (event) => {
  //     setHeightOffset(0);
  //   });

  //   return () => {
  //     showEventListener.remove();
  //     hideEventListener.remove();
  //   };
  // }, []);

  const styles = StyleSheet.create({
    keyboard: {
      flexGrow: 1,
    },
    scrollView: {
      flexGrow: 1,
    },
  });

  // console.log(headerHeight);
  // console.log(keyboardVerticalOffset);
  // console.log("---");
  
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={
        keyboardVerticalOffset
          ? headerHeight + keyboardVerticalOffset
          : headerHeight
      }
      style={styles.keyboard}
      behavior={Platform.OS === "android" ? "height" : "padding"}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollView}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardAvoidingScrollView;
