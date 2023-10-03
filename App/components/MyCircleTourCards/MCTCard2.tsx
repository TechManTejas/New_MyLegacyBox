import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";

const MCTCard2 = () => {
  const { width } = Dimensions.get("window");

  const {
    theme: { spacing, colors, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    page: {
      width,
      padding: spacing.xl,
      paddingTop: spacing.xxxl,
    },
    text: {
      fontFamily: fontFamily.regular,
      color: colors.black500,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg + spacing.xxs,
      flexShrink: 1,
    },
    titleText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.xxl,
      lineHeight: fontSize.xxxl,
      marginTop: spacing.xl,
      marginBottom: spacing.lg,
      color: colors.blue,
    },
  });

  return (
    <View style={styles.page}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          style={{ width: 300, height: 220, marginBottom: spacing.xxl }}
          alt=""
          source={require("../../assets/images/test5.jpg")}
        />
        <Text style={styles.titleText}>Create Profiles</Text>
      </View>

      <Text style={[styles.text, { textAlign: "justify", marginBottom: spacing.md }]}>
        In order to assign various roles for individuals in your Will such as
        beneficiaries, witnesses, or executors, you need to create profiles for
        each of them by clicking “Add” shown on the bottom of the page
      </Text>

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          alt=""
          source={require("../../assets/images/addNominee.png")}
          style={{ width: 220, height: 170, marginTop: spacing.lg }}
        />
      </View>
    </View>
  );
};

export default MCTCard2;
