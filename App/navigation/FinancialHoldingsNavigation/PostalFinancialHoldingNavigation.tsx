import React from "react";
import AddPostalHoldingForm from "../../components/FinancialHolding/PostalHolding/AddPostalHoldingForm";
import UpdatePostalHoldingForm from "../../components/FinancialHolding/PostalHolding/UpdatePostalHoldingForm";
import { StackType } from "../RootNavigator/RootNavigator";

const PostalFinancialHoldingNavigation: React.FC<StackType> = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={"ADD_POSTAL_FINANCIAL_HOLDING_SCREEN"}
        component={AddPostalHoldingForm}
        options={({ route }) => ({
          headerShown: true,
          title: `Add Account for ${
            route.params?.parentName ? route.params?.parentName : ""
          }`,
        })}
      />
      <Stack.Screen
        name={"UPDATE_POSTAL_FINANCIAL_HOLDING_SCREEN"}
        component={UpdatePostalHoldingForm}
        options={{
          headerShown: true,
          title: "Update Account Details",
        }}
      />
    </Stack.Group>
  );
};

export default PostalFinancialHoldingNavigation;
