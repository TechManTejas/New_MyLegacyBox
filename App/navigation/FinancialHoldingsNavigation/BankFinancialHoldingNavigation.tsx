import React from "react";
import AddBankHoldingForm from "../../components/FinancialHolding/BankHolding/AddBankHoldingForm";
import UpdateBankHoldingForm from "../../components/FinancialHolding/BankHolding/UpdateBankHoldingForm";
import { StackType } from "../RootNavigator/RootNavigator";

const BankFinancialHoldingNavigation: React.FC<StackType> = ({ Stack }) => {
  return (
    <Stack.Group screenOptions={() => ({})}>
      <Stack.Screen
        name={"ADD_BANK_FINANCIAL_HOLDING_SCREEN"}
        component={AddBankHoldingForm}
        options={({ route }) => ({
          headerShown: true,
          title: `Add Holding for ${
            route.params?.parentName ? route.params?.parentName : ""
          }`,
          tabBarButton: () => null,
          tabBarStyle: { display: "none" },
        })}
      />
      <Stack.Screen
        name={"UPDATE_BANK_FINANCIAL_HOLDING_SCREEN"}
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
