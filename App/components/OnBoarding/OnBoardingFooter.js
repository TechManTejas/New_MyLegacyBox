import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { SCREEN_NAMES } from "../../constants/screenNames";
import BlueButton from "../Button/BlueButton";

const OnBoardingFooter = () => {
  const navigation = useNavigation();
  const {
    theme: { spacing, colors, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    footerContainer: {
      flex: 1,
      backgroundColor: colors.blue700,
    },
    footer: {
      flex: 1,
      backgroundColor: colors.white500,
      borderTopLeftRadius: spacing.xl,
      borderTopRightRadius: spacing.xl,
    },
    container: {
      flex: 1,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
    },
    heading: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.lg + fontSize.xxs,
      color: colors.blue,
      textAlign: "center",
    },
    buttonContainer: {
      marginTop: "auto",
      alignItems: "flex-start",
      flexDirection: "row",
      marginBottom: spacing.sm,
    },
    caption: {
      textAlign: "center",
      fontFamily: fontFamily.regular,
      fontSize: fontSize.sm,
      color: colors.black400,
    },
    captionBold: {
      fontFamily: fontFamily.semiBold,
    },
  });

  return (
    <View style={styles.footerContainer}>
      <View style={styles.footer}>
        <View style={styles.container}>
          <Text style={styles.heading}>Be Oiconomos Today!</Text>
          <View style={styles.buttonContainer}>
            <BlueButton
              title="Login"
              outline
              uppercase
              expandHorizontal
              onPress={() => {
                navigation.navigate(SCREEN_NAMES.loginScreen);
              }}
            />
            <View style={{ width: spacing.md }} />
            <BlueButton
              title="Register"
              uppercase
              expandHorizontal
              onPress={() => {
                alert("hi");
              }}
            />
          </View>
          <Text style={styles.caption}>
            By signing up you agree to our{" "}
            <Text style={styles.captionBold}>Terms & Conditions</Text> and{" "}
            <Text style={styles.captionBold}>Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OnBoardingFooter;
