import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../../../testApp/theme/ThemeProvider";
import { REAL_ESTATE_MENU_DATA } from "../../../../../testApp/data/MenuPropsData";
import SolidIconMenu from "../../../../../testApp/components/SolidIconMenu";

const RealEstateListScreen = () => {
  const {
    theme: { colors, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
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
      <SolidIconMenu data={REAL_ESTATE_MENU_DATA} isLarge />
    </View>
  );
};

export default RealEstateListScreen;
