import {
  View,
  Text,
  ImageSourcePropType,
  Image,
  StyleSheet,
  Dimensions,
  Linking,
  Pressable,
} from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";

interface BlogCardProps {
  image: ImageSourcePropType;
  text: string;
  title: string;
  blogUrl: string
}

const BlogCard: React.FC<BlogCardProps> = ({ image, text, title, blogUrl }) => {
  const { width } = Dimensions.get("window");

  const {
    theme: { fontFamily, colors, fontSize, spacing, tailWindColors },
  } = useTheme();

  const styles = StyleSheet.create({
    card: {
      borderRadius: spacing.sm,
      padding: spacing.md,
      width: width-100,
      backgroundColor: tailWindColors.blue50,
      flexDirection: "row",
      marginRight: spacing.sm
    },
    image: {
      width: 100,
      height: "auto",
      borderRadius: spacing.sm,
      // aspectRatio: 16/9
    },
    textsConatiner: {
      paddingLeft: spacing.md,
      flexShrink: 1,
    },
    title: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
      color: colors.blue500,
      paddingBottom: spacing.sm,
      // marginTop: spacing.sm
    },
    text: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.black400
    },
  });

  return (
    <Pressable style={styles.card} onPress={() => {
      Linking.openURL(blogUrl).catch((err) => console.error('An error occurred', err));
    }}>
      <Image style={styles.image} resizeMode="stretch" source={image} />
      <View style={styles.textsConatiner}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default BlogCard;
