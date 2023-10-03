import React from "react";
import AddCashHoldingForm from "../../components/FinancialHolding/CashHolding/AddCashHoldingForm";
import UpdateCashHoldingForm from "../../components/FinancialHolding/CashHolding/UpdateCashHoldingForm";
import { StackType } from "../RootNavigator/RootNavigator";

const CashFinancialHoldingNavigation: React.FC<StackType> = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={"ADD_CASH_FINANCIAL_HOLDING_SCREEN"}
        component={AddCashHoldingForm}
        options={{
          headerShown: true,
          title: "Add Holding for Cash",
        }}
      />
      <Stack.Screen
        name={"UPDATE_CASH_FINANCIAL_HOLDING_SCREEN"}
        component={UpdateCashHoldingForm}
        options={{
          headerShown: true,
          title: "Update cash holding",
        }}
      />
    </Stack.Group>
  );
};

export default CashFinancialHoldingNavigation;
