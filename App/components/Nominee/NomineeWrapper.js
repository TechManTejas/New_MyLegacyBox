import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useTheme } from "../../theme/ThemeProvider";
import {
  NOMINEE_RELATIONSHIP_MAP,
  NOMINEE_RELATIONSHIP_TO_TITLE_MAP,
} from "../../constants/nominee";

const NomineeWrapper = ({ children, relationship, pressHandler }) => {
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
    nomineeContainer: {
      flex: 1,
      paddingTop: spacing.md,
    },
    childContainer: {
      flex: 1,
      marginBottom: spacing.sm,
    },
    nomineeRelationshipContainer: {
      backgroundColor: colors.black700,
      height: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderTopRightRadius: spacing.sm,
      borderBottomLeftRadius: spacing.sm,
    },
    nomineeRelationshipContainerWithWidth: {
      width: 80,
    },
    nomineeRelationship: {
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
    backgroundColorGrey: {
      backgroundColor: colors.black400,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.nomineeContainer}>
        <View style={styles.childContainer}>{children}</View>

        <View style={[styles.row, styles.rowAlignEnd]}>
          <View
            style={[
              styles.nomineeRelationshipContainer,
              relationship === "OTHER"
                ? styles.backgroundColorGrey
                : styles.backgroundColorGreen,
              !relationship === NOMINEE_RELATIONSHIP_MAP["pms"] &&
                styles.nomineeRelationshipContainerWithWidth,
            ]}
          >
            <Text style={styles.nomineeRelationship}>
              {NOMINEE_RELATIONSHIP_TO_TITLE_MAP[relationship]}
            </Text>
          </View>

          {pressHandler ? (
            <Pressable style={styles.button} onPress={pressHandler}>
              <Text style={styles.buttonText}>
                Edit
                <FontAwesome5 name="edit" color={styles.buttonText.color} />
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default NomineeWrapper;
