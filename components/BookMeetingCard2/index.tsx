import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useTheme } from "../../testApp/theme/ThemeProvider";
import { FontAwesomeIconsData } from "../../testApp/data/FontawesomeIconsData";
import { CustomIcon } from "../../testApp/components/Common/CustomIcon";
import { useRouter } from "expo-router";
import PhoneIcon from "../../testApp/assets/icons/phone-outlined.svg";

const PensionBoxBanner = () => {
  const router = useRouter();

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      borderRadius: spacing.sm,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.white600,
      backgroundColor: colors.white500,
      marginBottom: spacing.lg,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    iconContainer: {
      backgroundColor: colors.white100,
      padding: spacing.sm,
      borderRadius: spacing.u100,
      justifyContent: "center",
    },
    content: {
      paddingLeft: spacing.md,
      paddingRight: spacing.sm,
      flexShrink: 1,
      justifyContent: "center",
    },
    contentTitle: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
      marginBottom: spacing.xxs,
      color: colors.black500,
    },
    contentCaption: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.sm,
      lineHeight: fontSize.md,
      color: colors.black500,
    },
    ctaContainer: {
      backgroundColor: colors.blue500,
      borderRadius: spacing.xs,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.sm,
      marginRight: spacing.sm
    },
    cta: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.sm,
      lineHeight: fontSize.md,
      color: colors.white100,
    },
  });

  const handler = () => {
    router.push("/home/pensionboxiframe");
  };

  return (
    <View style={styles.container}>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.iconContainer}>
          <PhoneIcon fill={colors.blue500} />
        </View>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>Call-in for Demo</Text>
        </View>
      </View>

      <Pressable style={styles.ctaContainer} onPress={handler}>
        <Text style={styles.cta}>Book Now</Text>
      </Pressable>

    </View>
  );
};

export default PensionBoxBanner;
