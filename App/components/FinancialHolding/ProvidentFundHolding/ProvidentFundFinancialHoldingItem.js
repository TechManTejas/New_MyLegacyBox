import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../../constants/screenNames";
import { numberWithCommas } from "../../../utils/manipulators";
import FinancialHoldingItemWrapper from "../FinancialHoldingItemWrapper";
import { PROVIDENT_FUND_TYPE_TO_TITLE_MAP } from "../../../constants/financialHoldings/providentFundHolding";
import CustomPill from "../../Common/Pill/CustomPill";

const ProvidentFundFinancialHoldingItem = ({ financialHolding }) => {
  const navigation = useNavigation();
  const { _id, holdingClass, holding, updatedAt } = financialHolding;

  const { pfType, uan, employerName, amount } = holding;

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const pressHandler = () => {
    navigation.navigate(
      SCREEN_NAMES.updateProvidentFundFinancialHoldingScreen,
      {
        _id,
        financialHolding,
      }
    );
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
  });

  return (
    <FinancialHoldingItemWrapper
      updatedAt={updatedAt}
      holdingClass={holdingClass}
      pressHandler={pressHandler}
    >
      <View style={styles.infoHeaderContainer}>
        <View style={[styles.row, styles.rowAlignItemsStart]}>
          <Text style={[styles.name]}>{employerName}</Text>
          <View style={[styles.marginLeftSm, styles.marginBottomXs]}>
            <CustomPill
              label={PROVIDENT_FUND_TYPE_TO_TITLE_MAP[pfType]}
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
        <View style={[styles.row, styles.rowBottomMargin]}>
          <Text style={[styles.info, styles.semiBold]}>UAN </Text>
          <Text style={styles.info}>{uan}</Text>
        </View>

        <View style={[styles.row, styles.rowBottomMargin]}>
          <Text style={[styles.info, styles.semiBold]}>Amount </Text>
          <Text style={styles.info}>
            {amount ? `Rs. ${numberWithCommas(amount)}` : "Not available"}
          </Text>
        </View>
      </View>
    </FinancialHoldingItemWrapper>
  );
};

export default ProvidentFundFinancialHoldingItem;
