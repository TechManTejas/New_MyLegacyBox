import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

const CustomActivityIndicator = ({ backgroundColor, color, isLarge }) => {
  const {
    theme: { colors },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: backgroundColor ? backgroundColor : colors.white,
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={isLarge ? "large" : "small"}
        color={color || colors.blue}
      />
    </View>
  );
};

export default CustomActivityIndicator;
