import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SCREEN_NAMES } from "../constants/screenNames";
import DrawerScreen from "../screens/DrawerScreen";
import BottomTabNavigation from "./BottomTabNavigation";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName={SCREEN_NAMES.bottomTabNavigator}
      screenOptions={{ drawerPosition: "right" }}
      drawerContent={(props) => <DrawerScreen {...props} />}
    >
      <Drawer.Screen
        name={SCREEN_NAMES.bottomTabNavigator}
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
