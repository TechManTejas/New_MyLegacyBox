import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../constants/screenNames";
import FinancialInstitutionWrapper from "../Common/FinancialInstitutionWrapper";

const BankDetail = ({ bank }) => {
  const navigation = useNavigation();

  const { customerId, ifsc, poc, pocNumber, address } = bank;

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const handlePress = () => {
    navigation.navigate(SCREEN_NAMES.updateBankScreen, { bank });
  };

  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "baseline",
      paddingRight: spacing.md,
      justifyContent: "space-between",
    },
    info: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.default,
      lineHeight: fontSize.xl,
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
      marginBottom: spacing.xs,
    },
  });

  return (
    <FinancialInstitutionWrapper address={address} pressHandler={handlePress}>
      <View style={[styles.row]}>
        <Text style={[styles.info, styles.semiBold]}>IFSC </Text>
        <Text style={styles.info}>{ifsc ? ifsc : "Not available"}</Text>
      </View>
      <View style={[styles.row]}>
        <Text style={[styles.info, styles.semiBold]}>Customer ID </Text>
        <Text style={styles.info}>
          {customerId ? customerId : "Not available"}
        </Text>
      </View>
      <View style={[styles.devider, styles.deviderNoBorder]} />

      <View style={[styles.row]}>
        <Text style={[styles.info, styles.semiBold]}>RM</Text>
        <Text style={styles.info}> {poc ? poc : "Not available"}</Text>
      </View>
      <View style={[styles.row]}>
        <Text style={[styles.info, styles.semiBold]}>RM contact</Text>
        <Text style={styles.info}>
          {pocNumber ? pocNumber : "Not available"}
        </Text>
      </View>
    </FinancialInstitutionWrapper>
  );
};

export default BankDetail;
