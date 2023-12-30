import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import CustomToolTip from "../Common/CustomToolTip";
import { Ionicons } from "@expo/vector-icons"

const WillResidualDistPrevCard = ({ residualData }) => {
  const {
    theme: { spacing, colors, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({

    header: {
      alignItems: "center",
      flexDirection: "row"
    },
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
    toolTipMessage: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: spacing.lg,
      color: colors.blue500,
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
        <View style={styles.header}>
          <Text style={styles.titleText}>Residuary Distribution</Text>
          <CustomToolTip
              icon={
                <Ionicons
                  name="information-circle-outline"
                  size={fontSize.default}
                  color={colors.blue500}
                />
              }
              message={
                <View>
                  <Text style={styles.toolTipMessage}>
                    It is essential to specify 'Residuary clause' in a Will, which refers to any other property not specifically 
                    included in a Will or which is not in existence at the time of execution of a Will. Residuary clause clarifies 
                    the mannerism in which any such assets are to be bequeathed. 
                  </Text>
                </View>
              }
              position={"bottom"}
              style={{ marginTop: spacing.md, marginLeft: -spacing.md }}
            />
        </View>
        <View style={styles.residualSection}>
          {residualData.map((item, index) => {
            if (item.percent !== "0" && item.percent !== "")
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
