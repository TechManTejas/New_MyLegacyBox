import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { SCREEN_NAMES } from "../constants/screenNames";
import HomeNavigation from "./HomeNavigation";
import OHubScreen from "../screens/OHubScreen";
import { useTheme } from "../theme/ThemeProvider";
import NomineeNavigation from "./NomineeNavigation";
import UnderDevelopment from "../screens/UnderDevelopment";
import WillNavigation from "./WillNavigation";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const {
    theme: { spacing, colors, fontSize, fontFamily },
  } = useTheme();

  const shouldShowTabBarBottom = useCallback((route, initialScreen) => {
    const routeName = getFocusedRouteNameFromRoute(route) || initialScreen;

    const SHOW_ON_SCREENS = [SCREEN_NAMES.homeScreen];

    return SHOW_ON_SCREENS.indexOf(routeName) > -1;
  }, []);

  const styles = StyleSheet.create({
    tabBar: {
      position: "absolute",
      height: spacing.u52,
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
      initialRouteName={SCREEN_NAMES.willNavigator}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: [styles.tabBar],
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarActiveTintColor: colors.blue500,
      })}
    >
      <BottomTab.Screen
        name={SCREEN_NAMES.homeNavigator}
        component={HomeNavigation}
        options={({ route }) => ({
          title: "Home",
          tabBarStyle: [
            styles.tabBar,
            {
              display: shouldShowTabBarBottom(route, SCREEN_NAMES.homeScreen)
                ? "flex"
                : "none",
            },
          ],
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
        })}
      />

      <BottomTab.Screen
        name={SCREEN_NAMES.ohubScreen}
        component={UnderDevelopment}
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
        name={SCREEN_NAMES.willNavigator}
        component={WillNavigation}
        options={({ route }) => ({
          title: "E-Will",
          tabBarStyle: [
            {
              display: shouldShowTabBarBottom(route, SCREEN_NAMES.nomineeScreen)
                ? "flex"
                : "none",
            },
          ],
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
        })}
      />
      <BottomTab.Screen
        name={SCREEN_NAMES.nomineeNavigator}
        component={NomineeNavigation}
        options={({ route }) => ({
          title: "Nominee",
          tabBarStyle: [
            {
              display: shouldShowTabBarBottom(route, SCREEN_NAMES.nomineeScreen)
                ? "flex"
                : "none",
            },
          ],
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="user-shield"
              size={styles.iconSize.fontSize}
              color={
                focused ? styles.iconColorFoucsed.color : styles.iconColor.color
              }
            />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;
