import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";

const MCTCard3 = () => {
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
          source={require("../../assets/images/test6.jpg")}
        />
        <Text style={styles.titleText}>Review Shared Details</Text>
      </View>

      <Text
        style={[
          styles.text,
          { textAlign: "justify", marginBottom: spacing.lg },
        ]}
      >
        View the financial information that you are sharing with each of the
        members by clicking “Open” on their profile
      </Text>

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          alt=""
          source={require("../../assets/images/openNominee.png")}
          style={{ width: 220, height: 170, marginTop: spacing.lg }}
        />
      </View>
    </View>
  );
};

export default MCTCard3;
