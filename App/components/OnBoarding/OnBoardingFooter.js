import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Linking, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { SCREEN_NAMES } from "../../constants/screenNames";
import BlueButton from "../Common/Button/BlueButton";

const OnBoardingFooter = () => {
  const navigation = useNavigation();
  const { theme: { spacing, colors, fontFamily, fontSize } } = useTheme();

  const styles = StyleSheet.create({
    footerContainer: {
      backgroundColor: colors.white400,
    },
    footer: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.blue200,
      backgroundColor: colors.white100,
      borderTopLeftRadius: spacing.xl,
      borderTopRightRadius: spacing.xl,
    },
    container: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
    },
    heading: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.xl,
      lineHeight: fontSize.xxl,
      marginBottom: spacing.xl,
      color: colors.blue,
      textAlign: "center",
    },
    buttonContainer: {
      marginTop: "auto",
      alignItems: "flex-start",
      flexDirection: "row",
      marginBottom: spacing.lg,
    },
    caption: {
      textAlign: "center",
      fontFamily: fontFamily.regular,
      fontSize: fontSize.xs,
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
          <Text style={styles.heading}>I'm a proud Oiconomos!</Text>
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
                navigation.navigate(SCREEN_NAMES.registerScreen);
              }}
            />
          </View>
          <Text style={styles.caption}>
            By signing up you agree to our{" "}
            <Text style={styles.captionBold} onPress={() => Linking.openURL("https://www.oiconomos.com/privacy-policy")}>
              Terms & Conditions
            </Text> and{" "}
            <Text style={styles.captionBold} onPress={() => Linking.openURL("https://www.oiconomos.com/privacy-policy")}>
              Privacy Policy
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OnBoardingFooter;
