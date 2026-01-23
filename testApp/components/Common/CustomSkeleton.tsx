import React from "react";
import { View, StyleSheet, Animated } from "react-native";

interface CustomSkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
}

/**
 * A reusable Skeleton component for loading placeholders.
 */
export const CustomSkeleton: React.FC<CustomSkeletonProps> = ({
  width = "100%",
  height = 20,
  borderRadius = 4,
}) => {
  return <View style={[styles.skeleton, { width, height, borderRadius }]} />;
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#e0e0e0",
  },
});
