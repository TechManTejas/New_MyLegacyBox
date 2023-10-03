import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { FontAwesome } from "@expo/vector-icons";
import CustomDropDownInput from "./CustomDropDownInput";
import { NOMINEE_RELATIONSHIP_TO_TITLE_MAP } from "../../constants/nominee";

const WillNomineeModalGuardianCard = ({
  callBack,
  item,
  isApproved,
  nominees,
}) => {
  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    icon: {
      fontSize: fontSize.xl,
      color: colors.green600,
    },
    modalCardContainer: {
      marginTop: spacing.sm,
      marginHorizontal: spacing.sm,
      backgroundColor: "white",
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black200,
      borderRadius: spacing.sm,
      padding: spacing.md,
    },
    modalcard: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modalcard2: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    modal2Container: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black200,
      borderRadius: spacing.sm,
      padding: spacing.md,
      marginTop: spacing.sm,
      marginHorizontal: spacing.sm,
      backgroundColor: colors.black100,
    },
    nomineename: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.lg,
      lineHeight: spacing.xl,
      color: colors.black400,
    },
    nomineerelationship: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.regular,
      color: colors.black300,
    },
    approvednominee: {
      borderColor: colors.green600,
      backgroundColor: colors.green100,
    },
    approvedtextcolor: {
      color: colors.green700,
    },
    buttom: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.blue500,
      borderRadius: 5,
      paddingVertical: 2,
      paddingHorizontal: spacing.sm,
    },
    buttomText: {
      color: colors.white,
      paddingRight: 10,
      paddingTop: 2,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.md,
    },
    disabledText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.red600,
      paddingTop: spacing.md,
    },
  });

  return (
    <View
      style={[styles.modalCardContainer, isApproved && styles.approvednominee]}
    >
      <View style={[styles.modalcard]}>
        <Text style={styles.nomineename}>{item.fullName}</Text>
        {isApproved ? (
          <FontAwesome
            name="check-circle"
            size={styles.icon.fontSize}
            color={styles.icon.color}
          />
        ) : null}
      </View>
      <CustomDropDownInput
        placeholder="Select guardian"
        data={nominees
          .filter((nominee) => nominee.age >= 18)
          .map((nominee) => ({
            label: nominee.fullName,
            value: nominee._id,
          }))}
        value={item.guardian?._id}
        onChange={callBack}
        showSelectedIcon
        backgroundColor={colors.white100}
      />
    </View>
  );
};

export default WillNomineeModalGuardianCard;
