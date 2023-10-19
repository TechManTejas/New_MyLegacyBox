import React from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface CustomKeyboardAvoidingScrollViewProps {
  children: React.ReactNode;
}

const CustomKeyboardAvoidingScrollView: React.FC<
  CustomKeyboardAvoidingScrollViewProps
> = ({ children }) => {
  const styles = StyleSheet.create({
    keyboard: {
      flexGrow: 1,
    },
    scrollView: {
      flexGrow: 1,
    },
  });

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.keyboard}
      scrollEnabled={true}
      enableAutomaticScroll={true}
      extraHeight={300}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default CustomKeyboardAvoidingScrollView;
