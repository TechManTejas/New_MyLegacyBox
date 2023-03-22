import React from "react";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SCREEN_NAMES } from "../constants/screenNames";
import DrawerScreen from "../screens/DrawerScreen";
import BottomTabNavigation from "./BottomTabNavigation";
import FeedbackScreen from "../screens/FeedbackScreen";
import { useTheme } from "../theme/ThemeProvider";
import CustomHeaderLeftIcon from "../components/Common/CustomHeaderLeftIcon";
import CustomHeaderTitle from "../components/Common/CustomHeaderTitle";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const {
    theme: { spacing, colors, fontSize, fontFamily },
  } = useTheme();

  const styles = StyleSheet.create({
    headerStyle: {
      backgroundColor: colors.blue100,
    },
    drawerItemHidden: {
      height: 0,
      padding: 0,
      margin: 0,
    },
  });

  return (
    <Drawer.Navigator
      initialRouteName={SCREEN_NAMES.bottomTabNavigator}
      screenOptions={({ navigation }) => ({
        drawerPosition: "right",
        headerStyle: styles.headerStyle,
        headerLeft: () => <CustomHeaderLeftIcon navigation={navigation} />,
        headerTitleAlign: "center",
        headerTitle: (props) => <CustomHeaderTitle {...props} />,
        drawerItemStyle: {
          backgroundColor: colors.white400,
        },
      })}
      drawerContent={(props) => <DrawerScreen {...props} />}
    >
      <Drawer.Screen
        name={SCREEN_NAMES.bottomTabNavigator}
        component={BottomTabNavigation}
        options={{
          headerShown: false,
          drawerItemStyle: styles.drawerItemHidden,
        }}
      />
      <Drawer.Screen
        name={SCREEN_NAMES.feedbackScreen}
        component={FeedbackScreen}
        options={{
          title: "Feedback",
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
