import { Linking, StyleSheet } from "react-native";
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

  const { theme: { colors } } = useTheme();

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
      <Drawer.Screen
        name={"tab2"}
        component={FeedbackScreen}
        options={{
          title: "About us",
        }}
        listeners={() => ({
          drawerItemPress: (e) => {
            e.preventDefault()
            Linking.openURL("https://www.oiconomos.com/")
          }
        })}
      />
      <Drawer.Screen
        name={"tab3"}
        component={FeedbackScreen}
        options={{
          title: "Privacy Policy",
        }}
        listeners={() => ({
          drawerItemPress: (e) => {
            e.preventDefault()
            Linking.openURL("https://www.oiconomos.com/privacy-policy")
          }
        })}
      />
      <Drawer.Screen
        name={"tab4"}
        component={FeedbackScreen}
        options={{
          title: "FAQ",
        }}
        listeners={() => ({
          drawerItemPress: (e) => {
            e.preventDefault()
            Linking.openURL("https://www.oiconomos.com/faq")
          }
        })}
      />
      <Drawer.Screen
        name={"tab5"}
        component={FeedbackScreen}
        options={{
          title: "Contact Us",
        }}
        listeners={() => ({
          drawerItemPress: (e) => {
            e.preventDefault()
            Linking.openURL("https://www.oiconomos.com/")
          }
        })}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
