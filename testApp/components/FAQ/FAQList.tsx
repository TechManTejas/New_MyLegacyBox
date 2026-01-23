import React from "react";
import { FlatList, StyleSheet } from "react-native";
import FAQItem from "./FAQItem";
import { useTheme } from "../../theme/ThemeProvider";

interface FAQListProps {
  data: {
    id?: string;
    question: string;
    answer: string;
  }[];
}

const FAQList: React.FC<FAQListProps> = ({ data }) => {
  const {
    theme: { spacing },
  } = useTheme();

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id || Math.random().toString()}
      renderItem={({ item }) => (
        <FAQItem question={item.question} answer={item.answer} />
      )}
      contentContainerStyle={{ paddingBottom: spacing.xl }}
    />
  );
};

export default FAQList;
