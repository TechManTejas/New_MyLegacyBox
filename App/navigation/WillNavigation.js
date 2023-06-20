import React from "react";
import { SCREEN_NAMES } from "../constants/screenNames";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "../theme/ThemeProvider";
import CustomHeaderLeftIcon from "../components/Common/CustomHeaderLeftIcon";
import CustomHeaderTitle from "../components/Common/CustomHeaderTitle";
import { StyleSheet } from "react-native";
import WillScreen from "../screens/Will/WillScreen";
import WillPersonalInfoScreen from "../screens/Will/WillPersonalInfoScreen";
import WillWitnessesScreen from "../screens/Will/WillWitnessesScreen";
import WillWitnessInfoScreen from "../screens/Will/WillWitnessInfoScreen";
import WillBeneficiariesScreen from "../screens/Will/WillBeneficiariesScreen";
import WillBeneficiaryInfoScreen from "../screens/Will/WillBeneficiaryInfoScreen";
import WillAssetsScreen from "../screens/Will/WillAssetsScreen";
import WillAssetInfoScreen from "../screens/Will/WillAssetInfoScreen";
import WillExecutorScreen from "../screens/Will/WillExecutorScreen";
import WillExecutorInfoScreen from "../screens/Will/WillExecutorInfoScreen";
import WillDeclarationScreen from "../screens/Will/WillDeclarationScreen";
import WillGenerationScreen from "../screens/Will/WillGenerationScreen";
import WillInfoScreen from "../screens/Will/WillInfoScreen";

const Stack = createStackNavigator();

const WillNavigation = () => {
  const { theme: { colors } } = useTheme();

  const styles = StyleSheet.create({
    headerStyle: {
      backgroundColor: colors.blue100,
    },
  });

  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAMES.willScreen}
      screenOptions={({ navigation }) => ({
        headerStyle: styles.headerStyle,
        headerLeft: () => <CustomHeaderLeftIcon navigation={navigation} />,
        headerTitleAlign: "center",
        headerTitle: (props) => <CustomHeaderTitle {...props} />,
      })}
    >
      <Stack.Group>

        <Stack.Screen
          name={SCREEN_NAMES.willScreen}
          component={WillScreen}
          options={{
            headerShown: true,
            title: "Will",
          }}
        />

        <Stack.Screen
          name={SCREEN_NAMES.willInfoScreen}
          component={WillInfoScreen}
          options={{
            headerShown: true,
            title: "My Will",
          }}
        />


        <Stack.Screen
          name={SCREEN_NAMES.willPersonalInfoScreen}
          component={WillPersonalInfoScreen}
          options={{
            headerShown: true,
            title: "Testator Information",
          }}
        />

        <Stack.Screen
          name={SCREEN_NAMES.willWitnessInfoScreen}
          component={WillWitnessInfoScreen}
          options={{
            headerShown: true,
            title: "Witness to my Will",
          }}
        />

        <Stack.Screen
          name={SCREEN_NAMES.willBeneficiaryInfoScreen}
          component={WillBeneficiaryInfoScreen}
          options={{
            headerShown: true,
            title: "Beneficiary Information",
          }}
        />

        <Stack.Screen
          name={SCREEN_NAMES.willAssetsScreen}
          component={WillAssetsScreen}
          options={{
            headerShown: true,
            title: "My Assets",
          }}
        />

        <Stack.Screen
          name={SCREEN_NAMES.willAssetInfoScreen}
          component={WillAssetInfoScreen}
          options={{
            headerShown: true,
            title: "Asset Allocation",
          }}
        />

        <Stack.Screen
          name={SCREEN_NAMES.willExecutorInfoScreen}
          component={WillExecutorInfoScreen}
          options={{
            headerShown: true,
            title: "Executor of my Will",
          }}
        />

        <Stack.Screen
          name={SCREEN_NAMES.willDeclarationScreen}
          component={WillDeclarationScreen}
          options={{
            headerShown: true,
            title: "Declaration",
          }}
        />

        <Stack.Screen
          name={SCREEN_NAMES.willGenerationScreen}
          component={WillGenerationScreen}
          options={{
            headerShown: true,
            title: "E-Will Generation",
          }}
        />

      </Stack.Group>
    </Stack.Navigator>
  );
};

export default WillNavigation;
