import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../theme/ThemeProvider";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const UnderDevelopment = () => {

  const { theme: { colors, spacing, fontSize, fontFamily } } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white100,
    },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    iconContainer: {
      marginBottom: spacing.md,
    },
    icon: {
      fontSize: fontSize.x4l + fontSize.x4l,
      color: colors.blue400,
    },
    caption: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.xl,
      color: colors.black300,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <FontAwesome5
            name="laptop-code"
            size={styles.icon.fontSize}
            color={styles.icon.color}
          />
        </View>
        <Text style={styles.caption}>Under Development</Text>
      </View>
    </View>
  );
};

export default UnderDevelopment;
