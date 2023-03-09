import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useTheme } from "../../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../../constants/screenNames";
import { numberWithCommas } from "../../../utils/manipulators";
import FinancialHoldingItemWrapper from "../FinancialHoldingItemWrapper";
import { CASH_TYPE_TO_TITLE_MAP } from "../../../constants/financialHoldings/cashHolding";

const CashFinancialHoldingItem = ({ financialHolding }) => {
  const navigation = useNavigation();
  const { _id, holdingClass, holding, updatedAt } = financialHolding;

  const {
    cashType,
    dateOfTransaction,
    nameOfParty,
    phoneNumberOfParty,
    amount,
    address,
  } = holding;

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const pressHandler = () => {
    navigation.navigate(SCREEN_NAMES.updateCashFinancialHoldingScreen, {
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
          <Text style={styles.name}>{nameOfParty}</Text>
          <Text style={styles.type}>({CASH_TYPE_TO_TITLE_MAP[cashType]})</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={[styles.row, styles.rowBottomMargin]}>
          <Text style={[styles.info, styles.semiBold]}>Phone Number </Text>
          <Text style={styles.info}>{phoneNumberOfParty}</Text>
        </View>

        <View style={[styles.row, styles.rowBottomMargin]}>
          <Text style={[styles.info, styles.semiBold]}>
            Date of Transaction{" "}
          </Text>
          <Text style={styles.info}>
            {new Date(dateOfTransaction).toLocaleDateString("en-us", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
          </Text>
        </View>

        <View style={[styles.row, styles.rowBottomMargin]}>
          <Text style={[styles.info, styles.semiBold]}>Amount </Text>
          <Text style={styles.info}>
            {amount ? `Rs. ${numberWithCommas(amount)}` : "Not available"}
          </Text>
        </View>

        {address ? (
          <View style={styles.addressContainer}>
            <Text style={styles.addressTitle}>Address</Text>
            <Text style={styles.addressContent}>{address.street}</Text>
            <Text style={styles.addressContent}>
              {address.city}, {address.state} - {address.pinCode}
            </Text>
          </View>
        ) : (
          <View style={styles.addressContainer}>
            <Text style={styles.addressTitle}>Address</Text>
            <Text style={styles.addressContent}>Not available</Text>
          </View>
        )}
      </View>
    </FinancialHoldingItemWrapper>
  );
};

export default CashFinancialHoldingItem;
