import React from "react";
import { Text, StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../constants/screenNames";
import FinancialInstitutionWrapper from "../Common/FinancialInstitutionWrapper";

const InsuranceDetail = ({ insurance }) => {
  const navigation = useNavigation();

  const { customerId, ifsc, poc, pocNumber, address } = insurance;

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const handlePress = () => {
    navigation.navigate(SCREEN_NAMES.updateinsuranceScreen, { insurance });
  };

  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "baseline",
      paddingRight: spacing.md,
    },
    info: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.default,
      lineHeight: fontSize.xl,
    },
  });

  return (
    <FinancialInstitutionWrapper address={address} pressHandler={handlePress}>
      <Text style={styles.info}>IFSC : {ifsc ? ifsc : "Not available"}</Text>
      <Text style={styles.info}>
        Customer Id : {customerId ? customerId : "Not available"}
      </Text>
      <Text style={styles.info}>RM : {poc ? poc : "Not available"}</Text>
      <Text style={styles.info}>
        RM contact : {pocNumber ? pocNumber : "Not available"}
      </Text>
    </FinancialInstitutionWrapper>
  );
};

export default InsuranceDetail;
