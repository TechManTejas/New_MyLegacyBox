import { Dimensions, StyleSheet, View, Image } from "react-native";
import Animated, { FadeInLeft, SlideOutRight } from "react-native-reanimated";
import { useTheme } from "../theme/ThemeProvider";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setShowModal } from "../services/appTour/appTour";

const AnimatedSplashScreen = ({
  setSplashScreenVisible,
  splashScreenVisible,
}) => {
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
      height: 14,
      width: 100,
      marginHorizontal: spacing.lg,
      zIndex: 10,
      position: "relative",
      left: 78,
      bottom: 6,
    },
    placeholder: {
      height: 20,
      width: 100,
      backgroundColor: "white",
    },
    cover: {
      zIndex: 20,
      position: "relative",
      bottom: 26,
      left: 28,
    },
    coverContainer: {
      flexDirection: "row",
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const animationEndInterval = setTimeout(
      () => {
        setSplashScreenVisible(false)
        dispatch(setShowModal(true));
      },
      7000
    );
    const coverEndInterval = setTimeout(() => setCoverVisible(false), 3000);

    return () => {
      clearTimeout(animationEndInterval);
      clearTimeout(coverEndInterval);
    };
  }, []);

  const text = "Personalising Succession";

  return (
    splashScreenVisible && (
      <View style={styles.screen}>
        <Image style={styles.logo} fadeDuration={0} source={require("../../assets/icon.png")} />

        <View style={styles.animatedTextBlock}>
          {text.split("").map((char, id) => (
            <Animated.Text
              entering={FadeInLeft.delay(id * 150 + 1500).duration(500)}
              style={styles.text}
              key={id}
            >
              {char}
            </Animated.Text>
          ))}
        </View>

        <Image
          style={styles.waveImg}
          source={require("../../assets/wave-flipped.png")}
        />

        <View style={styles.coverContainer}>
          <View style={styles.placeholder} />
          {coverVisible && (
            <Animated.View
              exiting={SlideOutRight.duration(7000)}
              style={[styles.placeholder, styles.cover]}
            />
          )}
        </View>
      </View>
    )
  );
};

export default AnimatedSplashScreen;
