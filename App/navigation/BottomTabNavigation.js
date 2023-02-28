import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { SCREEN_NAMES } from "../constants/screenNames";
import HomeNavigation from "./HomeNavigation";
import WillScreen from "../screens/WillScreen";
import OHubScreen from "../screens/OHubScreen";
import NomineeScreen from "../screens/NomineeScreen";
import { useTheme } from "../theme/ThemeProvider";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const {
    theme: { spacing, colors, fontSize, fontFamily },
  } = useTheme();

  const shouldHideTabBarBottom = useCallback((route) => {
    const routeName =
      getFocusedRouteNameFromRoute(route) || SCREEN_NAMES.homeScreen;

    const HIDE_FROM_SCREENS = [
      SCREEN_NAMES.bankListScreen,
      SCREEN_NAMES.bankScreen,
      SCREEN_NAMES.addBankScreen,
      SCREEN_NAMES.addFinancialHoldingScreen,
      SCREEN_NAMES.updateBankScreen,
      SCREEN_NAMES.updateFinancialHoldingScreen,
    ];

    return HIDE_FROM_SCREENS.indexOf(routeName) > -1;
  }, []);

  const styles = StyleSheet.create({
    tabBar: {
      position: "absolute",
      height: spacing.xxxl + spacing.xs,
      backgroundColor: colors.white100,
    },
    tabBarIcon: {
      marginTop: spacing.sm,
    },
    iconSize: {
      fontSize: fontSize.lg,
    },
    iconColor: {
      color: colors.black300,
    },
    iconColorFoucsed: {
      color: colors.blue,
    },
    tabBarLabel: {
      fontFamily: fontFamily.regular,
      paddingBottom: spacing.xs,
    },
    // center tab
    centerTabContainer: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      flex: 1,
      flexDirection: "row",
      alignItems: "stretch",
      justifyContent: "center",
    },
    centerTab: {
      position: "absolute",
      top: -spacing.xxl,
      bottom: spacing.xs,
      paddingTop: spacing.xxs,
      paddingHorizontal: spacing.xl,
      backgroundColor: colors.blue,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: spacing.xxxl,
      borderWidth: spacing.xxxs,
      borderColor: colors.white100,
      elevation: 5,
    },
    centerTabIconContainer: { marginBottom: spacing.sm },
    centerTabIcon: {
      color: colors.white100,
      fontSize: fontSize.xxl,
    },
    centerTabLabel: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.sm,
      color: colors.white100,
    },
  });

  return (
    <BottomTab.Navigator
      initialRouteName={SCREEN_NAMES.homeScreen}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: [
          {
            display: shouldHideTabBarBottom(route) ? "none" : "flex",
          },
          styles.tabBar,
        ],
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarActiveTintColor: colors.blue500,
      })}
    >
      <BottomTab.Screen
        name={SCREEN_NAMES.homeNavigator}
        component={HomeNavigation}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="home"
              size={styles.iconSize.fontSize}
              color={
                focused ? styles.iconColorFoucsed.color : styles.iconColor.color
              }
            />
          ),
          tabBarButton: () => null,
        }}
      />

      <BottomTab.Screen
        name={SCREEN_NAMES.ohubScreen}
        component={OHubScreen}
        options={{
          title: "O-Hub",
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="book-open"
              size={styles.iconSize.fontSize}
              color={
                focused ? styles.iconColorFoucsed.color : styles.iconColor.color
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={SCREEN_NAMES.willScreen}
        component={WillScreen}
        options={{
          title: "E-Will",
          tabBarIcon: ({ focused }) => (
            <View style={styles.centerTabContainer}>
              <View style={styles.centerTab}>
                <View style={styles.centerTabIconContainer}>
                  <FontAwesome5
                    name="file-contract"
                    size={styles.centerTabIcon.fontSize}
                    color={styles.centerTabIcon.color}
                  />
                </View>
                <Text style={styles.centerTabLabel}>E-Will</Text>
              </View>
            </View>
          ),
          tabBarIconStyle: { marginTop: 0 },
          tabBarLabelStyle: { display: "none" },
        }}
      />
      <BottomTab.Screen
        name={SCREEN_NAMES.nomineeScreen}
        component={NomineeScreen}
        options={{
          title: "Nominee",
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="user-shield"
              size={styles.iconSize.fontSize}
              color={
                focused ? styles.iconColorFoucsed.color : styles.iconColor.color
              }
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;
