import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useGetWillQuery } from "../../redux/api/will/willApiSlice";

const WillNamePercentCard = ({ _id, percent }) => {
  const {
    theme: { fontFamily, colors, fontSize, spacing },
  } = useTheme();

  const { data, isLoading, isFetching } = useGetWillQuery();

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
        {
          data.data.beneficiaries.find((nominee) => nominee._id === _id)
            .fullName
        }
      </Text>
      <Text style={styles.percent}>{percent} %</Text>
    </View>
  );
};

export default WillNamePercentCard;
