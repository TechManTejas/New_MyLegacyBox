import React from "react";
import AddBankForm from "../../components/Bank/AddBankForm";
import UpdateBankForm from "../../components/Bank/UpdateBankForm";
import { SCREEN_NAMES } from "../../constants/screenNames";
import BankListScreen from "../../screens/BankListScreen";
import BankScreen from "../../screens/BankScreen";

const BankNavigation = ({Stack}) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={SCREEN_NAMES.bankListScreen}
        component={BankListScreen}
        options={{
          headerShown: true,
          title: "Banks",
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.bankScreen}
        component={BankScreen}
        options={({ route }) => ({
          headerShown: true,
          title: `${route.params?.bank?.name || ""}, ${
            route.params?.bank?.branchName || ""
          }`,
        })}
      />
      <Stack.Screen
        name={SCREEN_NAMES.addBankScreen}
        component={AddBankForm}
        options={{
          headerShown: true,
          title: "Add Bank",
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.updateBankScreen}
        component={UpdateBankForm}
        options={{
          headerShown: true,
          title: "Edit Bank",
        }}
      />
    </Stack.Group>
  );
};

export default BankNavigation;
