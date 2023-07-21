import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { FontAwesome } from "@expo/vector-icons";
import { NOMINEE_RELATIONSHIP_TO_TITLE_MAP } from "../../constants/nominee";
import { FontAwesome5 } from "@expo/vector-icons";
import { SCREEN_NAMES } from "../../constants/screenNames";
import { useNavigation } from "@react-navigation/native";

const WillNomeineeModalCard = ({
  callBack,
  item,
  isApproved,
  disableCallback,
  nomineesType,
}) => {
  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const navigation = useNavigation();

  const styles = StyleSheet.create({
    icon: {
      fontSize: fontSize.xl,
      color: colors.green600,
    },
    modalcard: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black200,
      borderRadius: spacing.sm,
      padding: spacing.md,
      marginTop: spacing.sm,
      marginHorizontal: spacing.sm,
      backgroundColor: disableCallback ? colors.black100 : "white",
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
    missingText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.red600,
      paddingTop: spacing.md,
    },
  });

  const propertyChecks = {
    beneficiaries: item.hasOwnProperty("age"),
    witnesses:
      item.hasOwnProperty("aadharNumber") &&
      item.hasOwnProperty("fathersName") &&
      item.hasOwnProperty("address"),
    executors:
      item.hasOwnProperty("fathersName") && item.hasOwnProperty("address"),
  };

  return propertyChecks[nomineesType] ? (
    <Pressable
      disabled={disableCallback}
      onPress={callBack}
      style={[styles.modalcard, isApproved && styles.approvednominee]}
    >
      <View>
        <Text
          style={[styles.nomineename, isApproved && styles.approvedtextcolor]}
        >
          {item.fullName}
        </Text>
        <Text
          style={[
            styles.nomineerelationship,
            isApproved && styles.approvedtextcolor,
          ]}
        >
          {NOMINEE_RELATIONSHIP_TO_TITLE_MAP[item.relationship]}
        </Text>
      </View>
      <FontAwesome
        name={isApproved ? "check-circle" : "circle-o"}
        size={styles.icon.fontSize}
        color={isApproved ? styles.icon.color : colors.black300}
      />
    </Pressable>
  ) : (
    <View style={styles.modal2Container}>
      <View style={styles.modalcard2}>
        <View>
          <Text style={styles.nomineename}>{item.fullName}</Text>
          <Text style={styles.nomineerelationship}>
            {NOMINEE_RELATIONSHIP_TO_TITLE_MAP[item.relationship]}
          </Text>
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate(SCREEN_NAMES.willUpdateNomineeScreen, {
              nominee: item,
            })
          }
          style={styles.buttom}
        >
          <Text style={styles.buttomText}>Edit</Text>
          <FontAwesome5 name="pen" size={10} color="white" />
        </Pressable>
      </View>
      <Text style={styles.missingText}>
        Some required fields are missing, click on edit to add
      </Text>
    </View>
  );
};

export default WillNomeineeModalCard;
