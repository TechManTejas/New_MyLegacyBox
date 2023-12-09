import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";

const WillResidualDistPrevCard = ({ residualData }) => {
  const {
    theme: { spacing, colors, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    residualSection: {
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
      marginBottom: spacing.md,
      backgroundColor: colors.white100,
      padding: spacing.md,
      borderRadius: spacing.sm,
    },

    titleText: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue500,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
    },
  });

  return (
    residualData.length !== 0 && (
      <View
        style={{
          borderRadius: spacing.md,
          backgroundColor: colors.white400,
        }}
      >
        <View>
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
