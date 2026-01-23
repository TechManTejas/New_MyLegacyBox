import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CustomBadgeProps {
  label: string;
  color?: string;
  backgroundColor?: string;
}

/**
 * A reusable Badge component for displaying status or labels.
 */
export const CustomBadge: React.FC<CustomBadgeProps> = ({
  label,
  color = "#ffffff",
  backgroundColor = "#6200ee",
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
