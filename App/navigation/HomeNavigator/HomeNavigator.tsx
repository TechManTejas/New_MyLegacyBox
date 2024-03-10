import * as FIN from "../FinancialInstitutionNavigation";
import * as FHN from "../FinancialHoldingsNavigation";
import React from "react";
import { StackType } from "../RootNavigator/RootNavigator";
import SharesAndScurityListScreen from "../../screens/Assets/SharesAndSecurityListScreen";
import ArchivedAssetsScreen from "../../screens/Drawer/ArchivedAssetsScreen";
import AppToursScreen from "../../screens/Drawer/AppToursScreen";
import FAQScreen from "../../screens/Drawer/FAQScreen";
import PensionBoxIframeScreen from "../../screens/PensionBox/PensionBoxIframeScreen";
import { StyleSheet } from "react-native";
import PensionBoxHeader from "../../components/Home/PensionBoxHeader";

const HomeNavigator: React.FC<StackType> = ({ Stack }) => {
  const styles = StyleSheet.create({
    headerStyle: {
      backgroundColor: "red",
    },
  });

  return (
    <Stack.Group>
      <Stack.Screen
        name={"SHARES_AND_SECURITY_SCREEN"}
        component={SharesAndScurityListScreen}
        options={{
          headerShown: true,
          title: "Share & Securities",
        }}
      />

      <Stack.Screen
        name={"PENSION_BOX_IFRAME_SCREEN"}
        component={PensionBoxIframeScreen}
        options={{
          headerShown: true,
          header: PensionBoxHeader,
        }}
      />

      <Stack.Screen
        name={"ARCHIVED_ASSETS_SCREEN"}
        component={ArchivedAssetsScreen}
        options={{
          title: "Archived Assets",
        }}
      />
      <Stack.Screen
        name={"APP_TOURS_SCREEN"}
        component={AppToursScreen}
        options={{
          title: "App Tours",
        }}
      />
      <Stack.Screen
        name={"FAQ"}
        component={FAQScreen}
        options={{
          title: "FAQ",
        }}
      />

      {FIN.BankNavigation({ Stack })}
      {FIN.PostalNavigation({ Stack })}
      {FIN.InsuranceNavigation({ Stack })}
      {FIN.CashNavigation({ Stack })}
      {FIN.SharesAndSecurityNavigation({ Stack })}
      {FIN.ProvidentFundNavigation({ Stack })}
      {FIN.RealEstateNavigation({ Stack })}

      {FHN.BankFinancialHoldingNavigation({ Stack })}
      {FHN.PostalFinancialHoldingNavigation({ Stack })}
      {FHN.InsuranceFinancialHoldingNavigation({ Stack })}
      {FHN.CashFinancialHoldingNavigation({ Stack })}
      {FHN.SharesAndSecurityFinancialHoldingNavigation({ Stack })}
      {FHN.ProvidentFundFinancialHoldingNavigation({ Stack })}
      {FHN.RealEstateFinancialHoldingNavigation({ Stack })}
    </Stack.Group>
  );
};

export default HomeNavigator;
