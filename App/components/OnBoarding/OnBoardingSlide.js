import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
} from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

const OnBoardingSlide = ({ item }) => {
  const { width } = useWindowDimensions();
  const {
    theme: { colors, spacing, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
    },
    image: {
      flex: 1,
      width: width,
      resizeMode: "contain",
    },
    tite: {
      color: colors.white,
      fontSize: fontSize.lg,
      fontFamily: fontFamily.semiBold,
      lineHeight: fontSize.xl,
      textAlign: "center",
    },
    message: {
      color: colors.white,
      fontSize: fontSize.m,
      marginBottom: spacing.xl,
      maxWidth: "70%",
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.tite}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );
};

export default OnBoardingSlide;
