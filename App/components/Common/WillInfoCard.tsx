import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import UserHexagon from "../../assets/icons/user-hexagon.svg";

interface WillInfoCardProps {
  content?: string;
  customContent?: React.ReactNode;
}

const WillInfoCard: React.FC<WillInfoCardProps> = ({
  content,
  customContent,
}) => {
  const {
    theme: { colors, spacing, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    card: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black300,
      backgroundColor: colors.white400,
      marginVertical: spacing.lg,
      marginHorizontal: spacing.lg,
      borderRadius: spacing.sm,
      padding: spacing.md,
    },
    text: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.blue500,
    },
  });

  return (
    <View style={styles.card}>
      {!customContent ? (
        <Text style={styles.text}>{content}</Text>
      ) : (
        customContent
      )}
    </View>
  );
};

export default WillInfoCard;
