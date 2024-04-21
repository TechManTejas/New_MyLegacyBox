import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SvgProps } from "react-native-svg";
import { useTheme } from "../../theme/ThemeProvider";

interface FeatureCardProps {
    index: number
  FeatureIcon: React.FC<SvgProps>;
  text: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ FeatureIcon, text, index }) => {
  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: spacing.md,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      backgroundColor: colors.white200,
      marginTop: spacing.sm,
      width: "48%",
      height: 60,
      marginRight: index%2===0? spacing.sm:0,
    },
    cardText: {
      fontFamily: fontFamily.regular,
      color: colors.blue500,
      paddingLeft: spacing.md,
      fontSize: fontSize.md,
      lineHeight: fontSize.lg,
      flexShrink: 1,
    },
  });

  return (
    <View style={styles.card}>
      <FeatureIcon width={24} height={24} color={colors.blue500} />
      <Text style={styles.cardText}>{text}</Text>
    </View>
  );
};

export default FeatureCard;
