import React from "react";
import AddInsuranceHoldingForm from "../../components/FinancialHolding/InsuranceHolding/AddInsuranceHoldingForm";
import UpdateInsuranceHoldingForm from "../../components/FinancialHolding/InsuranceHolding/UpdateInsuranceHoldingForm";
import { StackType } from "../RootNavigator/RootNavigator";

const InsuranceFinancialHoldingNavigation: React.FC<StackType> = ({
  Stack,
}) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={"ADD_INSURANCE_FINANCIAL_HOLDING_SCREEN"}
        component={AddInsuranceHoldingForm}
        options={({ route }) => ({
          headerShown: true,
          title: `Add for ${route.params?.parentName}`,
        })}
      />
      <Stack.Screen
        name={"UPDATE_INSURANCE_FINANCIAL_HOLDING_SCREEN"}
        component={UpdateInsuranceHoldingForm}
        options={{
          headerShown: true,
          title: "Update Policy Details",
        }}
      />
    </Stack.Group>
  );
};

export default InsuranceFinancialHoldingNavigation;
