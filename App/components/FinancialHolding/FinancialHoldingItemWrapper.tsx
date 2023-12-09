import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { FontAwesome5 } from "@expo/vector-icons";

interface FinancialHoldingItemWrapperProps {
  children: React.ReactNode;
  holdingClass: string;
  shareBtnCallBack: () => void;
}

const FinancialHoldingItemWrapper: React.FC<
  FinancialHoldingItemWrapperProps
> = ({ children, holdingClass, shareBtnCallBack }) => {
  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black300,
      borderRadius: spacing.xs,
    },

    financialHoldingContainer: {
      paddingTop: spacing.md,
    },
    financialHoldingClassContainer: {
      backgroundColor: colors.black700,
      width: 80,
      height: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderTopRightRadius: spacing.xs,
      borderBottomLeftRadius: spacing.xs,
    },
    financialHoldingClass: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.sm,
      lineHeight: fontSize.lg,
      color: colors.white100,
      textTransform: "uppercase",
    },

    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "stretch",
      justifyContent: "space-between",
    },
    rowAlignEnd: {
      alignItems: "flex-end",
    },

    backgroundColorGreen: {
      backgroundColor: colors.green600,
    },
    backgroundColorRed: {
      backgroundColor: colors.red600,
    },
    backgroundColorGrey: {
      backgroundColor: colors.black400,
    },

    shareButtonContainerStyle: {
      // marginRight: spacing.xs,
      // marginBottom: spacing.sm,

      backgroundColor: colors.white400,
      width: 80,
      height: "100%",

      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",

      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,

      borderTopLeftRadius: spacing.xs,
      borderBottomRightRadius: spacing.xs,
    },
    shareButtonText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.sm,
      lineHeight: fontSize.lg,
      color: colors.blue500,
      marginRight: spacing.xs,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.financialHoldingContainer}>
        <View>{children}</View>

        <View style={[styles.row, styles.rowAlignEnd]}>
          <View
            style={[
              styles.financialHoldingClassContainer,
              holdingClass === "ASSET"
                ? styles.backgroundColorGreen
                : styles.backgroundColorRed,
            ]}
          >
            <Text style={styles.financialHoldingClass}>{holdingClass}</Text>
          </View>

          {shareBtnCallBack && (
            <Pressable
              onPress={shareBtnCallBack}
              style={styles.shareButtonContainerStyle}
            >
              <Text style={styles.shareButtonText}>Share</Text>
              <FontAwesome5 name="share-alt" size={10} color={colors.blue500} />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default FinancialHoldingItemWrapper;
