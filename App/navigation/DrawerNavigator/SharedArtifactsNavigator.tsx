import React from "react";
import { StackType } from "../RootNavigator/RootNavigator";
import NominatorsListScreen from "../../screens/Drawer/SharedArtifacts/NominatorsListScreen";
import SharedArtifactsScreen from "../../screens/Drawer/SharedArtifacts/SharedArtifactsScreen";

const SharedArtifactsNavigator: React.FC<StackType> = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={"NOMINATORS_LIST_SCREEN"}
        component={NominatorsListScreen}
        options={{
          title: "Shared",
        }}
      />

      <Stack.Screen
        name={"SHARED_ARTIFACTS_SCREEN"}
        component={SharedArtifactsScreen}
        options={{
          headerShown: true,
          title: "Shared Artifacts",
        }}
      />
    </Stack.Group>
  );
};

export default SharedArtifactsNavigator;
