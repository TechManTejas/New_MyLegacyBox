import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useTheme } from "../../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../../constants/screenNames";
import { numberWithCommas } from "../../../utils/manipulators";
import FinancialHoldingItemWrapper from "../FinancialHoldingItemWrapper";
import {
  POSTAL_ACCOUNT_OWNERSHIP_TO_TITLE_MAP,
  POSTAL_ACCOUNT_TYPES_TO_TITLE_MAP,
} from "../../../constants/financialHoldings/postalHolding";

const PostalFinancialHoldingItem = ({ financialHolding }) => {
  const navigation = useNavigation();
  const { _id, parentId, holdingClass, holding, updatedAt } = financialHolding;

  const { accountNumber, accountType, ownership, amount, pranNumber } = holding;

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const pressHandler = () => {
    navigation.navigate(SCREEN_NAMES.updatePostalFinancialHoldingScreen, {
      _id,
      parentId,
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
    accountType: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue400,
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
      paddingLeft: spacing.md,
      paddingRight: spacing.xs,
      marginBottom: spacing.xs,
    },
    ownership: {
      fontFamily: fontFamily.regular,
      color: colors.blue400,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
      marginBottom: spacing.xs,
    },
    amount: {
      paddingHorizontal: spacing.md,
      fontFamily: fontFamily.regular,
    },
    accountNumber: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.black400,
      paddingHorizontal: spacing.md,
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
        <View style={styles.row}>
          <Text style={styles.accountType}>
            {POSTAL_ACCOUNT_TYPES_TO_TITLE_MAP[accountType]}
          </Text>
          <Text style={styles.ownership}>
            ({POSTAL_ACCOUNT_OWNERSHIP_TO_TITLE_MAP[ownership]})
          </Text>
        </View>

        {amount ? (
          <Text style={styles.amount}>Rs. {numberWithCommas(amount)}</Text>
        ) : null}
      </View>
      <Text style={styles.accountNumber}>{accountNumber}</Text>
      {pranNumber ? (
        <Text style={styles.accountNumber}>PRAN : {pranNumber}</Text>
      ) : null}
    </FinancialHoldingItemWrapper>
  );
};

export default PostalFinancialHoldingItem;
