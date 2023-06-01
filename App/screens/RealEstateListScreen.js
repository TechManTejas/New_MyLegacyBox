import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { useIsFocused } from "@react-navigation/native";
import MajorMenu from "../components/Common/MajorMenu";
import { REAL_ESTATE_MENU_DATA } from "../data/RealEstateData";

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
      <MajorMenu menuData={REAL_ESTATE_MENU_DATA} />
    </View>
  );
};

export default RealEstateListScreen;
