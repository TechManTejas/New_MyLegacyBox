import React from "react";
import { SCREEN_NAMES } from "../../constants/screenNames";
import AddBankHoldingForm from "../../components/FinancialHolding/BankHolding/AddBankHoldingForm";
import UpdateBankHoldingForm from "../../components/FinancialHolding/BankHolding/UpdateBankHoldingForm";

const BankFinancialHoldingNavigation = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={SCREEN_NAMES.addBankFinancialHoldingScreen}
        component={AddBankHoldingForm}
        options={({ route }) => ({
          headerShown: true,
          title: `Add Holding for ${
            route.params?.parentName ? route.params?.parentName : ""
          }`,
        })}
      />
      <Stack.Screen
        name={SCREEN_NAMES.updateBankFinancialHoldingScreen}
        component={UpdateBankHoldingForm}
        options={{
          headerShown: true,
          title: "Update Account Details",
        }}
      />
    </Stack.Group>
  );
};

export default BankFinancialHoldingNavigation;
