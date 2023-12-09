import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import InfoSquareIcon from "../../assets/icons/info-square.svg";

interface WillInfoCardProps {
  content?: string;
  customContent?: React.ReactNode;
  backgroundColor?: string;
}

const WillInfoCard: React.FC<WillInfoCardProps> = ({
  content,
  customContent,
  backgroundColor,
}) => {
  const {
    theme: { colors, spacing, fontFamily, fontSize, tailWindColors },
  } = useTheme();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: backgroundColor || tailWindColors.lime100,

      marginVertical: spacing.sm,
      marginHorizontal: spacing.sm,
      borderRadius: spacing.sm,
      padding: spacing.md,
    },
    text: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      flex: 1,
      color: colors.black400,
    },

    defaultCard: {
      flexDirection: "row",
      alignItems: "flex-start",
    },

    iconStyle: {
      marginRight: spacing.md,
    },
  });

  return (
    <View style={styles.card}>
      {!customContent ? (
        <View style={styles.defaultCard}>
          <InfoSquareIcon
            style={styles.iconStyle}
            width={24}
            height={24}
            color={colors.black400}
          />
          <Text style={styles.text}>{content}</Text>
        </View>
      ) : (
        customContent
      )}
    </View>
  );
};

export default WillInfoCard;
