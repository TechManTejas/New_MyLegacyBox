import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { ParamListBase, RouteProp } from "@react-navigation/core";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useTheme } from "../../theme/ThemeProvider";
import { RootStackParamList } from "../types";
import HomeScreen from "../../screens/HomeScreen";
import WillScreen from "../../screens/Will/WillScreen";
import NomineeScreen from "../../screens/MyCircle/NomineeScreen";
import CustomHeaderLeftIcon from "../../components/Common/CustomHeaderLeftIcon";
import CustomHeaderRightIcon from "../../components/Common/CustomHeaderRightIcon";
import CustomHeaderTitle from "../../components/Common/CustomHeaderTitle";
import OHubScreen from "../../screens/OHub/OHubScreen";

const BottomTab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator: React.FC<{}> = () => {
  const {
    theme: { spacing, colors, fontSize, fontFamily },
  } = useTheme();

  const shouldShowTabBarBottom = useCallback(
    (
      route: RouteProp<ParamListBase>,
      initialScreen: keyof RootStackParamList
    ) => {
      const routeName =
        (getFocusedRouteNameFromRoute(route) as keyof RootStackParamList) ||
        initialScreen;

      const SHOW_ON_SCREENS: Array<keyof RootStackParamList> = ["HOME_SCREEN"];

      return SHOW_ON_SCREENS.indexOf(routeName) > -1;
    },
    []
  );

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
      color: colors.blue400,
    },
    iconColorFoucsed: {
      color: colors.blue,
    },
    tabBarLabel: {
      fontFamily: fontFamily.regular,
      paddingBottom: spacing.xs,
      color: colors.blue400,
    },
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
    headerStyle: {
      backgroundColor: colors.blue100,
    },
  });

  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarStyle: [styles.tabBar],
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarActiveTintColor: colors.blue500,

        headerStyle: styles.headerStyle,
        headerLeft: () => <CustomHeaderLeftIcon navigation={navigation} />,
        headerRight: () => <CustomHeaderRightIcon />,
        headerTitleAlign: "center",
        headerTitle: (props) => <CustomHeaderTitle {...props} />,
      })}
    >
      <BottomTab.Screen
        name={"HOME_SCREEN"}
        component={HomeScreen}
        options={({ route }) => ({
          tabBarStyle: [
            styles.tabBar,
            {
              display: shouldShowTabBarBottom(route, "HOME_SCREEN")
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
          headerShown: false,
        })}
      />

      <BottomTab.Screen
        name={"OHUB_SCREEN"}
        component={OHubScreen}
        options={({ route }) => ({
          title: "O-Hub",
          tabBarStyle: [
            {
              display: shouldShowTabBarBottom(route, "OHUB_SCREEN")
                ? "flex"
                : "none",
            },
          ],
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="book-open"
              size={styles.iconSize.fontSize}
              color={
                focused ? styles.iconColorFoucsed.color : styles.iconColor.color
              }
            />
          ),
        })}
      />

      <BottomTab.Screen
        name={"WILL_SCREEN"}
        component={WillScreen}
        options={({ route }) => ({
          title: "My Will",
          tabBarStyle: [
            {
              display: shouldShowTabBarBottom(route, "WILL_SCREEN")
                ? "flex"
                : "none",
            },
          ],
          tabBarIcon: () => (
            <View style={styles.centerTabContainer}>
              <View style={styles.centerTab}>
                <View style={styles.centerTabIconContainer}>
                  <FontAwesome5
                    name="file-contract"
                    size={styles.centerTabIcon.fontSize}
                    color={styles.centerTabIcon.color}
                  />
                </View>
                <Text style={styles.centerTabLabel}>My Will</Text>
              </View>
            </View>
          ),
          tabBarIconStyle: { marginTop: 0 },
          tabBarLabelStyle: { display: "none" },
        })}
      />

      <BottomTab.Screen
        name={"NOMINEE_SCREEN"}
        component={NomineeScreen}
        options={({ route }) => ({
          title: "My Circle",
          tabBarStyle: [
            {
              display: shouldShowTabBarBottom(route, "NOMINEE_SCREEN")
                ? "flex"
                : "none",
            },
          ],
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="user-friends"
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

export default BottomTabNavigator;
