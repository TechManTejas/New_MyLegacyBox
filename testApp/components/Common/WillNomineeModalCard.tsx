import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { FontAwesome } from "@expo/vector-icons";
import { NOMINEE_RELATIONSHIP_TO_TITLE_MAP } from "../../constants/nominee";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";

const WillNomeineeModalCard = ({
  callBack,
  item,
  isApproved,
  disableCallback,
  nomineesType,
  usedNominees,
}) => {
  const [disableNominee, setDisableNominee] = useState({
    result: false,
    type: undefined,
  });

  useEffect(() => {
    const res = usedNominees?.find((nominee) => nominee._id === item._id);
    if (res) setDisableNominee({ result: true, type: res.type });
  }, [usedNominees]);

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const router = useRouter();

  const styles = StyleSheet.create({
    icon: {
      fontSize: fontSize.xl,
      color: colors.green600,
    },
    modalCardContainer: {
      marginTop: spacing.sm,
      marginHorizontal: spacing.sm,
      backgroundColor:
        disableCallback || disableNominee.result ? colors.black100 : "white",
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

  const propertyChecks = {
    beneficiaries: item.hasOwnProperty("age"),
    witnesses:
      item.hasOwnProperty("aadharNumber") &&
      item.hasOwnProperty("fathersName") &&
      item.hasOwnProperty("address") &&
      item.hasOwnProperty("age") &&
      item.age >= 18,
    executors:
      item.hasOwnProperty("fathersName") &&
      item.hasOwnProperty("address") &&
      item.hasOwnProperty("age") &&
      item.age >= 18,
  };

  const nomineeUsedMessagesMap = {
    beneficiaries: "Assigned as a beneficiary",
    witnesses: "Assigned as a witness",
    executors: "Assigned as a executor",
  };

  return propertyChecks[nomineesType] || disableNominee.type !== undefined ? (
    <Pressable
      style={[styles.modalCardContainer, isApproved && styles.approvednominee]}
      disabled={disableCallback || disableNominee.result}
      onPress={callBack}
    >
      <View style={[styles.modalcard]}>
        <View>
          <Text style={styles.nomineename}>{item.fullName}</Text>
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
      </View>
      {disableNominee.result && (
        <Text style={styles.disabledText}>
          {nomineeUsedMessagesMap[disableNominee.type]}
        </Text>
      )}
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
            router.push({
              pathname: "/members/updateNominee",
              params: {
                nominee: item,
              },
            })
          }
          style={styles.buttom}
        >
          <Text style={styles.buttomText}>Edit</Text>
          <FontAwesome5 name="pen" size={10} color="white" />
        </Pressable>
      </View>
      <Text style={styles.disabledText}>
        Some required fields are missing, click on edit to add
      </Text>
    </View>
  );
};

export default WillNomeineeModalCard;
