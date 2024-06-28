import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../testApp/theme/ThemeProvider";

interface KeyValueCardProps {
  keyValueList: {
    key: string;
    value: string;
  }[];
}

const KeyValueCard: React.FC<KeyValueCardProps> = ({ keyValueList }) => {
  const {
    theme: { colors, spacing, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    card: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      borderWidth: 0.5,
      borderRadius: spacing.sm,
      marginBottom: spacing.sm,
      borderColor: colors.blue500,
      backgroundColor: colors.white100,
      marginHorizontal: spacing.md
    },
    pair: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: spacing.xs
    },
    key: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
      color: colors.blue500
    },
    value: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default
    },
  });

  return (
    <View style={styles.card}>
      {keyValueList.map(({ key, value }, index) => {
        return (
          <View style={styles.pair} key={index}>
            <Text style={styles.key}>{key}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default KeyValueCard;
