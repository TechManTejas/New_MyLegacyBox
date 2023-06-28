import { View, Text, Pressable, StyleSheet } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useTheme } from "../../theme/ThemeProvider";
import { Entypo } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';

const FinancialInstitutionWrapper = ({ children, address, pressHandler, title }) => {

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
      color: colors.black300,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    addressContentText: {
      fontFamily: fontFamily.regular, 
      fontSize: fontSize.default, 
      lineHeight: fontSize.xl, 
      color: colors.black300,
    },
    addressTitle: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue500,
      lineHeight: fontSize.xxl,
      fontSize: fontSize.xl
    },
    devider: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black200,
      marginVertical: spacing.sm,
    },
    addressStreet: {
      color: colors.black300,
      fontSize: fontSize.md,
      fontFamily: fontFamily.regular,
      paddingLeft: spacing.lg
    },
    locationIcon: {
      paddingRight: spacing.xxs 
    },
    dotIcon: {
      paddingHorizontal: spacing.sm 
    },
    editButton: {
      flexDirection: "row", 
      alignItems: "center", 
      backgroundColor: colors.blue500, 
      borderRadius: 5, 
      paddingVertical: 2, 
      paddingHorizontal: spacing.sm
    },
    editButtonText: {
      color: colors.white, 
      paddingRight: 10, 
      paddingTop: 2, 
      fontFamily: fontFamily.semiBold, 
      fontSize: fontSize.md
    }
  });

  return (
    <View style={styles.container}>

      <View style={styles.viewContainer}>
        {address ? (
          <View style={styles.addressContainer}>
            <Text style={styles.addressTitle}>{title}</Text>
            <View style={styles.addressContent}>
              <Entypo color={colors.black400} name="location-pin" style={styles.locationIcon} size={fontSize.default} />
              <Text style={styles.addressContentText}>{address.city}</Text> 
              <Octicons color={colors.black400} style={styles.dotIcon} name="dot-fill" size={fontSize.md} /> 
              <Text style={styles.addressContentText}>{address.state}, {address.pinCode}</Text>
            </View>
            <Text style={styles.addressStreet}>{address.street}</Text>
          </View>
        ) : (
          <View style={styles.addressContainer}>
            <Text style={styles.addressTitle}>Address</Text>
            <Text style={styles.addressContent}>Not available</Text>
          </View>
        )}

        <Pressable onPress={pressHandler} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
          <FontAwesome5 name="pen" size={10} color="white" />
        </Pressable>

      </View>

      <View style={styles.devider} />

      <View style={styles.childContainer}>{children}</View>

    </View>
  );
};

export default FinancialInstitutionWrapper;
