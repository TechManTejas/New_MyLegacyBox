import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

interface NewsCardProps {
  title: string;
  description: string;
  date: string;
  onPress?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  date,
  onPress,
}) => {
  const {
    theme: { colors, spacing, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.white100,
      borderRadius: spacing.sm,
      padding: spacing.md,
      marginBottom: spacing.md,
      elevation: 2,
      shadowColor: colors.black200,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    title: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.lg,
      color: colors.black500,
      marginBottom: spacing.xs,
    },
    description: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      color: colors.black400,
      marginBottom: spacing.sm,
    },
    date: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.sm,
      color: colors.black300,
      textAlign: "right",
    },
  });

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description} numberOfLines={3}>
        {description}
      </Text>
      <Text style={styles.date}>{date}</Text>
    </Pressable>
  );
};

export default NewsCard;
