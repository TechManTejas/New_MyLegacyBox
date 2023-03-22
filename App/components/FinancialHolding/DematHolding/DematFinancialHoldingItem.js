import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../../constants/screenNames";
import { numberWithCommas } from "../../../utils/manipulators";
import FinancialHoldingItemWrapper from "../FinancialHoldingItemWrapper";

const DematFinancialHoldingItem = ({ financialHolding }) => {
  const navigation = useNavigation();
  const { _id, holdingClass, holding, updatedAt } = financialHolding;

  const { broker, customerId, poc, pocNumber, investedAmount } = holding;

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const pressHandler = () => {
    navigation.navigate(SCREEN_NAMES.updateDematFinancialHoldingScreen, {
      _id,
      financialHolding,
    });
  };

  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "baseline",
      justifyContent: "space-between",
    },
    rowBottomMargin: {
      marginBottom: spacing.xs,
    },
    semiBold: {
      fontFamily: fontFamily.semiBold,
    },
    name: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue400,
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
      paddingLeft: spacing.md,
      paddingRight: spacing.xs,
      marginBottom: spacing.xs,
    },
    type: {
      fontFamily: fontFamily.regular,
      color: colors.blue400,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
      marginBottom: spacing.xs,
    },
    infoContainer: {},
    info: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.black400,
      paddingHorizontal: spacing.md,
      marginBottom: spacing.xs,
    },
    addressContainer: {
      paddingHorizontal: spacing.md,
    },
    addressContent: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      marginBottom: spacing.xs,
    },
    addressTitle: {
      color: colors.black400,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      marginBottom: spacing.xs,
    },
  });

  return (
    <FinancialHoldingItemWrapper
      updatedAt={updatedAt}
      holdingClass={holdingClass}
      pressHandler={pressHandler}
    >
      <View style={styles.row}>
        <View style={[styles.row, styles.rowBottomMargin]}>
          <Text style={styles.name}>{broker}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={[styles.row, styles.rowBottomMargin]}>
          <Text style={[styles.info, styles.semiBold]}>Customer ID </Text>
          <Text style={styles.info}>{customerId}</Text>
        </View>

        <View style={[styles.row, styles.rowBottomMargin]}>
          <Text style={[styles.info, styles.semiBold]}>RM </Text>
          <Text style={styles.info}>{poc ? poc : "Not available"}</Text>
        </View>

        <View style={[styles.row, styles.rowBottomMargin]}>
          <Text style={[styles.info, styles.semiBold]}>RM contact </Text>
          <Text style={styles.info}>
            {pocNumber ? pocNumber : "Not available"}
          </Text>
        </View>

        <View style={[styles.row, styles.rowBottomMargin]}>
          <Text style={[styles.info, styles.semiBold]}>Invested Amount </Text>
          <Text style={styles.info}>
            {investedAmount
              ? `Rs. ${numberWithCommas(investedAmount)}`
              : "Not available"}
          </Text>
        </View>
      </View>
    </FinancialHoldingItemWrapper>
  );
};

export default DematFinancialHoldingItem;
