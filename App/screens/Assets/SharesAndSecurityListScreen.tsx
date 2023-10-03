import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useIsFocused } from "@react-navigation/native";
import MajorMenu from "../../components/Common/MajorMenu";
import {
  BUSINESS_SHARES_DATA,
  PRIVATE_SHARES_DATA,
} from "../../data/SharesAndSecurityData";

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
      <MajorMenu menuData={PRIVATE_SHARES_DATA} />

      <Text style={styles.sectiontitle}>Business Investment</Text>
      <MajorMenu menuData={BUSINESS_SHARES_DATA} />
    </View>
  );
};

export default SharesAndScurityListScreen;
