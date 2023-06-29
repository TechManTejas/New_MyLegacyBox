import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

const FinancialHoldingItemWrapper = ({ children, holdingClass, nomineeScreen }) => {

  const { theme: { colors, fontFamily, fontSize, spacing } } = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black300,
      borderRadius: spacing.xs,
    },
    financialHoldingContainer: {
      flex: 1,
      paddingTop: spacing.md,
    },
    childContainer: {
      flex: 1,
    },
    financialHoldingClassContainer: {
      backgroundColor: colors.black700,
      width: 80,
      height: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderTopRightRadius: spacing.xs,
      borderBottomLeftRadius: spacing.xs,
    },
    financialHoldingClass: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.sm,
      lineHeight: fontSize.lg,
      color: colors.white100,
      textTransform: "uppercase",
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "stretch",
      justifyContent: "space-between",
    },
    rowAlignEnd: {
      alignItems: "flex-end",
    },
    backgroundColorGreen: {
      backgroundColor: colors.green600,
    },
    backgroundColorRed: {
      backgroundColor: colors.red600,
    },
    backgroundColorGrey: {
      backgroundColor: colors.black400,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.financialHoldingContainer}>

        <View style={styles.childContainer}>{children}</View>

        <View style={[styles.row, styles.rowAlignEnd]}>
          <View
            style={[
              styles.financialHoldingClassContainer,
              nomineeScreen? 
              (holdingClass==="Other"? styles.backgroundColorGrey: styles.backgroundColorGreen) :
              (holdingClass==="ASSET"? styles.backgroundColorGreen: styles.backgroundColorRed),
              holdingClass==="CA / Lawyer / Advisor" && { width: 150 }
            ]}
          >
            <Text style={styles.financialHoldingClass}>{holdingClass}</Text>
          </View>

        </View>
      </View>
    </View>
  );
};

export default FinancialHoldingItemWrapper;
