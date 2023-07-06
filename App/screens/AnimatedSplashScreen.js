import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  FadeInLeft,
  FadeInUp,
  FadeInRight,
} from "react-native-reanimated";
import { useTheme } from "../theme/ThemeProvider";
import { useEffect } from "react";
import { SCREEN_NAMES } from "../constants/screenNames";

const AnimatedSplashScreen = ({ onAnimationEnd }) => {


  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const { height } = Dimensions.get("screen");

  const styles = StyleSheet.create({
    screen: {
      height,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      zIndex: 0,
    },
    logo: {
      width: 120,
      height: 120,
    },
    text: {
      color: colors.blue500,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.xl,
    },
    animatedTextBlock: {
      flexDirection: "row",
    },
    waveImg: {
      height: 20,
      width: 100,
      marginHorizontal: spacing.lg,
      zIndex: 10,
      position: "relative",
      left: 70,
    },
  });

  useEffect(() => {
    const interval = setTimeout(onAnimationEnd, 7000);
    return ()=>clearTimeout(interval)
  }, []);

  const text = "Personalising Succession";

  return (
    <Animated.View style={styles.screen}>
      <Animated.Image
        style={styles.logo}
        entering={FadeInUp.duration(1500)}
        source={require("../../assets/icon.png")}
      />

      <Animated.View style={styles.animatedTextBlock}>
        {text.split("").map((char, id) => (
          <Animated.Text
            entering={FadeInLeft.delay(id * 150 + 1500).duration(500)}
            style={styles.text}
            key={id}
          >
            {char}
          </Animated.Text>
        ))}
      </Animated.View>

      <Animated.Image
        entering={FadeInRight.delay(4500).duration(1500)}
        style={styles.waveImg}
        source={require("../../assets/waveb.png")}
      />
    </Animated.View>
  );
};

export default AnimatedSplashScreen;
