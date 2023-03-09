import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useTheme } from "../../theme/ThemeProvider";

const FinancialInstitutionWrapper = ({ children, address, pressHandler }) => {
  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.lg,
      borderRadius: spacing.sm,
    },
    viewContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "flex-start",
    },
    childContainer: {
      flex: 1,
      paddingTop: spacing.sm,
    },
    addressContainer: {
      marginBottom: spacing.xs,
    },
    addressContent: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.default,
      lineHeight: fontSize.xl,
    },
    addressTitle: {
      fontFamily: fontFamily.semiBold,
      color: colors.black500,
      lineHeight: fontSize.lg,
    },
    buttonContainer: {
      paddingBottom: spacing.sm,
      paddingRight: spacing.sm,
    },
    button: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: spacing.sm,
      backgroundColor: colors.white500,
    },
    buttonText: {
      color: colors.blue,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.childContainer}>
          {address ? (
            <View style={styles.addressContainer}>
              <Text style={styles.addressTitle}>Address</Text>
              <Text style={styles.addressContent}>{address.street}</Text>
              <Text style={styles.addressContent}>
                {address.city}, {address.state} - {address.pinCode}
              </Text>
            </View>
          ) : (
            <View style={styles.addressContainer}>
              <Text style={styles.addressTitle}>Address</Text>
              <Text style={styles.addressContent}>Not available</Text>
            </View>
          )}
          {children}
        </View>
        <View style={styles.buttonContainer}>
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

export default FinancialInstitutionWrapper;
