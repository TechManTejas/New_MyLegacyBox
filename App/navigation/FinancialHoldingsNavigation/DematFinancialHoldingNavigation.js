import React from "react";
import { SCREEN_NAMES } from "../../constants/screenNames";
import AddDematHoldingForm from "../../components/FinancialHolding/DematHolding/AddDematHoldingForm";
import UpdateDematHoldingForm from "../../components/FinancialHolding/DematHolding/UpdateDematHoldingForm";

const DematFinancialHoldingNavigation = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={SCREEN_NAMES.addDematFinancialHoldingScreen}
        component={AddDematHoldingForm}
        options={{
          headerShown: true,
          title: "Add Holding",
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.updateDematFinancialHoldingScreen}
        component={UpdateDematHoldingForm}
        options={{
          headerShown: true,
          title: "Update holding",
        }}
      />
    </Stack.Group>
  );
};

export default DematFinancialHoldingNavigation;
