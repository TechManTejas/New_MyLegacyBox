import React from "react";
import { SCREEN_NAMES } from "../../constants/screenNames";
import AddCashHoldingForm from "../../components/FinancialHolding/CashHolding/AddCashHoldingForm";
import UpdateCashHoldingForm from "../../components/FinancialHolding/CashHolding/UpdateCashHoldingForm";

const CashFinancialHoldingNavigation = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={SCREEN_NAMES.addCashFinancialHoldingScreen}
        component={AddCashHoldingForm}
        options={{
          headerShown: true,
          title: "Add Holding for Cash",
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.updateCashFinancialHoldingScreen}
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
