import React from "react";
import { SCREEN_NAMES } from "../../constants/screenNames";
import AddInsuranceHoldingForm from "../../components/FinancialHolding/InsuranceHolding/AddInsuranceHoldingForm";
import UpdateInsuranceHoldingForm from "../../components/FinancialHolding/InsuranceHolding/UpdateInsuranceHoldingForm";

const InsuranceFinancialHoldingNavigation = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={SCREEN_NAMES.addInsuranceFinancialHoldingScreen}
        component={AddInsuranceHoldingForm}
        options={({ route }) => ({
          headerShown: true,
          title: `Add for ${route.params?.parentName}`,
        })}
      />
      <Stack.Screen
        name={SCREEN_NAMES.updateInsuranceFinancialHoldingScreen}
        component={UpdateInsuranceHoldingForm}
        options={{
          headerShown: true,
          title: "Update insurance holding",
        }}
      />
    </Stack.Group>
  );
};

export default InsuranceFinancialHoldingNavigation;
