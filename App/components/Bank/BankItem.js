import { Pressable, View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../constants/screenNames";
import { FontAwesome5 } from '@expo/vector-icons';

const BankItem = ({ ...bank }) => {

  const { _id, name, ifsc, branchName, poc, pocNumber, address } = bank;

  const { theme: { colors, fontFamily, fontSize, spacing } } = useTheme();

  const navigation = useNavigation();

  const pressHandler = () => {
    navigation.navigate(SCREEN_NAMES.bankScreen, { _id, bank, });
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.md,
      borderWidth: spacing.xxxs,
      borderColor: colors.black100,
      borderRadius: spacing.xs,
    },
    pressableContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
    },
    content: {
      flex: 1,
      paddingTop: spacing.sm,
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "baseline",
      paddingHorizontal: spacing.md,
      marginBottom: spacing.xs,
    },
    col: {
      paddingHorizontal: spacing.md,
      marginBottom: spacing.xs,
    },
    name: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue500,
      fontSize: fontSize.xl,
      lineHeight: fontSize.xxl,
    },
    ifsc: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.black300,
    },
    poc: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.black300,
      paddingLeft: spacing.xs
    },
    footer: {
      backgroundColor: colors.black700,
      width: 120,
      flexDirection: "row",
      alignSelf: "flex-start",
      justifyContent: "center",
      marginTop: spacing.md,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderTopRightRadius: spacing.xs,
      borderBottomLeftRadius: spacing.xs,
    },
    city: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.sm,
      color: colors.white100,
    },
    iconTextContainer: {
      flexDirection: "row",
      paddingRight: spacing.lg,
      alignItems: "baseline"
    },
  });

  return (
    <View style={styles.container}>

      <View style={styles.content}>

        <View>

          <View style={styles.col}>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>

              <Text style={styles.name}>{name}, {branchName}</Text>

              <Pressable onPress={pressHandler} style={{ flexDirection: "row", alignItems: "center", backgroundColor: colors.blue500, borderRadius: 5, paddingVertical: 2, paddingHorizontal: spacing.sm }}>
                <Text style={{ color: colors.white, paddingRight: 10, paddingTop: 2, fontFamily: fontFamily.semiBold, fontSize: fontSize.md }}>View</Text>
                <FontAwesome5 name="arrow-right" size={10} color="white" />
              </Pressable>

            </View>

            <Text style={styles.ifsc}>{ifsc}</Text>

          </View>

          <View style={styles.row}>
            <View style={styles.iconTextContainer}>
              <FontAwesome5 name="user-tie" size={14} color={styles.poc.color} />
              <Text style={styles.poc}>{poc || "Not available"}</Text>
            </View>
            <View style={styles.iconTextContainer}>
              <FontAwesome5 name="phone" size={14} color={styles.poc.color} />
              <Text style={styles.poc}>{pocNumber || "Not available"}</Text>
            </View>
          </View>

        </View>

        {
          (address?.city) ?
            <View style={styles.footer}>
              <Text style={styles.city}>{address?.city.toUpperCase()}</Text>
            </View> : <View style={styles.footer}>
              <Text style={styles.city}>N/A</Text>
            </View>
        }

      </View>

    </View>
  );
};

export default BankItem;
