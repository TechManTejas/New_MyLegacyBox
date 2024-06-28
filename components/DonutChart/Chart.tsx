import { pieDataItem, PieChart } from "react-native-gifted-charts";
import { useTheme } from "../../testApp/theme/ThemeProvider";
import CenterLabelComponent from "./CenterLabelComponent";
import { useDonutChart } from "./DonutChartProvider";

const Chart = () => {
  const {
    theme: { colors },
  } = useTheme();

  const { donutChartData, isAmountView } = useDonutChart();

  const totalAmount =
    donutChartData?.assets.totalAssetAmount! +
    donutChartData?.liabilities.totalLiabilityAmount!;
  const assetPercent =
    (donutChartData?.assets.totalAssetAmount! / totalAmount) * 100;
  const liabilityPercent =
    (donutChartData?.liabilities.totalLiabilityAmount! / totalAmount) * 100;

  const totalCount =
    donutChartData.assets.totalAssetCount +
    donutChartData.liabilities.totalLiabilityCount;
  const assetCountPercent =
    (donutChartData.assets.totalAssetCount / totalCount) * 100;
  const liabilityCountPercent =
    (donutChartData.liabilities.totalLiabilityCount / totalCount) * 100;

  const pieData: pieDataItem[] = [
    {
      value: isAmountView ? liabilityPercent : liabilityCountPercent,
      color: colors.red400,
      endEdgeRadius: 10,
      isEndEdgeCurved: true,
      isStartEdgeCurved: true,
      startEdgeRadius: 10,
    },
    {
      value: isAmountView ? assetPercent: assetCountPercent,
      color: colors.blue500,
      endEdgeRadius: 10,
      isEndEdgeCurved: true,
      isStartEdgeCurved: true,
      startEdgeRadius: 10,
    },
  ];

  return (
    <PieChart
      data={pieData}
      donut
      radius={150}
      innerRadius={115}
      centerLabelComponent={() => <CenterLabelComponent />}
    />
  );
};

export default Chart;
