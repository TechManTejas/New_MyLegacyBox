import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import {
  financialHoldingtypeMapper,
  numberWithCommas,
} from "../../utils/financialHolding";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../constants/screenNames";

const FinancialHoldingItem = ({ financialHolding }) => {
  const navigation = useNavigation();
  const {
    _id,
    parentId,
    parentType,
    parentName,
    holdingType,
    classType,
    holdingNumber,
    amount,
    asOnDate,
    updated_at,
  } = financialHolding;

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const pressHandler = () => {
    navigation.navigate(SCREEN_NAMES.updateFinancialHoldingScreen, {
      parentId,
      parentName,
      financialHolding,
    });
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.md,
      borderWidth: spacing.xxxs,
      borderColor: colors.black100,
      borderRadius: spacing.sm,
    },
    pressableContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
    },
    financialHoldingContainer: {
      flex: 1,
      paddingTop: spacing.md,
    },
    financialHoldingType: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue400,
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
      paddingHorizontal: spacing.md,
      marginBottom: spacing.xs,
    },
    financialHoldingFooter: {
      backgroundColor: colors.black700,
      width: 120,
      flexDirection: "row",
      alignSelf: "flex-end",
      justifyContent: "center",
      marginTop: spacing.md,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderTopRightRadius: spacing.sm,
      borderBottomLeftRadius: spacing.sm,
    },
    financialHoldingNumber: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.black400,
      paddingHorizontal: spacing.md,
      marginBottom: spacing.xs,
    },
    financialHoldingClass: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.sm,
      color: colors.white100,
      textTransform: "uppercase",
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "baseline",
      justifyContent: "space-between",
    },
    rowAlignEnd: {
      alignItems: "flex-end",
    },
    financialHoldingAmount: {
      paddingHorizontal: spacing.md,
      // font,
    },
    financialHoldingLastUpdated: {
      paddingHorizontal: spacing.md,
      color: colors.black300,
      marginBottom: spacing.sm,
    },
    iconContaier: {
      paddingBottom: spacing.sm,
      paddingRight: spacing.sm,
    },
    icon: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: spacing.sm,
      backgroundColor: colors.white500,
    },
    iconText: {
      color: colors.blue,
    },
  });

  return (
    <View style={styles.container}>
      <Pressable style={styles.pressableContainer}>
        <View style={styles.financialHoldingContainer}>
          <View style={styles.row}>
            <Text style={styles.financialHoldingType}>
              {financialHoldingtypeMapper[holdingType]}
            </Text>
            {amount ? (
              <Text style={styles.financialHoldingAmount}>
                Rs. {numberWithCommas(amount)}
              </Text>
            ) : null}
          </View>
          <Text style={styles.financialHoldingNumber}>{holdingNumber}</Text>
          {amount ? (
            <Text style={styles.financialHoldingLastUpdated}>
              Last updated on{" "}
              {new Date(asOnDate).toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Text>
          ) : null}
          <View style={[styles.row, styles.rowAlignEnd]}>
            <View style={styles.financialHoldingFooter}>
              <Text style={styles.financialHoldingClass}>{classType}</Text>
            </View>
            <View style={styles.iconContaier}>
              <Pressable style={styles.icon} onPress={pressHandler}>
                <Text style={styles.iconText}>
                  Edit{" "}
                  <FontAwesome5 name="edit" color={styles.iconText.color} />
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default FinancialHoldingItem;
