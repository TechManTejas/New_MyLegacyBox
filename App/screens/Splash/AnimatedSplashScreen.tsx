import { Dimensions, StyleSheet, View, Image } from "react-native";
import Animated, { FadeInLeft, SlideOutRight } from "react-native-reanimated";
import { useTheme } from "../../theme/ThemeProvider";
import React, { useEffect, useState } from "react";

interface AnimatedSplashScreenProps {
  splashScreenVisible: boolean;
  setSplashScreenVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnimatedSplashScreen: React.FC<AnimatedSplashScreenProps> = ({
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

  useEffect(() => {
    const animationEndInterval = setTimeout(() => {
      setSplashScreenVisible(false);
    }, 4000);

    const coverEndInterval = setTimeout(() => setCoverVisible(false), 2500);

    return () => {
      clearTimeout(animationEndInterval);
      clearTimeout(coverEndInterval);
    };
  }, []);

  const text = "Personalising Succession";

  return (
    splashScreenVisible && (
      <View style={styles.screen}>
        <Image
          style={styles.logo}
          source={require("../../../assets/icon.png")}
        />

        <View style={styles.animatedTextBlock}>
          {text.split("").map((char, id) => (
            <Animated.Text
              entering={FadeInLeft.delay(id * 100 ).duration(500)}
              style={styles.text}
              key={id}
            >
              {char}
            </Animated.Text>
          ))}
        </View>

        <Image
          style={styles.waveImg}
          source={require("../../../assets/wave-flipped.png")}
        />

        <View style={styles.coverContainer}>
          <View style={styles.placeholder} />
          {coverVisible && (
            <Animated.View
              exiting={SlideOutRight.duration(2500)}
              style={[styles.placeholder, styles.cover]}
            />
          )}
        </View>
      </View>
    )
  );
};

export default AnimatedSplashScreen;
