import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useTheme } from "../../testApp/theme/ThemeProvider";

import PhoneIcon from "../../testApp/assets/icons/phone-outlined.svg";
import { Link, useRouter } from "expo-router";

const QuizCard = () => {
  const router = useRouter();

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    bookCard: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black400,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: spacing.sm,
      marginBottom: spacing.lg,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
    },
    bookTitle: {
      textAlign: "center",
      fontSize: fontSize.lg,
    //   lineHeight: fontSize.xl,
      fontFamily: fontFamily.semiBold,
      paddingBottom: spacing.sm,
    },
    bookText: {
      textAlign: "center",
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.lg,
      paddingBottom: spacing.xs
    },
    bookButton: {
      width: "100%",
      height: 40,
      backgroundColor: colors.blue,
      borderRadius: spacing.sm,
      marginTop: spacing.md,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    bookButtonText: {
      color: colors.white100,
      paddingLeft: spacing.sm,
      fontFamily: fontFamily.semiBold
    },
  });

  return (
    <View style={styles.bookCard}>
      <Text style={styles.bookTitle}>🎈  Fun & Learn  🎈</Text>
      <Text style={styles.bookText}>
        Play  🎯  Learn  📚  Win  🏆
      </Text>
      <Text style={styles.bookText}>
        Win exciting prize if you beat the best
      </Text>

      <Pressable
        onPress={() => {
          router.push("/ohub");
        }}
        style={styles.bookButton}
      >
        <Text style={styles.bookButtonText}>Play</Text>
      </Pressable>
    </View>
  );
};

export default QuizCard;
