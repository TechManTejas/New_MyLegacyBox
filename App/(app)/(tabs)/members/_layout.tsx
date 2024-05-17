import React from "react";
import { Stack } from "expo-router";

const MembersLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="addNominee" />
      <Stack.Screen name="updateNominee" />
      <Stack.Screen name="assetsWithNominee" />
    </Stack>
  );
};

export default MembersLayout;
