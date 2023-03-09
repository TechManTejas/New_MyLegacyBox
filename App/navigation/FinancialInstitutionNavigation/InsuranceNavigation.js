import React from "react";
import AddInsuranceForm from "../../components/Insurance/AddInsuranceForm";
import UpdateInsuranceForm from "../../components/Insurance/UpdateInsuranceForm";
import { SCREEN_NAMES } from "../../constants/screenNames";
import InsuranceListScreen from "../../screens/InsuranceListScreen";
import InsuranceScreen from "../../screens/InsuranceScreen";

const InsuranceNavigation = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={SCREEN_NAMES.insuranceListScreen}
        component={InsuranceListScreen}
        options={{
          headerShown: true,
          title: "Insurances",
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.insuranceScreen}
        component={InsuranceScreen}
        options={({ route }) => ({
          headerShown: true,
          title: `${route.params?.insurance?.companyName || ""}`,
        })}
      />
      <Stack.Screen
        name={SCREEN_NAMES.addinsuranceScreen}
        component={AddInsuranceForm}
        options={{
          headerShown: true,
          title: "Add Insurance",
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.updateinsuranceScreen}
        component={UpdateInsuranceForm}
        options={{
          headerShown: true,
          title: "Edit Insurance",
        }}
      />
    </Stack.Group>
  );
};

export default InsuranceNavigation;
