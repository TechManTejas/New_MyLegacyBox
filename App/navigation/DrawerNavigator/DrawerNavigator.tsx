import React from "react";
import { StyleSheet } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { useTheme } from "../../theme/ThemeProvider";

import CustomHeaderLeftIcon from "../../components/Common/CustomHeaderLeftIcon";
import CustomHeaderTitle from "../../components/Common/CustomHeaderTitle";

import { DrawerStackParamList } from "../types";

import SubRootNavigator from "../SubRootNavigator/SubRootNavigator";

import { StackType } from "../RootNavigator/RootNavigator";

import PersonalInfoScreen from "../../screens/Drawer/PersonalInfoScreen";
import DrawerScreen from "../../screens/Drawer/DrawerScreen";
import FeedbackScreen from "../../screens/Drawer/FeedbackScreen";
import ContactUsScreen from "../../screens/Drawer/ContactUsScreen";
import FAQScreen from "../../screens/Drawer/FAQScreen";
import PrivacyPolicyScreen from "../../screens/Drawer/PrivacyPolicyScreen";
import AboutUsScreen from "../../screens/Drawer/AboutUsScreen";
import NominatorsListScreen from "../../screens/Drawer/SharedArtifacts/NominatorsListScreen";
import AppToursScreen from "../../screens/Drawer/AppToursScreen";
import ArchivedAssetsScreen from "../../screens/Drawer/ArchivedAssetsScreen";

const Drawer = createDrawerNavigator<DrawerStackParamList>();

const DrawerNavigator: React.FC<StackType> = ({ Stack }) => {
  const {
    theme: { colors },
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
        name={"SUB_ROOT_NAVIGATOR"}
        options={{
          headerShown: false,
          drawerItemStyle: styles.drawerItemHidden,
        }}
      >
        {() => <SubRootNavigator Stack={Stack} />}
      </Drawer.Screen>

      <Drawer.Screen
        name={"PERSONAL_INFO_SCREEN"}
        component={PersonalInfoScreen}
        options={{
          title: "Personal Info",
        }}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ goBack: undefined }),
        })}
      />
      <Drawer.Screen
        name={"NOMINATORS_LIST_SCREEN"}
        component={NominatorsListScreen}
        options={{
          title: "Shared with me",
        }}
      />
      <Drawer.Screen
        name={"ARCHIVED_ASSETS_SCREEN"}
        component={ArchivedAssetsScreen}
        options={{
          title: "Archived Assets",
        }}
      />
      <Drawer.Screen
        name={"FEEDBACK_SCREEN"}
        component={FeedbackScreen}
        options={{
          title: "Feedback",
        }}
      />
      <Drawer.Screen
        name={"APP_TOURS_SCREEN"}
        component={AppToursScreen}
        options={{
          title: "App Tours",
        }}
      />
      <Drawer.Screen
        name={"ABOUT_US"}
        component={AboutUsScreen}
        options={{
          title: "About us",
        }}
      />
      <Drawer.Screen
        name={"PRIVACY_POLICY"}
        component={PrivacyPolicyScreen}
        options={{
          title: "Privacy policy",
        }}
      />
      <Drawer.Screen
        name={"FAQ"}
        component={FAQScreen}
        options={{
          title: "FAQ",
        }}
      />
      <Drawer.Screen
        name={"CONTACT_US"}
        component={ContactUsScreen}
        options={{
          title: "Contact us",
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
