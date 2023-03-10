import React from "react";
import { SCREEN_NAMES } from "../../constants/screenNames";
import ProvidentFundListScreen from "../../screens/ProvidentFundListScreen";
import ProvidentFundScreen from "../../screens/ProvidentFundScreen";

const ProvidentFundNavigation = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={SCREEN_NAMES.providentFundListScreen}
        component={ProvidentFundListScreen}
        options={{
          headerShown: true,
          title: "Provident Fund",
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.providentFundScreen}
        component={ProvidentFundScreen}
        options={({ route }) => ({
          headerShown: true,
          title: `${route.params?.pfType} Holdings` || "Provicent Fund",
        })}
      />
    </Stack.Group>
  );
};

export default ProvidentFundNavigation;
