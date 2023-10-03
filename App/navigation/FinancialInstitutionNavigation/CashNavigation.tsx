import React from "react";
import CashScreen from "../../screens/Assets/CashScreen";
import { StackType } from "../RootNavigator/RootNavigator";

const CashNavigation: React.FC<StackType> = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={"CASH_SCREEN"}
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
