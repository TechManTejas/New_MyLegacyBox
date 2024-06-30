import { StyleSheet, View } from "react-native";
import React from "react";
import { useTheme } from "../../../../../testApp/theme/ThemeProvider";
import DonutChart from "../../../../../components/DonutChart";

const AssetsAndLiabilities = () => {
  const {
    theme: { colors },
  } = useTheme();

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.white100,
    },
  });

  return (
    <View style={styles.screen}>
      <DonutChart />
    </View>
  );
};

export default AssetsAndLiabilities;
