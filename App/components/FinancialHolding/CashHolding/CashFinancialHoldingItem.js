import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../../constants/screenNames";
import { numberWithCommas } from "../../../utils/manipulators";
import FinancialHoldingItemWrapper from "../FinancialHoldingItemWrapper";
import { CASH_TYPE_TO_TITLE_MAP } from "../../../constants/financialHoldings/cashHolding";
import CustomPill from "../../Common/Pill/CustomPill";

const CashFinancialHoldingItem = ({ financialHolding }) => {

  const navigation = useNavigation();

  const { _id, holdingClass, holding, updatedAt } = financialHolding;

  const { cashType, dateOfTransaction, nameOfParty, phoneNumberOfParty, amount, address } = holding;

  const { theme: { colors, fontFamily, fontSize, spacing } } = useTheme();

  const pressHandler = () => {
    navigation.navigate(SCREEN_NAMES.updateCashFinancialHoldingScreen, { _id, financialHolding });
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
      textTransform: 'capitalize'
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
    <FinancialHoldingItemWrapper updatedAt={updatedAt} holdingClass={holdingClass} pressHandler={pressHandler}>
      <View style={styles.infoHeaderContainer}>
        <View style={[styles.row, styles.rowAlignItemsStart]}>
          <Text style={[styles.name]}>{nameOfParty}</Text>
          <View style={[styles.marginLeftSm, styles.marginBottomXs]}>
            <CustomPill
              label={CASH_TYPE_TO_TITLE_MAP[cashType]}
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
          <Text style={styles.info}>{phoneNumberOfParty}</Text>
        </View>

        <View style={[styles.row, styles.marginBottomXs]}>
          <Text style={[styles.info, styles.semiBold]}>Date of Transaction{" "}</Text>
          <Text style={styles.info}>{new Date(dateOfTransaction).toDateString().replace(/^\w+ /, '')}</Text>
        </View>

        <View style={[styles.row, styles.marginBottomXs]}>
          <Text style={[styles.info, styles.semiBold]}>Amount </Text>
          <Text style={styles.info}>{amount ? `Rs. ${numberWithCommas(amount)}` : "Not available"}</Text>
        </View>

        {address ? (
          <View style={styles.addressContainer}>
            <Text style={styles.addressTitle}>Address</Text>
            <Text style={styles.addressContent}>{address.street}</Text>
            <Text style={styles.addressContent}>{address.city}, {address.state} - {address.pinCode}</Text>
          </View>
        ) : (
          <View style={styles.addressContainer}>
            <Text style={styles.addressTitle}>Address</Text>
            <Text style={styles.addressContent}>Not available</Text>
          </View>
        )}
      </View>
    </FinancialHoldingItemWrapper>
  );
};

export default CashFinancialHoldingItem;
