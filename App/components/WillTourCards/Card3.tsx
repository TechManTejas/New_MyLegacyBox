import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

const Card3 = () => {
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
      color: colors.black600,
      paddingBottom: spacing.md,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg + spacing.xxs,
      flexShrink: 1,
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
    imageContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.lg,
    },
  });

  return (
    <View style={styles.page}>
      <View style={styles.imageContainer}>
        <Image
          style={{ width: 260, height: 200 }}
          source={require("../../assets/images/test3.jpg")}
        />
      </View>
      <Text style={[styles.text, styles.titleText]}>Common Terminologies</Text>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Testator : </Text>The person who is making
        the Will
      </Text>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Beneficiaries : </Text>Beneficiaries are
        the ones who shall be receiving your wealth after you
      </Text>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Bequeath : </Text>To pass on. For example
        : “I bequeath my car” means you are passing on your Car to someone after
        you.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Executor : </Text>Select a trusted person
        to oversee estate distribution per your Will. You may include multiple
        executors.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Witness(es) : </Text>Witnesses physically
        present during your Will signing verify its authenticity. You require a
        minimum of two witnesses, not needing to know your Will's content.
      </Text>
    </View>
  );
};

export default Card3;
