import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import InfoSquareIcon from "../../assets/icons/info-square.svg";

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
      // borderWidth: StyleSheet.hairlineWidth,
      // borderColor: colors.black300,
      backgroundColor: colors.white500,
      marginVertical: spacing.lg,
      marginHorizontal: spacing.lg,
      borderRadius: spacing.sm,
      padding: spacing.md,
    },
    text: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      flex: 1
    },

    defaultCard: {
      flexDirection: "row",
      alignItems: "flex-start",
    },

    iconStyle: {
      marginRight: spacing.md
    }
  });

  return (
    <View style={styles.card}>
      {!customContent ? (
        <View style={styles.defaultCard}>
          <InfoSquareIcon style={styles.iconStyle} width={24} height={24} color={colors.blue500} />
          <Text style={styles.text}>{content}</Text>
        </View>
      ) : (
        customContent
      )}
    </View>
  );
};

export default WillInfoCard;
