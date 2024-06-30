import { Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useTheme } from "../../testApp/theme/ThemeProvider";
import { numberToInr } from "../../utils";
import { useDonutChart } from "./DonutChartProvider";
import { useRouter } from "expo-router";

interface RecordsDisplayProps {
  color: string;
  title: string;
  amount: number;
  noOfAssets: number;
  navigateTo: string;
  type: "assets" | "liabilities"
}

const RecordsDisplay: React.FC<RecordsDisplayProps> = ({
  color,
  amount,
  noOfAssets,
  title,
  navigateTo,
  type
}) => {
  const router = useRouter();

  const {
    theme: { colors, spacing, fontFamily, fontSize },
  } = useTheme();

  const { isAmountView } = useDonutChart();
  
  const { width } = useWindowDimensions()

  const styles = StyleSheet.create({
    container: {
      width: (width / 2) - 20,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black300,
      borderRadius: spacing.sm,
      padding: spacing.lg,
      paddingVertical: spacing.xl,
    },
    title: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
    amount: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.xl,
      lineHeight: fontSize.xxl,
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
      paddingVertical: spacing.sm,
      marginTop: spacing.lg,
      width: 100,
    },
    buttonText: {
      color: colors.white100,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.lg,
      textAlign: "center"
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

      <Text style={styles.amount}>
        {isAmountView ? (
          <>&#8377; {numberToInr(amount)}</>
        ) : (
          `${noOfAssets} ${type}`
        )}
      </Text>
      <Text style={styles.noOfAssets}>
        {isAmountView ? (
          `${noOfAssets} ${type}`
        ) : (
          <>&#8377; {numberToInr(amount)}</>
        )}
      </Text>

      <Pressable onPress={() => router.push(navigateTo)} style={styles.button}>
        <Text style={styles.buttonText}>See all</Text>
      </Pressable>
    </View>
  );
};

export default RecordsDisplay;
