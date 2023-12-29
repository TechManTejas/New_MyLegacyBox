import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useIsFocused } from "@react-navigation/native";
import {
  DEMAT_PRIVATE_SHARES_MENU_DATA,
  DEMAT_BUSINESS_SHARES_NEMU_DATA,
} from "../../data/MenuPropsData";
import SolidIconMenu from "../../components/SolidIconMenu";

const SharesAndScurityListScreen = () => {
  const {
    theme: { colors, spacing, fontFamily, fontSize },
  } = useTheme();
  const isFoucused = useIsFocused();

  const styles = StyleSheet.create({
    sectiontitle: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue500,
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black200,
      marginBottom: spacing.sm,
      paddingBottom: spacing.xs,
    },
    container: {
      flex: 1,
      backgroundColor: colors.white100,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      paddingBottom: spacing.lg,
    },
  });

  return (
    <View style={styles.container}>
      {isFoucused ? (
        <StatusBar barStyle="dark-content" backgroundColor={colors.white100} />
      ) : null}
      <Text style={styles.sectiontitle}>Private Investment</Text>
      <SolidIconMenu data={DEMAT_PRIVATE_SHARES_MENU_DATA} isLarge />

      <Text style={styles.sectiontitle}>Business Investment</Text>
      <SolidIconMenu data={DEMAT_BUSINESS_SHARES_NEMU_DATA} isLarge />
    </View>
  );
};

export default SharesAndScurityListScreen;
