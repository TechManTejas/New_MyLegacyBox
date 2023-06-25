import React from "react";
import { SCREEN_NAMES } from "../constants/screenNames";
import NomineeScreen from "../screens/NomineeScreen";
import AddNomineeForm from "../components/Nominee/AddNomineeForm";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "../theme/ThemeProvider";
import CustomHeaderLeftIcon from "../components/Common/CustomHeaderLeftIcon";
import CustomHeaderTitle from "../components/Common/CustomHeaderTitle";
import { StyleSheet } from "react-native";
import CustomHeaderRightIcon from "../components/Common/CustomHeaderRightIcon";

const Stack = createStackNavigator();

const NomineeNavigation = () => {

  const { theme: { colors } } = useTheme();

  const styles = StyleSheet.create({
    headerStyle: {
      backgroundColor: colors.blue100,
    },
  });

  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAMES.nomineeScreen}
      screenOptions={({ navigation }) => ({
        headerStyle: styles.headerStyle,
        headerLeft: () => <CustomHeaderLeftIcon navigation={navigation} />,
        headerRight: () => <CustomHeaderRightIcon navigation={navigation} />,
        headerTitleAlign: "center",
        headerTitle: (props) => <CustomHeaderTitle {...props} />,
      })}
    >
      <Stack.Group>
        <Stack.Screen
          name={SCREEN_NAMES.nomineeScreen}
          component={NomineeScreen}
          options={{
            headerShown: true,
            title: "Nominees",
          }}
        />

        <Stack.Screen
          name={SCREEN_NAMES.addNomineeScreen}
          component={AddNomineeForm}
          options={{
            headerShown: true,
            title: "Add Nominee",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default NomineeNavigation;
