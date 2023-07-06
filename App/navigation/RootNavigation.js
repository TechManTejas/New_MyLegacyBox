import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import { SCREEN_NAMES } from "../constants/screenNames";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DrawerNavigation from "./DrawerNavigation";
import { useAuth } from "../authentication/AuthProvider";

const Stack = createNativeStackNavigator();

export const RootNavigation = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: "slide_from_right",
          animationDuration: 1000,
        }}
      >
        {isAuthenticated ? (
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
          <Stack.Screen
            name={SCREEN_NAMES.drawerNavigator}
            component={DrawerNavigation}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
