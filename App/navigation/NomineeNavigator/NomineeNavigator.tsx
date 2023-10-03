import React from "react";
import AddNomineeForm from "../../components/Nominee/AddNomineeForm";
import AssetsWithNomineeScreen from "../../screens/MyCircle/AssetsWithNomineeScreen";
import UpdateNomineeForm from "../../components/Nominee/UpdateNomineeForm";
import { StackType } from "../RootNavigator/RootNavigator";

const NomineeNavigator: React.FC<StackType> = ({ Stack }) => {
  return (
    <Stack.Group>

      <Stack.Screen
        name={"ADD_NOMINEE_SCREEN"}
        component={AddNomineeForm}
        options={{
          headerShown: true,
          title: "Add A Member",
        }}
      />

      <Stack.Screen
        name={"UPDATE_NOMINEE_SCREEN"}
        component={UpdateNomineeForm}
        options={({ route }) => ({
          headerShown: true,
          title: `Edit ${route.params?.nominee.fullName}'s Details`,
        })}
      />

      <Stack.Screen
        name={"ASSETS_WITH_NOMINEE_SCREEN"}
        component={AssetsWithNomineeScreen}
        options={({ route }) => ({
          headerShown: true,
          title: `Shared With ${route.params?.nominee}`,
        })}
      />
    </Stack.Group>
  );
};

export default NomineeNavigator;
