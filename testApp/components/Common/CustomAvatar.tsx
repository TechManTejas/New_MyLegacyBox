import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface CustomAvatarProps {
  source?: string;
  initials?: string;
  size?: number;
}

/**
 * A reusable Avatar component for users.
 */
export const CustomAvatar: React.FC<CustomAvatarProps> = ({
  source,
  initials,
  size = 40,
}) => {
  const containerStyle = { width: size, height: size, borderRadius: size / 2 };

  return (
    <View style={[styles.container, containerStyle]}>
      {source ? (
        <Image source={{ uri: source }} style={containerStyle} />
      ) : (
        <Text style={[styles.initials, { fontSize: size * 0.4 }]}>
          {initials || "?"}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  initials: {
    color: "#fff",
    fontWeight: "bold",
  },
});
