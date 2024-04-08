import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

interface CustomActivityIndicatorProps {
  backgroundColor?: string;
  color?: string;
  isLarge?: boolean;
  extraStyle?: StyleProp<ViewStyle>;
}

const CustomActivityIndicator: React.FC<CustomActivityIndicatorProps> = ({
  backgroundColor,
  color,
  isLarge,
  extraStyle,
}) => {
  const {
    theme: { colors },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: backgroundColor ? backgroundColor : colors.white100,
    },
  });

  return (
    <View style={[styles.container, extraStyle]}>
      <ActivityIndicator
        size={isLarge ? "large" : "small"}
        color={color || colors.blue}
      />
    </View>
  );
};

export default CustomActivityIndicator;
