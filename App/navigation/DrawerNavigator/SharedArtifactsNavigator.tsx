import React from "react";
import SharedAssetsTypeListScreen from "../../screens/Drawer/SharedArtifacts/SharedAssetsTypeListScreen";
import SingleSharedArtifactTypeScreen from "../../screens/Drawer/SharedArtifacts/SingleSharedArtifactTypeScreen";
import { StackType } from "../RootNavigator/RootNavigator";

const SharedArtifactsNavigator: React.FC<StackType> = ({ Stack }) => {

  return (
      <Stack.Group>
        <Stack.Screen
          name={"SHARED_ASSETS_TYPE_LIST_SCREEN"}
          component={SharedAssetsTypeListScreen}
          options={{
            headerShown: true,
            title: "Shared Smartbox",
          }}
        />

        <Stack.Screen
          name={"SINGLE_SHARED_ARTIFACT_TYPE_SCREEN"}
          component={SingleSharedArtifactTypeScreen}
          options={{
            headerShown: true,
            title: "Shared details",
          }}
        />
      </Stack.Group>
  );
};

export default SharedArtifactsNavigator;
