import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../testApp/theme/ThemeProvider";
import { useDonutChart } from "./DonutChartProvider";
import { numberToInr } from "../../utils";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import CustomToolTip from "../../testApp/components/Common/CustomToolTip";
import AntDesign from "@expo/vector-icons/AntDesign";

const CenterLabelComponent = () => {
  const {
    theme: { fontFamily, spacing, fontSize, colors },
  } = useTheme();

  const { donutChartData, isAmountView } = useDonutChart();

  const netWorth =
    donutChartData?.assets.totalAssetAmount! -
    donutChartData?.liabilities.totalLiabilityAmount!;

  const styles = StyleSheet.create({
    componentContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      fontFamily: fontFamily.regular,
    },
    label: {
      fontFamily: fontFamily.regular,
    },
    netWorth: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.xxl,
      lineHeight: fontSize.xxxl,
      marginTop: spacing.sm,
    },
  });

  return (
    <View style={styles.componentContainer}>
      {isAmountView ? (
        <MaterialCommunityIcons
          name="hand-coin"
          size={28}
          color="black"
          style={{ marginBottom: 5 }}
        />
      ) : (
        <FontAwesome6
          name="house-lock"
          size={28}
          color="black"
          style={{ marginBottom: 5 }}
        />
      )}
      <Text style={styles.title}>Net worth</Text>

      <View style={{ display: "flex", alignItems: "flex-start", flexDirection: "row" }}>
      <Text style={styles.netWorth}>
        &#8377; {numberToInr(netWorth)}
      </Text>

      <CustomToolTip
          icon={<AntDesign name="questioncircleo" size={12} color={colors.black400} />}
          message={
            <View>
              <Text>Assets (Less) Liability</Text>
            </View>
          }
          position={"bottom"}
          style={{ position:"relative" }}
        />

      </View>

      {/* <Text style={styles.label}>Assets (Less) Liability</Text> */}
    </View>
  );
};

export default CenterLabelComponent;
