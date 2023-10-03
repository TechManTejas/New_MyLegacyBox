import React from "react";
import AddInsuranceForm from "../../components/Insurance/AddInsuranceForm";
import UpdateInsuranceForm from "../../components/Insurance/UpdateInsuranceForm";
import InsuranceListScreen from "../../screens/Assets/InsuranceListScreen";
import InsuranceScreen from "../../screens/Assets/InsuranceScreen";
import { StackType } from "../RootNavigator/RootNavigator";

const InsuranceNavigation: React.FC<StackType> = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={"INSURANCE_LIST_SCREEN"}
        component={InsuranceListScreen}
        options={{
          headerShown: true,
          title: "Insurances",
        }}
      />
      <Stack.Screen
        name={"INSURANCE_SCREEN"}
        component={InsuranceScreen}
        options={({ route }) => ({
          headerShown: true,
          title: `${route.params?.insurance?.companyName || ""}`,
        })}
      />
      <Stack.Screen
        name={"ADD_INSURANCE_SCREEN"}
        component={AddInsuranceForm}
        options={{
          headerShown: true,
          title: "Add Insurer",
        }}
      />
      <Stack.Screen
        name={"UPDATE_INSURANCE_SCREEN"}
        component={UpdateInsuranceForm}
        options={{
          headerShown: true,
          title: "Edit Insurer",
        }}
      />
    </Stack.Group>
  );
};

export default InsuranceNavigation;
