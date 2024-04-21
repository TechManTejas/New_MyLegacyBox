import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";

const WillMinorTag = () => {
  const {
    theme: { colors, fontSize, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    tagContainer: {
      backgroundColor: colors.blue300,
      borderRadius: spacing.md,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      marginLeft: spacing.xs,
    },
    tagText: {
      fontSize: fontSize.sm,
      lineHeight: fontSize.md,
      color: colors.white100,
    },
  });

  return (
    <View style={styles.tagContainer}>
      <Text style={styles.tagText}>Minor</Text>
    </View>
  );
};

export default WillMinorTag;
