import React from "react";
import { SCREEN_NAMES } from "../../constants/screenNames";
import CashScreen from "../../screens/CashScreen";

const CashNavigation = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={SCREEN_NAMES.cashScreen}
        component={CashScreen}
        options={{
          headerShown: true,
          title: "Cash",
        }}
      />
    </Stack.Group>
  );
};

export default CashNavigation;
