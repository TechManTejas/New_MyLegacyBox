import { View, Text, Pressable, StyleSheet } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useTheme } from "../../theme/ThemeProvider";
import { Ionicons } from '@expo/vector-icons'; 

const FinancialInstitutionWrapper = ({ children, address, pressHandler, companyName }) => {

  const { theme: { colors, fontFamily, fontSize, spacing } } = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.lg,
      borderRadius: spacing.xs,
      borderWidth: StyleSheet.hairlineWidth, 
      borderColor: colors.black200,
      padding: spacing.md
    },
    viewContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
    },
    childContainer: {
      flex: 1,
      paddingTop: spacing.sm,
    },
    addressContainer: {
      marginBottom: spacing.xs,
      flex: 1,
    },
    addressContent: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.default,
      lineHeight: fontSize.xl,
      color: colors.black300
    },
    addressTitle: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue500,
      lineHeight: fontSize.xxl,
      fontSize: fontSize.xl
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
    devider: {
      borderBottomWidth: 1,
      borderStyle: "dashed",
      borderColor: colors.black200,
      marginVertical: spacing.sm,
    },
    addressStreet: {
      marginTop: spacing.xs,
      color: colors.black300,
      fontSize: fontSize.md
    }
  });

  return (
    <View style={styles.container}>

      <View style={styles.viewContainer}>
        {address ? (
          <View style={styles.addressContainer}>
            <Text style={styles.addressTitle}>{companyName}</Text>
            <Text style={styles.addressContent}>
              <Ionicons name="navigate" size={15} /> {address.city}, {address.state}, {address.pinCode}
            </Text>
            <Text style={styles.addressStreet}>{address.street}</Text>
          </View>
        ) : (
          <View style={styles.addressContainer}>
            <Text style={styles.addressTitle}>Address</Text>
            <Text style={styles.addressContent}>Not available</Text>
          </View>
        )}

        <Pressable onPress={pressHandler} style={{ flexDirection: "row", alignItems: "center", backgroundColor: colors.blue500, borderRadius: 5, paddingVertical: 2, paddingHorizontal: spacing.sm }}>
          <Text style={{ color: colors.white, paddingRight: 10, paddingTop: 2, fontFamily: fontFamily.semiBold, fontSize: fontSize.md }}>Edit</Text>
          <FontAwesome5 name="pen" size={10} color="white" />
        </Pressable>

      </View>

      <View style={styles.devider} />

      <View style={styles.childContainer}>{children}</View>

    </View>
  );
};

export default FinancialInstitutionWrapper;
