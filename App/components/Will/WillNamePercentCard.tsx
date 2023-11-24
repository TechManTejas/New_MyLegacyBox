import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useGetWillQuery } from "../../redux/api/will/willApiSlice";
import { getBeneficiariesSelector } from "../../redux/form/willFormSlice";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";

const WillNamePercentCard = ({ _id, percent }) => {
  const {
    theme: { fontFamily, colors, fontSize, spacing },
  } = useTheme();

  const route = useRoute();

  const { data, isLoading, isFetching } = useGetWillQuery();

  const beneficiaries = useSelector((state) => getBeneficiariesSelector(state));

  const styles = StyleSheet.create({
    nomineeName: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
      color: colors.black400,
    },
    distribution: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    percent: {
      fontFamily: fontFamily.regular,
      color: colors.black300,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
    assetHolders: {
      color: colors.black400,
      fontFamily: fontFamily.regular,
    },
  });

  return (
    <View style={styles.distribution}>
      <Text style={[styles.nomineeName, styles.assetHolders]}>
        {route.name === "WILL_PREVIEW_SCREEN"
          ? beneficiaries.find((nominee) => nominee._id === _id)?.fullName
          : data.data.beneficiaries.find((nominee) => nominee._id === _id)
              ?.fullName}
      </Text>
      <Text style={styles.percent}>{percent} %</Text>
    </View>
  );
};

export default WillNamePercentCard;
