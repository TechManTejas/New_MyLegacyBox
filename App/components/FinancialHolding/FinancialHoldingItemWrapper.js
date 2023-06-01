import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useTheme } from "../../theme/ThemeProvider";

const FinancialHoldingItemWrapper = ({
  children,
  updatedAt,
  holdingClass,
  pressHandler,
}) => {
  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.md,
      borderWidth: spacing.xxxs,
      borderColor: colors.black100,
      borderRadius: spacing.sm,
    },
    financialHoldingContainer: {
      flex: 1,
      paddingTop: spacing.md,
    },
    childContainer: {
      flex: 1,
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
      borderTopRightRadius: spacing.sm,
      borderBottomLeftRadius: spacing.sm,
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
    financialHoldingLastUpdated: {
      paddingHorizontal: spacing.md,
      marginBottom: spacing.sm,
      color: colors.black300,
    },
    button: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderTopLeftRadius: spacing.sm,
      borderBottomRightRadius: spacing.sm,
      backgroundColor: colors.white500,
    },
    buttonText: {
      color: colors.blue,
    },
    backgroundColorGreen: {
      backgroundColor: colors.green600,
    },
    backgroundColorRed: {
      backgroundColor: colors.red600,
    },
  });


  return (
    <View style={styles.container}>
      <View style={styles.financialHoldingContainer}>
        <View style={styles.childContainer}>{children}</View>
        <Text style={styles.financialHoldingLastUpdated}>
          Last updated on{" "}
          {new Date(updatedAt).toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Text>
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

          <Pressable style={styles.button} onPress={pressHandler}>
            <Text style={styles.buttonText}>
              Edit <FontAwesome5 name="edit" color={styles.buttonText.color} />
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default FinancialHoldingItemWrapper;
