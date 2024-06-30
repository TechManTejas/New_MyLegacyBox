import { StyleSheet, View } from "react-native";
import ToggleSwitchHeader from "./ToggleSwitchHeader";
import LegendComponent from "./LegendComponent";
import DonutChartProvider from "./DonutChartProvider";
import Chart from "./Chart";

const DonutChart = () => {
  const styles = StyleSheet.create({
    donutChartContainer: {
      alignItems: "center",
    },
    innerContainer: {
      alignItems: "center",
      justifyContent: "space-around",
      height: "100%"
    }
  });

  return (
    <View style={styles.donutChartContainer}>
      <DonutChartProvider>
        <View style={styles.innerContainer}>
          <ToggleSwitchHeader />
          <Chart />
          <LegendComponent />
        </View>
      </DonutChartProvider>
    </View>
  );
};

export default DonutChart;
