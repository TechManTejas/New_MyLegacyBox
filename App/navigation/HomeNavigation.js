import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREEN_NAMES } from "../constants/screenNames";
import HomeScreen from "../screens/HomeScreen";
import BankListScreen from "../screens/BankListScreen";
import { useTheme } from "../theme/ThemeProvider";
import BankScreen from "../screens/BankScreen";
import CustomHeaderLeftIcon from "../components/Common/CustomHeaderLeftIcon";
import CustomHeaderTitle from "../components/Common/CustomHeaderTitle";
import AddBankForm from "../../_bkp/AddBankFormBkp";
import AddBankHoldingForm from "../components/FinancialHolding/AddBankHoldingForm";
import UpdateBankForm from "../components/Bank/UpdateBankForm";
import UpdateHoldingForm from "../components/FinancialHolding/UpdateHoldingForm";
import PostalListScreen from "../screens/PostalListScreen";
import PostalScreen from "../screens/PostalScreen";
import AddPostalForm from "../components/Postal/AddPostalForm";
import UpdatePostalForm from "../components/Postal/UpdatePostalForm";
import AddPostalHoldingForm from "../components/FinancialHolding/AddPostalHoldingForm";

const Stack = createStackNavigator();

const HomeNavigation = () => {
  const {
    theme: { colors },
  } = useTheme();

  const styles = StyleSheet.create({
    headerStyle: {
      backgroundColor: colors.blue100,
    },
  });

  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAMES.homeScreen}
      screenOptions={({ navigation }) => ({
        headerStyle: styles.headerStyle,
        headerLeft: () => <CustomHeaderLeftIcon navigation={navigation} />,
        headerTitleAlign: "center",
        headerTitle: (props) => <CustomHeaderTitle {...props} />,
      })}
    >
      <Stack.Screen
        name={SCREEN_NAMES.homeScreen}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Group>
        <Stack.Screen
          name={SCREEN_NAMES.addBankFinancialHoldingScreen}
          component={AddBankHoldingForm}
          options={({ route }) => ({
            headerShown: true,
            title: `Add Holding for ${
              route.params?.parentName ? route.params?.parentName : ""
            }`,
          })}
        />
        <Stack.Screen
          name={SCREEN_NAMES.addPostalFinancialHoldingScreen}
          component={AddPostalHoldingForm}
          options={({ route }) => ({
            headerShown: true,
            title: `Add Holding for ${
              route.params?.parentName ? route.params?.parentName : ""
            }`,
          })}
        />
        <Stack.Screen
          name={SCREEN_NAMES.updateFinancialHoldingScreen}
          component={UpdateHoldingForm}
          options={({ route }) => ({
            headerShown: true,
            title: `Update Holding for ${
              route.params?.parentName ? route.params?.parentName : ""
            }`,
          })}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name={SCREEN_NAMES.bankListScreen}
          component={BankListScreen}
          options={{
            headerShown: true,
            title: "Banks",
          }}
        />
        <Stack.Screen
          name={SCREEN_NAMES.bankScreen}
          component={BankScreen}
          options={({ route }) => ({
            headerShown: true,
            title: `${route.params?.bank?.name || ""}, ${
              route.params?.bank?.branchName || ""
            }`,
          })}
        />
        <Stack.Screen
          name={SCREEN_NAMES.addBankScreen}
          component={AddBankForm}
          options={{
            headerShown: true,
            title: "Add Bank",
          }}
        />
        <Stack.Screen
          name={SCREEN_NAMES.updateBankScreen}
          component={UpdateBankForm}
          options={{
            headerShown: true,
            title: "Edit Bank",
          }}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name={SCREEN_NAMES.postalListScreen}
          component={PostalListScreen}
          options={{
            headerShown: true,
            title: "Postals",
          }}
        />
        <Stack.Screen
          name={SCREEN_NAMES.postalScreen}
          component={PostalScreen}
          options={({ route }) => ({
            headerShown: true,
            title: `${route.params?.postal?.name || ""}, ${
              route.params?.postal?.branchName || ""
            }`,
          })}
        />
        <Stack.Screen
          name={SCREEN_NAMES.addPostalScreen}
          component={AddPostalForm}
          options={{
            headerShown: true,
            title: "Add Postal",
          }}
        />
        <Stack.Screen
          name={SCREEN_NAMES.updatePostalScreen}
          component={UpdatePostalForm}
          options={{
            headerShown: true,
            title: "Edit Postal",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeNavigation;
