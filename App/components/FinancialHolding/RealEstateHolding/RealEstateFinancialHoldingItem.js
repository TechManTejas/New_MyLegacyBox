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
import CustomPill from "../../Common/Pill/CustomPill";

const RealEstateFinancialHoldingItem = ({ financialHolding }) => {
  const navigation = useNavigation();
  const { _id, holdingClass, holding, updatedAt } = financialHolding;

  const {
    ownershipStatus,
    propertyArea,
    propertyName,
    propertyAreaUnit,
    propertyValue,
    dateOfPurchase,
    ownershipPercentage,
    description,
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
    subsectionContainer: {
      paddingHorizontal: spacing.md,
    },
    subsectionContent: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      marginBottom: spacing.xs,
    },
    subsectionTitle: {
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
      <View style={styles.infoHeaderContainer}>
        <View style={[styles.row, styles.rowAlignItemsStart]}>
          <Text style={[styles.name]}>{propertyName}</Text>
          <View style={[styles.marginLeftSm, styles.marginBottomXs]}>
            <CustomPill
              label={REAL_ESTATE_OWNERSHIP_STATUS_TO_TITLE_MAP[ownershipStatus]}
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
          <Text style={[styles.info, styles.semiBold]}>Ownership share</Text>
          <Text style={styles.info}>{`${ownershipPercentage} %`}</Text>
        </View>
        <View style={[styles.row, styles.marginBottomXs]}>
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

        <View style={[styles.row, styles.marginBottomXs]}>
          <Text style={[styles.info, styles.semiBold]}>Property Value </Text>
          <Text style={styles.info}>
            {propertyValue ? `Rs. ${propertyValue}` : "Not available"}
          </Text>
        </View>

        <View style={[styles.row, styles.marginBottomXs]}>
          <Text style={[styles.info, styles.semiBold]}>Date of Purchase </Text>
          <Text style={styles.info}>
            {dateOfPurchase
              ? new Date(dateOfPurchase).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })
              : "Not available"}
          </Text>
        </View>

        <View style={[styles.devider, styles.deviderNoBorder]} />

        {address ? (
          <View style={styles.subsectionContainer}>
            <Text style={styles.subsectionTitle}>Address</Text>
            <Text style={styles.subsectionContent}>{address.street}</Text>
            <Text style={styles.subsectionContent}>
              {address.city}, {address.state} - {address.pinCode}
            </Text>
          </View>
        ) : (
          <View style={styles.subsectionContainer}>
            <Text style={styles.subsectionTitle}>Address</Text>
            <Text style={styles.subsectionContent}>Not available</Text>
          </View>
        )}

        <View style={[styles.devider, styles.deviderNoBorder]} />

        <View style={styles.subsectionContainer}>
          <Text style={styles.subsectionTitle}>Description</Text>
          <Text style={styles.subsectionContent}>
            {description ? description : "Not available"}
          </Text>
        </View>
      </View>
    </FinancialHoldingItemWrapper>
  );
};

export default RealEstateFinancialHoldingItem;
