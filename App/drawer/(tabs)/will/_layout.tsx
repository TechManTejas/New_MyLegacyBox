import React from "react";
import { Stack } from "expo-router";

const WillLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="willindex" />
      <Stack.Screen name="willroleassign" />
      <Stack.Screen name="willassetindex" />
      <Stack.Screen name="willassetinfo" />
      <Stack.Screen name="willassets" />
      <Stack.Screen name="willpreview" />
      <Stack.Screen name="willresidualdist" />
      <Stack.Screen name="willsecondarydist" />
      <Stack.Screen name="willsign" />
    </Stack>
  );
};

export default WillLayout;
