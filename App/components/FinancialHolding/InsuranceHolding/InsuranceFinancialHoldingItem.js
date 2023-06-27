import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../../constants/screenNames";
import { numberWithCommas } from "../../../utils/manipulators";
import FinancialHoldingItemWrapper from "../FinancialHoldingItemWrapper";
import {
  POLICY_BENEFICIERY_TO_TITLE_MAP,
  POLICY_PREMIUM_FREQUENCY_TO_TITLE_MAP,
  POLICY_TYPE_TO_TITLE_MAP,
} from "../../../constants/financialHoldings/insuranceHolding";
import CustomPill from "../../Common/Pill/CustomPill";
import { FontAwesome5 } from '@expo/vector-icons';

const InsuranceFinancialHoldingItem = ({ financialHolding }) => {

  const navigation = useNavigation();
  const { _id, parentId, holdingClass, holding, updatedAt } = financialHolding;

  const {
    policyName,
    policyNumber,
    policyType,
    premiumFrequency,
    beneficiary,
    homeBranch,
    policyAmount,
    premiumAmount,
    dateOfPremium,
    dateOfMaturity,
  } = holding;

  const { theme: { colors, fontFamily, fontSize, spacing } } = useTheme();

  const pressHandler = () => {
    navigation.navigate(SCREEN_NAMES.updateInsuranceFinancialHoldingScreen, { _id, parentId, financialHolding });
  };

  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "baseline",
      justifyContent: "space-between",
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
      paddingTop: 10,
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.sm
    },
    semiBold: {
      fontFamily: fontFamily.semiBold,
    },
    devider: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      // borderStyle: "dashed",
      borderColor: colors.black200,
      marginVertical: spacing.md,
      marginHorizontal: spacing.md
    },
    name: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue500,
      fontSize: fontSize.xl,
      lineHeight: fontSize.xxl,
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
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between"
    },
    info: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.black400,
      paddingHorizontal: spacing.md,
      marginBottom: spacing.xs,
    },
    amount: {
      paddingHorizontal: spacing.md,
      fontFamily: fontFamily.regular,
    },
    accountNumber: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.black400,
      paddingHorizontal: spacing.md,
      marginBottom: spacing.xs,
    },
    financialHoldingLastUpdated: {
      paddingHorizontal: spacing.md,
      marginBottom: spacing.sm,
      color: colors.black300,
      fontSize: fontSize.md,
      lineHeight: fontSize.default
    }
  });

  return (
    <FinancialHoldingItemWrapper holdingClass={holdingClass}>

      <View style={styles.infoHeaderContainer}>

        <Text style={styles.name}>{policyName || "Policy"}</Text>

        <Pressable onPress={pressHandler} style={{ flexDirection: "row", alignItems: "center", backgroundColor: colors.blue500, borderRadius: 5, paddingVertical: 2, paddingHorizontal: spacing.sm }}>
          <Text style={{ color: colors.white, paddingRight: 10, paddingTop: 2, fontFamily: fontFamily.semiBold, fontSize: fontSize.md }}>Edit</Text>
          <FontAwesome5 name="pen" size={10} color="white" />
        </Pressable>

      </View>

      <Text style={styles.financialHoldingLastUpdated}>
        Last updated on {" "}
        {new Date(updatedAt).toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </Text>

      <View style={[styles.marginLeftSm, styles.marginBottomXs, { alignItems: "flex-start" }]}>
        <CustomPill
          label={POLICY_TYPE_TO_TITLE_MAP[policyType]}
          color={colors.white100}
          backgroundColor={colors.blue500}
          containerStyle={styles.paddingVerticalXxs}
          size="sm"
          labelBold
        />
      </View>

      <View style={styles.devider} />

      <View>
        <View style={[styles.row, styles.marginBottomXs]}>
          <Text style={[styles.info, styles.semiBold]}>Home Branch </Text>
          <Text style={styles.info}>{homeBranch || "Not available"}</Text>
        </View>

        <View style={[styles.row, styles.marginBottomXs]}>
          <Text style={[styles.info, styles.semiBold]}>Policy Number </Text>
          <Text style={styles.info}>{policyNumber}</Text>
        </View>

        <View style={[styles.row, styles.marginBottomXs]}>
          <Text style={[styles.info, styles.semiBold]}>Beneficiary </Text>
          <Text style={styles.info}>{POLICY_BENEFICIERY_TO_TITLE_MAP[beneficiary]}</Text>
        </View>

        <View style={[styles.row, styles.marginBottomXs]}>
          <Text style={[styles.info, styles.semiBold]}>Policy Amount </Text>
          <Text style={styles.info}>{`Rs. ${numberWithCommas(policyAmount)}` || "Not available"}</Text>
        </View>

        <View style={[styles.row, styles.marginBottomXs]}>
          <Text style={[styles.info, styles.semiBold]}>Date of Maturity </Text>
          <Text style={styles.info}>
            {new Date(dateOfMaturity).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "2-digit" })}
          </Text>
        </View>

        <View style={[styles.row, styles.marginBottomXs]}>
          <Text style={[styles.info, styles.semiBold]}>Premium Amount </Text>
          <Text style={styles.info}>{policyAmount ? `Rs. ${numberWithCommas(premiumAmount)}` : "Not available"}</Text>
        </View>

        <View style={[styles.row, styles.marginBottomXs]}>
          <Text style={[styles.info, styles.semiBold]}>Date of Premium </Text>
          <Text style={styles.info}>
            {new Date(dateOfPremium).toLocaleDateString("en-us", { month: "long", day: "2-digit" })}
          </Text>
        </View>

        <View style={[styles.row, styles.marginBottomXs]}>
          <Text style={[styles.info, styles.semiBold]}>Premium Frequency </Text>
          <Text style={styles.info}>{POLICY_PREMIUM_FREQUENCY_TO_TITLE_MAP[premiumFrequency]}</Text>
        </View>
      </View>

    </FinancialHoldingItemWrapper>
  );
};

export default InsuranceFinancialHoldingItem;
