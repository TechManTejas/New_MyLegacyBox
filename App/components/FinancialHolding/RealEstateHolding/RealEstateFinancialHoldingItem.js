import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../../constants/screenNames";
import FinancialHoldingItemWrapper from "../FinancialHoldingItemWrapper";
import {
  REAL_ESTATE_OWNERSHIP_STATUS_TO_TITLE_MAP,
  REAL_ESTATE_PROPERTY_AREA_UNIT_TO_TITLE_MAP,
} from "../../../constants/financialHoldings/realEstateHolding";

const RealEstateFinancialHoldingItem = ({ financialHolding }) => {
  const navigation = useNavigation();
  const { _id, holdingClass, holding, updatedAt } = financialHolding;

  const {
    ownershipStatus,
    propertyArea,
    propertyAreaUnit,
    ownershipPercentage,
    address,
  } = holding;

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const pressHandler = () => {
    navigation.navigate(SCREEN_NAMES.updateRealEstateFinancialHoldingScreen, {
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
          <Text style={styles.name}>
            {REAL_ESTATE_OWNERSHIP_STATUS_TO_TITLE_MAP[ownershipStatus]}
          </Text>
          <Text style={styles.type}>({ownershipPercentage} %)</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={[styles.row, styles.rowBottomMargin]}>
          <Text style={[styles.info, styles.semiBold]}>Area </Text>
          <Text style={styles.info}>
            {propertyArea
              ? `${propertyArea}${
                  propertyAreaUnit
                    ? " " +
                      REAL_ESTATE_PROPERTY_AREA_UNIT_TO_TITLE_MAP[
                        propertyAreaUnit
                      ]
                    : ""
                }`
              : "Not available"}
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

export default RealEstateFinancialHoldingItem;
