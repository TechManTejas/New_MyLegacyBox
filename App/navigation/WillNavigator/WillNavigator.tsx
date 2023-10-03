import React from "react";
import WillAssetsScreen from "../../screens/Will/WillAssetsScreen";
import WillAssetInfoScreen from "../../screens/Will/WillAssetInfoScreen";
import WillDeclarationScreen from "../../screens/Will/WillDeclarationScreen";
import WillGenerationScreen from "../../screens/Will/WillGenerationScreen";
import WillInfoScreen from "../../screens/Will/WillInfoScreen";
import { StackType } from "../RootNavigator/RootNavigator";

const WillNavigator: React.FC<StackType> = ({ Stack }) => {
  return (
    <Stack.Group>

      <Stack.Screen
        name={"WILL_INFO_SCREEN"}
        component={WillInfoScreen}
        options={{
          headerShown: true,
          title: "My Will",
        }}
      />

      <Stack.Screen
        name={"WILL_ASSETS_SCREEN"}
        component={WillAssetsScreen}
        options={{
          headerShown: true,
          title: "My Assets",
        }}
      />

      <Stack.Screen
        name={"WILL_ASSETS_INFO_SCREEN"}
        component={WillAssetInfoScreen}
        options={{
          headerShown: true,
          title: "Asset Allocation",
        }}
      />

      <Stack.Screen
        name={"WILL_DECLARATION_SCREEN"}
        component={WillDeclarationScreen}
        options={{
          headerShown: true,
          title: "Declaration",
        }}
      />

      <Stack.Screen
        name={"WILL_GENERATION_SCREEN"}
        component={WillGenerationScreen}
        options={{
          headerShown: true,
          title: "E-Will Generation",
        }}
      />
    </Stack.Group>
  );
};

export default WillNavigator;
