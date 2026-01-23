import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useGetFAQsQuery } from "../../redux/api/faq/faqApiSlice";
import FAQList from "./FAQList";

const FAQIndex = () => {
  const {
    theme: { colors, spacing, fontSize },
  } = useTheme();

  const { data, isLoading, isError } = useGetFAQsQuery({});

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: spacing.md,
      backgroundColor: colors.white300,
    },
    errorText: {
      color: colors.red400,
      fontSize: fontSize.md,
      textAlign: "center",
      marginTop: spacing.xl,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.blue500} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load FAQs.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FAQList data={data?.data || []} />
    </View>
  );
};

export default FAQIndex;
