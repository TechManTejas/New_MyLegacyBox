import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../authentication/AuthProvider";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import { SCREEN_NAMES } from "../constants/screenNames";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DrawerNavigation from "./DrawerNavigation";

const Stack = createStackNavigator();

export const RootNavigation = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <>
            <Stack.Screen
              name={SCREEN_NAMES.onBoardingScreen}
              component={OnBoardingScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={SCREEN_NAMES.loginScreen}
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={SCREEN_NAMES.registerScreen}
              component={RegisterScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={SCREEN_NAMES.drawerNavigator}
              component={DrawerNavigation}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
