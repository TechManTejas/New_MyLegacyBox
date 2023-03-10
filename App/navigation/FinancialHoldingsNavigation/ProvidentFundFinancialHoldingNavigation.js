import React from "react";
import { SCREEN_NAMES } from "../../constants/screenNames";
import AddProvidentFundHoldingForm from "../../components/FinancialHolding/ProvidentFundHolding/AddProvidentFundHoldingForm";
import UpdateProvidentFundHoldingForm from "../../components/FinancialHolding/ProvidentFundHolding/UpdateProvidentFundHoldingForm";

const ProvidentFundFinancialHoldingNavigation = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={SCREEN_NAMES.addProvidentFundFinancialHoldingScreen}
        component={AddProvidentFundHoldingForm}
        options={({ route }) => ({
          headerShown: true,
          title: `Add Holding for ${route.params.pfType}`,
        })}
      />
      <Stack.Screen
        name={SCREEN_NAMES.updateProvidentFundFinancialHoldingScreen}
        component={UpdateProvidentFundHoldingForm}
        options={{
          headerShown: true,
          title: "Update PF holding",
        }}
      />
    </Stack.Group>
  );
};

export default ProvidentFundFinancialHoldingNavigation;
