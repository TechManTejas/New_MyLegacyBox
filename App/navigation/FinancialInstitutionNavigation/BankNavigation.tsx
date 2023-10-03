import React from "react";
import AddBankForm from "../../components/Bank/AddBankForm";
import UpdateBankForm from "../../components/Bank/UpdateBankForm";
import BankListScreen from "../../screens/Assets/BankListScreen";
import BankScreen from "../../screens/Assets/BankScreen";
import { StackType } from "../RootNavigator/RootNavigator";

const BankNavigation: React.FC<StackType> = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={"BANK_LIST_SCREEN"}
        component={BankListScreen}
        options={{
          headerShown: true,
          title: "Banks",
        }}
      />
      <Stack.Screen
        name={"BANK_SCREEN"}
        component={BankScreen}
        options={({ route }) => ({
          headerShown: true,
          title: `${route.params?.bank?.name || ""}, ${
            route.params?.bank?.branchName || ""
          }`,
        })}
      />
      <Stack.Screen
        name={"ADD_BANK_SCREEN"}
        component={AddBankForm}
        options={{
          headerShown: true,
          title: "Add Bank",
        }}
      />
      <Stack.Screen
        name={"UPDATE_BANK_SCREEN"}
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
