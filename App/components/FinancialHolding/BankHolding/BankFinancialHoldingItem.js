import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useTheme } from "../../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../../constants/screenNames";
import { numberWithCommas } from "../../../utils/manipulators";
import FinancialHoldingItemWrapper from "../FinancialHoldingItemWrapper";
import {
  BANK_ACCOUNT_OWNERSHIP_TO_TITLE_MAP,
  BANK_ACCOUNT_TYPES_TO_TITLE_MAP,
} from "../../../constants/financialHoldings/bankHolding";
import CustomPill from "../../Common/Pill/CustomPill";

const BankFinancialHoldingItem = ({ financialHolding }) => {
  const navigation = useNavigation();
  const { _id, parentId, holdingClass, holding, updatedAt } = financialHolding;

  const { accountNumber, accountType, ownership, amount, pranNumber } = holding;

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const pressHandler = () => {
    navigation.navigate(SCREEN_NAMES.updateBankFinancialHoldingScreen, {
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
    rowAlignItemsStart: {
      alignItems: "flex-start",
    },
    marginBottomXs: {
      marginBottom: spacing.xs,
    },
    marginTopXxs: {
      marginTop: spacing.xxs,
    },
    marginLeftSm: {
      marginLeft: spacing.sm,
    },
    paddingVerticalXxs: {
      paddingVertical: spacing.xxs,
    },
    name: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue400,
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
    },
    infoHeaderContainer: {
      paddingHorizontal: spacing.md,
      marginBottom: spacing.sm,
      alignSelf: "flex-start",
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
        <View style={styles.infoHeaderContainer}>
          <View style={[styles.row, styles.rowAlignItemsStart]}>
            <Text style={[styles.name]}>
              {BANK_ACCOUNT_TYPES_TO_TITLE_MAP[accountType]}
            </Text>
            <View style={[styles.marginLeftSm, styles.marginBottomXs]}>
              <CustomPill
                label={BANK_ACCOUNT_OWNERSHIP_TO_TITLE_MAP[ownership]}
                color={colors.white100}
                backgroundColor={colors.blue400}
                containerStyle={styles.paddingVerticalXxs}
                size="sm"
                labelBold
              />
            </View>
          </View>
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

export default BankFinancialHoldingItem;
