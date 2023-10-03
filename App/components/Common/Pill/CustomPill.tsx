import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../../theme/ThemeProvider";

const CustomPill = ({
  label,
  labelBold,
  size,
  backgroundColor,
  color,
  containerStyle,
}) => {
  const {
    theme: { spacing, fontSize, fontFamily },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      backgroundColor: backgroundColor,
      borderRadius: spacing.u90,
      // alignSelf: "flex-start",
    },
    containerSm: {
      paddingHorizontal: spacing.sm,
    },
    label: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: color,
      // alignSelf: "flex-start",
    },
    labelBold: {
      fontFamily: fontFamily.semiBold,
    },
    labelSm: {
      fontSize: fontSize.sm,
      lineHeight: fontSize.md,
    },
  });

  return (
    <View style={[styles.container, styles.containerSm, containerStyle]}>
      <Text
        style={[
          styles.label,
          labelBold && styles.labelBold,
          size === "sm" && styles.labelSm,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

export default CustomPill;
