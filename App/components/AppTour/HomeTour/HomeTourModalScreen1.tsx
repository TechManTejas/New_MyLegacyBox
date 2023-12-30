import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";

interface HomeTourModalScreen1Props {
  slideList: () => void;
}

const HomeTourModalScreen1: React.FC<HomeTourModalScreen1Props> = ({ slideList }) => {
  const {
    theme: { fontFamily, fontSize, colors, spacing },
  } = useTheme();

  const { width } = Dimensions.get("window");

  const styles = StyleSheet.create({
    page: {
      width,
      padding: spacing.xl,
      paddingTop: spacing.xxxl,
      alignItems: "center",
      justifyContent: "center",
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
      fontSize: fontSize.xxxl,
      lineHeight: fontSize.x4l,
      marginTop: spacing.xl,
      marginBottom: spacing.lg,
      color: colors.blue,
    },
    subTitle: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.xl,
      lineHeight: fontSize.xxl,
      color: colors.blue,
    },
    getStartedButton: {
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: spacing.md,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      backgroundColor: colors.blue,
    },
    buttonText: {
      color: colors.white100,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.xl,
      lineHeight: fontSize.xxl,
    },
    buddyImageStyle: {
      width: 340,
      height: 300,
      marginLeft: spacing.lg,
      marginBottom: spacing.sm,
      borderRadius: spacing.xxxl,
    },
    welcomeHead: {
      alignItems: "center",
      marginBottom: spacing.u100,
    },
    brandImage: {
      width: 300,
      height: 36,
    },
  });

  return (
    <View style={styles.page}>
      <View style={styles.welcomeHead}>
        <Text style={styles.titleText}>Welcome to</Text>
        <Image
          style={styles.brandImage}
          source={require("../../../assets/images/logoFullDark.png")}
        />
      </View>
      <Image
        style={styles.buddyImageStyle}
        source={require("../../../assets/images/buddy.png")}
      />
      <Pressable onPress={slideList} style={styles.getStartedButton}>
        <Text style={styles.buttonText}>Let's get started</Text>
      </Pressable>
    </View>
  );
};

export default HomeTourModalScreen1;
