import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../theme/ThemeProvider";

interface CustomSafeViewProps {
  children: React.JSX.Element;
  safeViewStyle?: {};
}

const CustomSafeView: React.FC<CustomSafeViewProps> = ({
  children,
  safeViewStyle,
}) => {
  const {
    theme: { colors },
  } = useTheme();
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    mainPage: {
      flex: 1,
      backgroundColor: colors.white100,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
  });

  return (
    <SafeAreaView style={[styles.mainPage, safeViewStyle && safeViewStyle]}>
      {children}
    </SafeAreaView>
  );
};

export default CustomSafeView;
