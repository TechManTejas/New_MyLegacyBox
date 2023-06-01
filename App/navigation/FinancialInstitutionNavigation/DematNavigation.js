import React from "react";
import { SCREEN_NAMES } from "../../constants/screenNames";
import DematScreen from "../../screens/DematScreen";

const DematNavigation = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={SCREEN_NAMES.dematScreen}
        component={DematScreen}
        options={{
          headerShown: true,
          title: "Share & Securities",
        }}
      />
    </Stack.Group>
  );
};

export default DematNavigation;
