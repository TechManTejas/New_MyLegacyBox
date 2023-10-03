import React from "react";
import AddProvidentFundHoldingForm from "../../components/FinancialHolding/ProvidentFundHolding/AddProvidentFundHoldingForm";
import UpdateProvidentFundHoldingForm from "../../components/FinancialHolding/ProvidentFundHolding/UpdateProvidentFundHoldingForm";
import { StackType } from "../RootNavigator/RootNavigator";

const ProvidentFundFinancialHoldingNavigation: React.FC<StackType> = ({
  Stack,
}) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={"ADD_PROVIDENT_FUND_FINANCIAL_HOLDING_SCREEN"}
        component={AddProvidentFundHoldingForm}
        options={{
          headerShown: true,
          title: "Add PF holding",
        }}
      />
      <Stack.Screen
        name={"UPDATE_PROVIDENT_FUND_FINANCIAL_HOLDING_SCREEN"}
        component={UpdateProvidentFundHoldingForm}
        options={{
          headerShown: true,
          title: "Update PF Account",
        }}
      />
    </Stack.Group>
  );
};

export default ProvidentFundFinancialHoldingNavigation;
