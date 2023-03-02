import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../constants/screenNames";

const BankDetail = ({ bank }) => {
  const navigation = useNavigation();

  const { name, ifsc, poc, pocNumber, address } = bank;

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const handlePress = () => {
    navigation.navigate(SCREEN_NAMES.updateBankScreen, { bank });
  };

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
    bankContainer: {
      flex: 1,
      paddingTop: spacing.sm,
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "baseline",
      paddingRight: spacing.md,
    },
    bankIfsc: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
    bankPoc: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
    addressContainer: {
      marginBottom: spacing.xs,
    },
    addressTitle: {
      fontFamily: fontFamily.semiBold,
      color: colors.black500,
      lineHeight: fontSize.lg,
    },
    iconContaier: {
      paddingBottom: spacing.sm,
      paddingRight: spacing.sm,
    },
    icon: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: spacing.sm,
      backgroundColor: colors.white500,
    },
    iconText: {
      color: colors.blue,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.bankContainer}>
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
          {ifsc ? (
            <Text style={styles.postalIfsc}>IFSC : {ifsc}</Text>
          ) : (
            <Text style={styles.postalIfsc}>IFSC : Not available</Text>
          )}

          <View>
            {poc ? (
              <View style={styles.row}>
                <Text style={styles.bankPoc}>RM : {poc}</Text>
              </View>
            ) : null}

            {pocNumber ? (
              <View style={styles.row}>
                <Text style={styles.bankPoc}>Phone : {pocNumber}</Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.iconContaier}>
          <Pressable style={styles.icon} onPress={handlePress}>
            <Text style={styles.iconText}>
              Edit <FontAwesome5 name="edit" color={styles.iconText.color} />
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default BankDetail;
