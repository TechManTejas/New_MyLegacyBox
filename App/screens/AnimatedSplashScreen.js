import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  FadeInLeft,
  FadeInUp,
  FadeInRight,
  FadeOutRight,
  SlideOutRight,
} from "react-native-reanimated";
import { useTheme } from "../theme/ThemeProvider";
import { useEffect, useState } from "react";

const AnimatedSplashScreen = ({ onAnimationEnd }) => {
  const [coverVisible, setCoverVisible] = useState(true);

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const { height } = Dimensions.get("window");

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
    placeholder: {
      height: 30,
      width: 100,
      backgroundColor: "white",
    },
    cover: {
      zIndex: 20,
      position: "relative",
      bottom: 20,
      left: 20,
    },
    coverContainer: {
      flexDirection: "row",
    },
  });

  useEffect(() => {
    const animationEndInterval = setTimeout(onAnimationEnd, 7000);
    const coverEndInterval = setTimeout(() => setCoverVisible(false), 3000);

    return () => {
      clearTimeout(animationEndInterval);
      clearTimeout(coverEndInterval);
    };
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
        style={styles.waveImg}
        source={require("../../assets/waveb.png")}
      />

      <View style={styles.coverContainer}>
        <Animated.View style={styles.placeholder} />
        {coverVisible && (
          <Animated.View
            exiting={SlideOutRight.duration(7000)}
            style={[styles.placeholder, styles.cover]}
          />
        )}
      </View>
    </Animated.View>
  );
};

export default AnimatedSplashScreen;
