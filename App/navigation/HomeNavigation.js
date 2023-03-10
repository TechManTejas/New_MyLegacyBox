import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREEN_NAMES } from "../constants/screenNames";
import HomeScreen from "../screens/HomeScreen";
import { useTheme } from "../theme/ThemeProvider";
import CustomHeaderLeftIcon from "../components/Common/CustomHeaderLeftIcon";
import CustomHeaderTitle from "../components/Common/CustomHeaderTitle";
import BankFinancialHoldingNavigation from "./FinancialHoldingsNavigation/BankFinancialHoldingNavigation";
import BankNavigation from "./FinancialInstitutionNavigation/BankNavigation";
import PostalNavigation from "./FinancialInstitutionNavigation/PostalNavigation";
import PostalFinancialHoldingNavigation from "./FinancialHoldingsNavigation/PostalFinancialHoldingNavigation";
import InsuranceNavigation from "./FinancialInstitutionNavigation/InsuranceNavigation";
import InsuranceFinancialHoldingNavigation from "./FinancialHoldingsNavigation/InsuranceFinancialHoldingNavigation";
import CashNavigation from "./FinancialInstitutionNavigation/CashNavigation";
import CashFinancialHoldingNavigation from "./FinancialHoldingsNavigation/CashFinancialHoldingNavigation";
import ProvidentFundNavigation from "./FinancialInstitutionNavigation/ProvidentFundNavigation";
import ProvidentFundFinancialHoldingNavigation from "./FinancialHoldingsNavigation/ProvidentFundFinancialHoldingNavigation";
import RealEstateNavigation from "./FinancialInstitutionNavigation/RealEstateNavigation";
import RealEstateFinancialHoldingNavigation from "./FinancialHoldingsNavigation/RealEstateFinancialHoldingNavigation";
import DematNavigation from "./FinancialInstitutionNavigation/DematNavigation";
import DematFinancialHoldingNavigation from "./FinancialHoldingsNavigation/DematFinancialHoldingNavigation";

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
      {DematNavigation({ Stack })}
      {ProvidentFundNavigation({ Stack })}
      {RealEstateNavigation({ Stack })}

      {BankFinancialHoldingNavigation({ Stack })}
      {PostalFinancialHoldingNavigation({ Stack })}
      {InsuranceFinancialHoldingNavigation({ Stack })}
      {CashFinancialHoldingNavigation({ Stack })}
      {DematFinancialHoldingNavigation({ Stack })}
      {ProvidentFundFinancialHoldingNavigation({ Stack })}
      {RealEstateFinancialHoldingNavigation({ Stack })}
    </Stack.Navigator>
  );
};

export default HomeNavigation;
