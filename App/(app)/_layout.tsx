import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useTheme } from "../../testApp/theme/ThemeProvider";
import CustomHeaderLeftIcon from "../../testApp/components/Common/CustomHeaderLeftIcon";
import CustomHeaderTitle from "../../testApp/components/Common/CustomHeaderTitle";
import DrawerScreen from "./drawerscreen";
import { useAuth } from "../../testApp/authentication/AuthProvider";
import { Redirect } from "expo-router";

const DrawerLayout = () => {
  const {
    theme: { colors },
  } = useTheme();

  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) return <Redirect href="/" />

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        initialRouteName="(tabs)"
        screenOptions={{
          headerLeft: () => <CustomHeaderLeftIcon />,
          headerTitleAlign: "center",
          headerTitle: (props: any) => <CustomHeaderTitle {...props} />,
          headerStyle: { backgroundColor: colors.blue100 },
          drawerItemStyle: {
            backgroundColor: colors.white400,
          },
          drawerPosition: "right",
        }}
        drawerContent={(props) => <DrawerScreen {...props} />}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            drawerItemStyle: {
              height: 0,
              padding: 0,
              margin: 0,
            },
          }}
        />

        <Drawer.Screen
          name="personalInfo"
          options={{
            title: "Personal Info",
          }}
        />

        <Drawer.Screen
          name="feedback"
          options={{
            title: "Feedback",
          }}
        />

        <Drawer.Screen
          name="aboutUs"
          options={{
            title: "About us",
          }}
        />
        <Drawer.Screen
          name="privacyPolicy"
          options={{
            title: "Privacy policy",
          }}
        />

        <Drawer.Screen
          name="contactUs"
          options={{
            title: "Contact us",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
