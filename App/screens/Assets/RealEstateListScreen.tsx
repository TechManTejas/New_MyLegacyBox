import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useIsFocused } from "@react-navigation/native";
import { REAL_ESTATE_MENU_DATA } from "../../data/MenuPropsData";
import SolidIconMenu from "../../components/SolidIconMenu";

const RealEstateListScreen = () => {
  const {
    theme: { colors, spacing },
  } = useTheme();
  const isFoucused = useIsFocused();

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
      {isFoucused ? (
        <StatusBar barStyle="dark-content" backgroundColor={colors.white100} />
      ) : null}
      <SolidIconMenu data={REAL_ESTATE_MENU_DATA} isLarge />
    </View>
  );
};

export default RealEstateListScreen;
