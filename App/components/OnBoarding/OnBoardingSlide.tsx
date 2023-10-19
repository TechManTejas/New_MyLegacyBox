import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  ImageSourcePropType,
} from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

interface OnBoardingSlideProps {
  item: {
    id: string;
    image: ImageSourcePropType;
    title: string;
    subTitle?: string;
    titleBold?: boolean;
    titleCapitalize?: boolean;
    message: string;
  };
}

const OnBoardingSlide: React.FC<OnBoardingSlideProps> = ({ item }) => {
  const { width } = useWindowDimensions();
  const {
    theme: { colors, spacing, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flex: 1,
      paddingTop: spacing.md,
      paddingBottom: spacing.sm,
    },
    image: {
      flex: 3,
      width: width,
      resizeMode: "contain",
      marginBottom: spacing.md,
    },
    shrinkWidthByXl: {
      width: width - 2 * spacing.xl,
    },
    content: {
      flex: 2,
    },
    title: {
      color: colors.blue,
      fontFamily: fontFamily.semiBold,
      paddingHorizontal: spacing.md,
      marginBottom: spacing.md,
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
      width: width,
      textAlign: "center",
    },
    subTitle: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
    message: {
      color: colors.black400,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
      paddingHorizontal: spacing.md,
      marginBottom: spacing.xl,
      width: width,
      textAlign: "center",
    },
    capitatlize: {
      textTransform: "uppercase",
    },
    boldAndEnlargeText: {
      fontFamily: fontFamily.extraBold,
      fontSize: fontSize.xl,
      lineHeight: fontSize.xxl,
    },
    marginBottomXs: {
      marginBottom: spacing.xs,
    },
  });

  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            item.subTitle ? styles.marginBottomXs : {},
            item.titleBold && styles.boldAndEnlargeText,
            item.titleCapitalize && styles.capitatlize,
          ]}
        >
          {item.title}
        </Text>
        {item.subTitle ? (
          <Text style={[styles.title, styles.subTitle]}>{item.subTitle}</Text>
        ) : null}
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </View>
  );
};

export default OnBoardingSlide;
