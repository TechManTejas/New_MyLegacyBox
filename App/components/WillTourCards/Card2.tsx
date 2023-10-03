import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

const Card2 = () => {
  const { width } = Dimensions.get("window");

  const {
    theme: { fontFamily, fontSize, colors, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    page: {
      width,
      padding: spacing.xl,
      paddingTop: spacing.xxxl,
    },
    text: {
      fontFamily: fontFamily.regular,
      color: colors.black500,
      paddingBottom: spacing.md,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg + spacing.xxs,
      flexShrink: 1
    },
    boldText: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue500,
    },
    titleText: {
      textAlign: "center",
      color: colors.blue,
      fontSize: fontSize.xxl,
      lineHeight: fontSize.xxxl,
      fontFamily: fontFamily.semiBold,
      marginTop: spacing.xl,
      marginBottom: spacing.lg,
    },
  });

  return (
    <View style={styles.page}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          style={{ width: 260, height: 200, marginBottom: spacing.lg }}
          alt=""
          source={require("../../assets/images/test2.jpg")}
        />
      </View>
      <Text style={[styles.text, styles.titleText]}>
        Pre-requisites to draft your Will with Oiconomos
      </Text>
      <Text style={[styles.text, styles.boldText, { textAlign: "center" }]}>
        Drafting your Will with Oiconomos is easy and simple. It takes
        approximately 10-15 min.
      </Text>
      <Text style={styles.text}>
        <Text style={[styles.text, styles.boldText]}>Smartbox :</Text> Make sure
        to add all your assets and debts to the Smartbox that you would like to
        include in your Will.
      </Text>
      <Text style={styles.text}>
        <Text style={[styles.text, styles.boldText]}>My Circle : </Text>Ensure
        you've added all the members' accurate data to "My Circle" to allow role
        assignments like beneficiaries, executors, witnesses, etc.
      </Text>
      <Text style={styles.text}>
        A Will needs to be signed physically by the Testator in the presence of
        a minimum of two witnesses who shall also sign the Will.
      </Text>
    </View>
  );
};

export default Card2;