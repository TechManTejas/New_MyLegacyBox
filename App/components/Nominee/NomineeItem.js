import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NOMINEE_GENDER_TO_TITLE_MAP } from "../../constants/nominee";
import { useTheme } from "../../theme/ThemeProvider";
import CustomPill from "../Common/Pill/CustomPill";
import NomineeWrapper from "./NomineeWrapper";

const NomineeItem = ({ nominee }) => {
  const { _id, fullName, gender, relationship, phoneNumber, email, address } =
    nominee;

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

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
    semiBold: {
      fontFamily: fontFamily.semiBold,
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
    name: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue400,
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
      textTransform: "capitalize",
    },
    infoHeaderContainer: {
      paddingHorizontal: spacing.md,
      marginBottom: spacing.sm,
      alignSelf: "flex-start",
    },
    type: {
      fontFamily: fontFamily.regular,
      color: colors.blue400,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
      marginBottom: spacing.xs,
    },
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
    <NomineeWrapper relationship={relationship}>
      <View style={styles.infoHeaderContainer}>
        <View style={[styles.row, styles.rowAlignItemsStart]}>
          <Text style={styles.name}>{fullName}</Text>
          <View style={[styles.marginLeftSm, styles.marginBottomXs]}>
            <CustomPill
              label={NOMINEE_GENDER_TO_TITLE_MAP[gender]}
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
          <Text style={[styles.info, styles.semiBold]}>Phone Number </Text>
          <Text style={styles.info}>{phoneNumber}</Text>
        </View>

        <View style={[styles.row, styles.marginBottomXs]}>
          <Text style={[styles.info, styles.semiBold]}>Email </Text>
          <Text style={styles.info}>{email ? email : "Not available"}</Text>
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
    </NomineeWrapper>
  );
};

export default NomineeItem;
