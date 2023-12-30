import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnBoardingScreen from "../../screens/OnBoarding/OnBoardingScreen";
import LoginScreen from "../../screens/OnBoarding/LoginScreen";
import RegisterScreen from "../../screens/OnBoarding/RegisterScreen";
import DrawerNavigator from "../DrawerNavigator/DrawerNavigator";
import { useAuth } from "../../authentication/AuthProvider";
import { RootStackParamList } from "../types";
import { StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import CustomHeaderLeftIcon from "../../components/Common/CustomHeaderLeftIcon";
import CustomHeaderTitle from "../../components/Common/CustomHeaderTitle";

const Stack = createStackNavigator<RootStackParamList>();

export interface StackType {
  Stack: typeof Stack;
}

export const RootNavigator: React.FC<{}> = () => {
  const {
    theme: { colors },
  } = useTheme();

  const styles = StyleSheet.create({
    headerStyle: {
      backgroundColor: colors.blue100,
    },
  });

  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: styles.headerStyle,
          headerLeft: () => <CustomHeaderLeftIcon navigation={navigation} />,
          headerTitleAlign: "center",
          headerTitle: (props) => <CustomHeaderTitle {...props} />,
        })}
      >
        {!isAuthenticated ? (
          <Stack.Group>
            <Stack.Screen
              name={"ONBOARDING_SCREEN"}
              component={OnBoardingScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={"LOGIN_SCREEN"}
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={"REGISTER_SCREEN"}
              component={RegisterScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name={"DRAWER_NAVIGATOR"}
              options={{
                headerShown: false,
              }}
            >
              {() => <DrawerNavigator Stack={Stack} />}
            </Stack.Screen>
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
