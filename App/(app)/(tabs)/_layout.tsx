import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useTheme } from "../../../testApp/theme/ThemeProvider";
import CustomHeaderLeftIcon from "../../../testApp/components/Common/CustomHeaderLeftIcon";
import CustomHeaderTitle from "../../../testApp/components/Common/CustomHeaderTitle";
import { Tabs, usePathname } from "expo-router";

const TabLayout = () => {
  const {
    theme: { spacing, colors, fontSize, fontFamily },
  } = useTheme();

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

  const path = usePathname();

  console.log(path);
  

  const shouldShowTabBarBottom = () => {
    if (path.startsWith("/home/")) return false;
    if (path.startsWith("/members")) return false;
    if (path.startsWith("/will")) return false;
    if (path.startsWith("/ohub")) return false;
    return true;
  };

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarStyle: [styles.tabBar],
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarActiveTintColor: colors.blue500,
        
        headerStyle: styles.headerStyle,
        headerLeft: () => <CustomHeaderLeftIcon />,
        headerTitleAlign: "center",
        headerTitle: (props) => <CustomHeaderTitle {...props} />,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarButton: () => null,
          tabBarStyle: [
            styles.tabBar,
            {
              display: shouldShowTabBarBottom() ? "flex" : "none",
            },
          ],
        }}
      />
      <Tabs.Screen
        name="ohub"
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="book-open"
              size={styles.iconSize.fontSize}
              color={
                focused ? styles.iconColorFoucsed.color : styles.iconColor.color
              }
            />
          ),
          tabBarStyle: [
            styles.tabBar,
            {
              display: shouldShowTabBarBottom() ? "flex" : "none",
            },
          ],
        }}
      />
      <Tabs.Screen
        name="will"
        options={{
          title: "My Will",
          tabBarStyle: [
            styles.tabBar,
            {
              display: shouldShowTabBarBottom() ? "flex" : "none",
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
        }}
      />
      <Tabs.Screen
        name="members"
        options={{
          title: "My Circle",
          // headerShown: false,
          tabBarStyle: [
            styles.tabBar,
            {
              display: shouldShowTabBarBottom() ? "flex" : "none",
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
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
