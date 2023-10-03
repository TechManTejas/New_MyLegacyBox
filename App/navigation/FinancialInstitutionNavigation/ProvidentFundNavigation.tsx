import React from "react";
import ProvidentFundScreen from "../../screens/Assets/ProvidentFundScreen";
import { StackType } from "../RootNavigator/RootNavigator";

const ProvidentFundNavigation: React.FC<StackType> = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={"PROVIDENT_FUND_SCREEN"}
        component={ProvidentFundScreen}
        options={{
          headerShown: true,
          title: "Provident Fund",
        }}
      />
    </Stack.Group>
  );
};

export default ProvidentFundNavigation;
