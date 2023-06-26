import React from "react";
import { SCREEN_NAMES } from "../../constants/screenNames";
import AddPostalHoldingForm from "../../components/FinancialHolding/PostalHolding/AddPostalHoldingForm";
import UpdatePostalHoldingForm from "../../components/FinancialHolding/PostalHolding/UpdatePostalHoldingForm";

const PostalFinancialHoldingNavigation = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={SCREEN_NAMES.addPostalFinancialHoldingScreen}
        component={AddPostalHoldingForm}
        options={({ route }) => ({
          headerShown: true,
          title: `Add Account for ${
            route.params?.parentName ? route.params?.parentName : ""
          }`,
        })}
      />
      <Stack.Screen
        name={SCREEN_NAMES.updatePostalFinancialHoldingScreen}
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
