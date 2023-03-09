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
import UpdateBankForm from "../components/Bank/UpdateBankForm";
import AddBankForm from "../components/Bank/AddBankForm";
import BankFinancialHoldingNavigation from "./FinancialHoldingsNavigation/BankFinancialHoldingNavigation";
import BankNavigation from "./FinancialInstitutionNavigation/BankNavigation";
import PostalNavigation from "./FinancialInstitutionNavigation/PostalNavigation";
import PostalFinancialHoldingNavigation from "./FinancialHoldingsNavigation/PostalFinancialHoldingNavigation";
import InsuranceNavigation from "./FinancialInstitutionNavigation/InsuranceNavigation";
import InsuranceFinancialHoldingNavigation from "./FinancialHoldingsNavigation/InsuranceFinancialHoldingNavigation";
import CashNavigation from "./FinancialInstitutionNavigation/CashNavigation";
import CashFinancialHoldingNavigation from "./FinancialHoldingsNavigation/CashFinancialHoldingNavigation";

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

      {/* call the component instead of rendering it to make react navigator happy */}
      {BankNavigation({ Stack })}
      {PostalNavigation({ Stack })}
      {InsuranceNavigation({ Stack })}
      {CashNavigation({ Stack })}

      {BankFinancialHoldingNavigation({ Stack })}
      {PostalFinancialHoldingNavigation({ Stack })}
      {InsuranceFinancialHoldingNavigation({ Stack })}
      {CashFinancialHoldingNavigation({ Stack })}
    </Stack.Navigator>
  );
};

export default HomeNavigation;
