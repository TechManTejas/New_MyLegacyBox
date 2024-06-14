import { Pressable, StyleSheet, Text, View } from "react-native";
import { PieChart, pieDataItem } from "react-native-gifted-charts";
import { useTheme } from "../../testApp/theme/ThemeProvider";
import { Switch } from "react-native-paper";

const CenterLabelComponent = () => {
  const {
    theme: { fontFamily, spacing, fontSize },
  } = useTheme();

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
      <Text style={styles.title}>Net worth</Text>
      <Text style={styles.netWorth}>&#8377; 600 Crore</Text>
      <Text style={styles.label}>Asset - Liability</Text>
    </View>
  );
};

interface RecordsDisplayProps {
  color: string;
  title: string;
  amount: string;
  noOfAssets: number;
}

const RecordsDisplay: React.FC<RecordsDisplayProps> = ({
  color,
  amount,
  noOfAssets,
  title,
}) => {
  const {
    theme: { colors, spacing, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      // width: 150,
    },
    title: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
    amount: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
      marginTop: spacing.sm,
    },
    noOfAssets: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      marginTop: spacing.sm,
    },

    button: {
      backgroundColor: colors.blue,
      borderRadius: spacing.xs,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.xs,
      marginTop: spacing.lg,
      width: 72,
    },
    buttonText: {
      color: colors.white100,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.lg,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
    },
    dot: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: color,
      marginRight: 7,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.dot} />
        <Text style={styles.title}>{title}</Text>
      </View>

      <Text style={styles.amount}>&#8377; {amount}</Text>
      <Text style={styles.noOfAssets}>{noOfAssets} assets</Text>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>See all</Text>
      </Pressable>
    </View>
  );
};

const RenderLegendComponent = () => {
  const {
    theme: { colors, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: 80,
      marginTop: 32,
    },
  });

  return (
    <View style={styles.container}>
      <RecordsDisplay
        color={colors.blue400}
        title="Assets"
        amount="750 Crore"
        noOfAssets={50}
      />
      <RecordsDisplay
        color={colors.red300}
        title="Liabilities"
        amount="150 Crore"
        noOfAssets={20}
      />
    </View>
  );
};

const DonutChart = () => {
  const {
    theme: { colors },
  } = useTheme();

  const pieData: pieDataItem[] = [
    {
      value: 40,
      color: colors.red300,
      shiftX: 2
    },
    { 
      value: 60,
      color: colors.blue400,
      shiftX: -2, 

      endEdgeRadius: 30,
      isEndEdgeCurved: true,
      isStartEdgeCurved: true,
      startEdgeRadius: 30,
      
    },
  ];

  return (
    <View style={{ padding: 20, alignItems: "center" }}>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingBottom: 30,
        }}
      >
        <Text></Text>
        <Switch
          trackColor={{ false: colors.blue300, true: colors.blue300 }}
          thumbColor={colors.blue500}
          // value={distributionView}
          // onValueChange={() => setDistributionView((prev) => !prev)}
        />
      </View>

      <PieChart
        data={pieData}
        donut
        sectionAutoFocus
        radius={150}
        innerRadius={100}
        centerLabelComponent={() => <CenterLabelComponent />}
      />
      <RenderLegendComponent />
    </View>
  );
};

export default DonutChart;
