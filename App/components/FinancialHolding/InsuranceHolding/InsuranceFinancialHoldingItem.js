import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../../constants/screenNames";
import { numberWithCommas } from "../../../utils/manipulators";
import FinancialHoldingItemWrapper from "../FinancialHoldingItemWrapper";
import {
  POLICY_BENEFICIERY_TO_TITLE_MAP,
  POLICY_PREMIUM_FREQUENCY_TO_TITLE_MAP,
  POLICY_TYPE_TO_TITLE_MAP,
} from "../../../constants/financialHoldings/insuranceHolding";
import CustomPill from "../../Common/Pill/CustomPill";

const InsuranceFinancialHoldingItem = ({ financialHolding }) => {
  const navigation = useNavigation();
  const { _id, parentId, holdingClass, holding, updatedAt } = financialHolding;

  const {
    policyName,
    policyNumber,
    policyType,
    premiumFrequency,
    beneficiary,
    policyAmount,
    premiumAmount,
    dateOfPremium,
    dateOfMaturity,
  } = holding;

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const pressHandler = () => {
    navigation.navigate(SCREEN_NAMES.updateInsuranceFinancialHoldingScreen, {
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
    semiBold: {
      fontFamily: fontFamily.semiBold,
    },
    devider: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black200,
      marginBottom: spacing.sm,
    },
    deviderNoBorder: {
      borderBottomWidth: 0,
    },
    name: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue400,
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
      textTransform: "capitalize",
    },
    type: {
      fontFamily: fontFamily.regular,
      color: colors.blue400,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
      marginBottom: spacing.xs,
    },
    infoHeaderContainer: {
      paddingHorizontal: spacing.md,
      marginBottom: spacing.sm,
      alignSelf: "flex-start",
    },
    info: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.black400,
      paddingHorizontal: spacing.md,
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
      <View style={styles.infoHeaderContainer}>
        <View style={[styles.row, styles.rowAlignItemsStart]}>
          <Text style={[styles.name]}>
            {policyName ? policyName : "Policy"}
          </Text>
          <View style={[styles.marginLeftSm, styles.marginBottomXs]}>
            <CustomPill
              label={POLICY_TYPE_TO_TITLE_MAP[policyType]}
              color={colors.white100}
              backgroundColor={colors.blue400}
              containerStyle={styles.paddingVerticalXxs}
              size="sm"
              labelBold
            />
          </View>
        </View>
      </View>

      <View>
        <View style={[styles.row, styles.marginBottomXs]}>
          <Text style={[styles.info, styles.semiBold]}>Policy Number </Text>
          <Text style={styles.info}>{policyNumber}</Text>
        </View>

        <View style={[styles.row, styles.marginBottomXs]}>
          <Text style={[styles.info, styles.semiBold]}>Beneficiary </Text>
          <Text style={styles.info}>
            {POLICY_BENEFICIERY_TO_TITLE_MAP[beneficiary]}
          </Text>
        </View>

        <View style={[styles.devider, styles.deviderNoBorder]} />

        <View style={[styles.row, styles.marginBottomXs]}>
          <Text style={[styles.info, styles.semiBold]}>Policy Amount </Text>
          <Text style={styles.info}>
            {policyAmount
              ? `Rs. ${numberWithCommas(policyAmount)}`
              : "Not available"}
          </Text>
        </View>
        <View style={[styles.row, styles.marginBottomXs]}>
          <Text style={[styles.info, styles.semiBold]}>Date of Maturity </Text>
          <Text style={styles.info}>
            {new Date(dateOfMaturity).toLocaleDateString("en-us", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
          </Text>
        </View>

        <View style={[styles.devider, styles.deviderNoBorder]} />

        <View style={[styles.row, styles.marginBottomXs]}>
          <Text style={[styles.info, styles.semiBold]}>Premium Amount </Text>
          <Text style={styles.info}>
            {policyAmount
              ? `Rs. ${numberWithCommas(premiumAmount)}`
              : "Not available"}
          </Text>
        </View>
        <View style={[styles.row, styles.marginBottomXs]}>
          <Text style={[styles.info, styles.semiBold]}>Date of Premium </Text>
          <Text style={styles.info}>
            {new Date(dateOfPremium).toLocaleDateString("en-us", {
              month: "long",
              day: "2-digit",
            })}
          </Text>
        </View>

        <View style={[styles.row, styles.marginBottomXs]}>
          <Text style={[styles.info, styles.semiBold]}>Premium Frequency </Text>
          <Text style={styles.info}>
            {POLICY_PREMIUM_FREQUENCY_TO_TITLE_MAP[premiumFrequency]}
          </Text>
        </View>
      </View>
    </FinancialHoldingItemWrapper>
  );
};

export default InsuranceFinancialHoldingItem;
