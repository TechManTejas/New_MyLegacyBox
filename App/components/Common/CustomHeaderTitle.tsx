import React from "react"
import { Text, StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

const CustomHeaderTitle = ({ children }) => {
  const {
    theme: { colors, spacing, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    headerTitle: {
      marginTop: spacing.xxs,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.default,
      lineHeight: fontSize.xl,
      color: colors.blue,
      textAlign: "center",
    },
  });

  return (
    <Text style={styles.headerTitle}>
      {children.length >= 28 ? `${children.slice(0, 28)}...` : children}
    </Text>
  );
};

export default CustomHeaderTitle;
