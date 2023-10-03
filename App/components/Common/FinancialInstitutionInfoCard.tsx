import { Text, StyleSheet, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import FinancialInstitutionWrapper from "./FinancialInstitutionWrapper";
import React from "react";

const FinancialInstitutionInfoCard = ({
  institute,
  instituteTitle,
  updateScreenName,
  type,
}) => {
  const navigation = useNavigation();

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const handlePress = () => {
    navigation.navigate(updateScreenName, { [type]: institute });
  };

  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-start",
      paddingRight: spacing.md,
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
      borderBottomWidth: spacing.xxxs,
      borderColor: colors.black100,
      marginVertical: spacing.sm,
      borderStyle: "dashed",
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
      color: colors.black300,
      marginBottom: spacing.xs,
    },
    widthkey: {
      width: "50%",
    },
    widthvalue: {
      width: "50%",
    },
    textAlignRight: {
      textAlign: "right",
    },
  });

  return (
    <FinancialInstitutionWrapper
      title={instituteTitle}
      address={institute.address}
      pressHandler={handlePress}
    >
      {type !== "insurance" ? (
        <View style={[styles.row]}>
          <Text style={[styles.info, styles.semiBold, styles.widthkey]}>
            IFSC{" "}
          </Text>
          <Text style={[styles.info, styles.widthvalue, styles.textAlignRight]}>
            {institute.ifsc || "Not available"}
          </Text>
        </View>
      ) : null}
      <View style={[styles.row]}>
        <Text style={[styles.info, styles.semiBold, styles.widthkey]}>
          Customer ID{" "}
        </Text>
        <Text style={[styles.info, styles.widthvalue, styles.textAlignRight]}>
          {institute.customerId || "Not available"}
        </Text>
      </View>

      <View style={[styles.devider]} />

      <View style={[styles.row]}>
        <Text style={[styles.info, styles.semiBold, styles.widthkey]}>
          Relationship Manager
        </Text>
        <Text style={[styles.info, styles.widthvalue, styles.textAlignRight]}>
          {" "}
          {institute.poc || "Not available"}
        </Text>
      </View>
      <View style={[styles.row]}>
        <Text style={[styles.info, styles.semiBold, styles.widthkey]}>
          Relationship Manager's Contact
        </Text>
        <Text style={[styles.info, styles.widthvalue, styles.textAlignRight]}>
          {institute.pocNumber || "Not available"}
        </Text>
      </View>
    </FinancialInstitutionWrapper>
  );
};

export default FinancialInstitutionInfoCard;
