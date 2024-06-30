import React from "react";
import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="recovery" options={{ headerShown: true }} />
    </Stack>
  );
};

export default PublicLayout;
