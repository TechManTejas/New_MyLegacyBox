import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";

const WillResidualDistPrevCard = ({ residualData }) => {
  const {
    theme: { spacing, colors, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    residualSection: {
      //   marginHorizontal: spacing.md,
      padding: spacing.md,
    },
    residualName: {
      fontFamily: fontFamily.regular,
    },
    residualEmail: {
      fontFamily: fontFamily.regular,
      color: colors.blue400,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
    residualPercentage: {
      color: colors.black300,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
    residualCard: {
      fontFamily: fontFamily.regular,
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: spacing.sm,
    },
    residualNameEmail: {},

    titleContainer: {
      // marginBottom: spacing.sm,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBlockColor: colors.black200,
      // paddingBottom: spacing.sm,
    },
    titleText: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue500,
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
    },
  });

  return (
    residualData.length !== 0 && (
      <View
        style={{
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.black300,
          borderRadius: spacing.md,
        }}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Residuary Distribution</Text>
        </View>
        <View style={styles.residualSection}>
          {residualData.map((item, index) => {
            if (item.percent !== "0")
              return (
                <View key={index} style={styles.residualCard}>
                  <View>
                    <Text style={styles.residualName}>
                      {item.beneficiary.fullName}
                    </Text>
                    <Text style={styles.residualEmail}>
                      {item.beneficiary.email}
                    </Text>
                  </View>
                  <Text style={styles.residualPercentage}>
                    {item.percent} %
                  </Text>
                </View>
              );
          })}
        </View>
      </View>
    )
  );
};

export default WillResidualDistPrevCard;
