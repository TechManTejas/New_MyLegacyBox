import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { FontAwesomeIconsData } from "../../data/FontawesomeIconsData";
import { CustomIcon } from "../Common/CustomIcon";
import { useRouter } from "expo-router";

const PensionBoxBanner = () => {

  const router = useRouter()

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
      alignItems: "stretch",
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
      marginLeft: "auto",
      justifyContent: "center",
      paddingHorizontal: spacing.xs,
    },
    cta: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.blue500,
      justifyContent: "center",
      alignSelf: "center",
    },
  });

  const handler = () => {
    router.push("/home/pensionboxiframe")
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <CustomIcon
          path={FontAwesomeIconsData.oldMan.path}
          viewBox={FontAwesomeIconsData.oldMan.viewBox}
          size={spacing.xl}
          color={colors.blue500}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.contentTitle}>NPS in minutes!</Text>
        <Text style={styles.contentCaption}>Enroll with pensionBox</Text>
      </View>
      <Pressable style={styles.ctaContainer} onPress={handler}>
        <Text style={styles.cta}>{"Sign Up Now >"}</Text>
      </Pressable>
    </View>
  );
};

export default PensionBoxBanner;
