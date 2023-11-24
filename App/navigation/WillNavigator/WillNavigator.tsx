import React from "react";
import WillAssetsScreen from "../../screens/Will/WillAssetsScreen";
import WillAssetInfoScreen from "../../screens/Will/WillAssetInfoScreen";
import WillDeclarationScreen from "../../screens/Will/WillDeclarationScreen";
import WillGenerationScreen from "../../screens/Will/WillGenerationScreen";
import { StackType } from "../RootNavigator/RootNavigator";
import WillIndexScreen from "../../screens/Will/WillIndexScreen";
import WillRoleAssigncreen from "../../screens/Will/WillRoleAssignScreen";
import WillAssetIndexScreen from "../../screens/Will/WillAssetIndexScreen";
import WillResidualDistributionScreen from "../../screens/Will/WillResidualDistributionScreen";
import WillSecondaryDistributionScreen from "../../screens/Will/WillSecondaryDistributionScreen";
import WillPreviewScreen from "../../screens/Will/WillPreviewScreen";
import WillSignScreen from "../../screens/Will/WillSignScreen";

const WillNavigator: React.FC<StackType> = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={"WILL_INDEX_SCREEN"}
        component={WillIndexScreen}
        options={{
          headerShown: true,
          title: "My Will",
        }}
      />

      <Stack.Screen
        name={"WILL_ROLE_ASSIGN_SCREEN"}
        component={WillRoleAssigncreen}
        options={{
          headerShown: true,
          title: "Assign Roles",
        }}
      />

      <Stack.Screen
        name={"WILL_ASSET_INDEX_SCREEN"}
        component={WillAssetIndexScreen}
        options={{
          headerShown: true,
          title: "Asset Distribution",
        }}
      />

      <Stack.Screen
        name={"WILL_RESIDUAL_DISTRIBUTION_SCREEN"}
        component={WillResidualDistributionScreen}
        options={{
          headerShown: true,
          title: "Residuary Distribution",
        }}
      />

      <Stack.Screen
        name={"WILL_SECONDARY_DISTRIBUTION_SCREEN"}
        component={WillSecondaryDistributionScreen}
        options={{
          headerShown: true,
          title: "Contigent Distribution",
        }}
      />

      <Stack.Screen
        name={"WILL_PREVIEW_SCREEN"}
        component={WillPreviewScreen}
        options={{
          headerShown: true,
          title: "Will Preview",
        }}
      />

      <Stack.Screen
        name={"WILL_SIGN_SCREEN"}
        component={WillSignScreen}
        options={{
          headerShown: true,
          title: "Will Declaration",
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
          title: "Asset Distribution",
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
