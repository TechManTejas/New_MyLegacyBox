import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

const HTCard2 = () => {
  const {
    theme: { fontFamily, fontSize, colors, spacing },
  } = useTheme();

  const { width } = Dimensions.get("window");

  const styles = StyleSheet.create({
    page: {
      width,
      padding: spacing.xl,
      paddingTop: spacing.xxxl,
    },
    text: {
      fontFamily: fontFamily.regular,
      color: colors.black500,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg + spacing.xxs,
      flexShrink: 1,
    },
    titleText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.xxl,
      lineHeight: fontSize.xxxl,
      marginTop: spacing.xl,
      marginBottom: spacing.lg,
      color: colors.blue,
    },
    featureContainer: {
      marginBottom: spacing.lg,
    },
    subTitle: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
      marginBottom: spacing.xs,
      color: colors.blue,
    },
  });

  return (
    <View style={styles.page}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          style={{ width: 260, height: 200, marginBottom: spacing.lg }}
          alt=""
          source={require("../../assets/images/test7.jpg")}
        />
        <Text style={styles.titleText}>App Overview</Text>
      </View>

      <View>
        <View style={styles.featureContainer}>
          <Text style={[styles.text, { textAlign: "justify" }]}>
            <Text style={styles.subTitle}>My SmartBox</Text> is a secured box
            for all your financial info in a single place, making it easy to
            access and retrieve anytime you need it. Need not to worry, all your
            data are end-to-end Encrypted
          </Text>
        </View>

        <View style={styles.featureContainer}>
          <Text style={[styles.text]}>
            <Text style={styles.subTitle}>My Circle</Text> is a safe space to
            add your loved & trusted ones by creating profiles of them. Creating
            profiles shall help you in designate roles to them in your “My Will”
          </Text>
        </View>

        <View style={styles.featureContainer}>
          <Text style={[styles.text]}>
            <Text style={styles.subTitle}>My Will</Text> Creating a Will could
            not be easier than doing it via “My Will”. Draft your legally valid
            Will in just 10 minutes.
          </Text>
          <Text style={[styles.text]}>
            The best thing : No additional cost, No time limitation
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HTCard2;
