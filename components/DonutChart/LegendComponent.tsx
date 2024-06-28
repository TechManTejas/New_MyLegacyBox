import { StyleSheet, View } from "react-native";
import { useTheme } from "../../testApp/theme/ThemeProvider";
import RecordsDisplay from "./RecordsDisplay";
import { useDonutChart } from "./DonutChartProvider";

const LegendComponent = () => {

  const {
    theme: { colors },
  } = useTheme();

  const { donutChartData } = useDonutChart();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10
    },
  });

  return (
    <View style={styles.container}>
      <RecordsDisplay
        color={colors.blue400}
        title="Assets"
        amount={donutChartData?.assets.totalAssetAmount!}
        noOfAssets={donutChartData?.assets.totalAssetCount!}
        navigateTo="/home/assetsAndLiabilities/assets"
        type="assets"
      />
      <RecordsDisplay
        color={colors.red300}
        title="Liabilities"
        amount={donutChartData?.liabilities.totalLiabilityAmount!}
        noOfAssets={donutChartData?.liabilities.totalLiabilityCount!}
        navigateTo="/home/assetsAndLiabilities/liabilities"
        type="liabilities"
      />
    </View>
  );
};

export default LegendComponent;
