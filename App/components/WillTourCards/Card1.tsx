import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { Entypo, FontAwesome } from "@expo/vector-icons";

const Card1 = () => {
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
      flexShrink: 1
    },
    bulletTextContainer: {
      marginVertical: spacing.md,
    },
    iconTextContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: spacing.xs,
    },
    bulletText: {
      fontFamily: fontFamily.regular,
      color: colors.black500,
      marginLeft: spacing.md,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg + spacing.xxs,
      flexShrink: 1
    },
    titleText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.xxl,
      lineHeight: fontSize.xxxl,
      marginTop: spacing.xl,
      marginBottom: spacing.lg,
      color: colors.blue,
    },
  });

  return (
    <View style={styles.page}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          style={{ width: 260, height: 200, marginBottom: spacing.lg }}
          alt=""
          source={require("../../assets/images/test.jpg")}
        />
        <Text style={styles.titleText}>Ready to draft your Will?</Text>
      </View>

      <View>
        <Text style={[styles.text, { textAlign: "justify" }]}>
          Creating a Will is a very simple but thoughtful step one can take. A
          Will is a legal instrument that can provide several benefits to an
          individual as well as the family over a very long period of time such
          as
        </Text>
        <View style={styles.bulletTextContainer}>
          <View style={styles.iconTextContainer}>
            <View>
              <FontAwesome name="bullseye" size={30} color={colors.green600} />
            </View>
            <Text style={styles.bulletText}>
              Keeping track of all the assets and debts
            </Text>
          </View>

          <View style={styles.iconTextContainer}>
            <View>
              <Entypo name="shield" size={26} color={colors.blue500} />
            </View>
            <Text style={styles.bulletText}>
              Protecting our loved ones financially by providing adequately
            </Text>
          </View>

          <View style={styles.iconTextContainer}>
            <View>
              <FontAwesome name="warning" size={26} color={colors.red600} />
            </View>
            <Text style={styles.bulletText}>
              Avoiding unnecessary family dispute and distress etc
            </Text>
          </View>
        </View>

        <Text style={[styles.text, { textAlign: "justify" }]}>
          We kudos to you for taking the first step toward protecting your loved
          ones in the true sense
        </Text>
      </View>
    </View>
  );
};

export default Card1;