import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);
  const {
    theme: { colors, spacing, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white100,
      marginBottom: spacing.md,
      borderRadius: spacing.sm,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.black100,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    question: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.md,
      color: colors.black500,
      flex: 1,
      marginRight: spacing.sm,
    },
    answerContainer: {
      marginTop: spacing.sm,
      paddingTop: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.black200,
    },
    answer: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      color: colors.black400,
      lineHeight: fontSize.xl,
    },
    icon: {
      fontSize: fontSize.md,
      color: colors.blue500,
    },
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setExpanded(!expanded)} style={styles.header}>
        <Text style={styles.question}>{question}</Text>
        <FontAwesome5
          name={expanded ? "chevron-up" : "chevron-down"}
          style={styles.icon}
        />
      </Pressable>
      {expanded && (
        <View style={styles.answerContainer}>
          <Text style={styles.answer}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

export default FAQItem;
