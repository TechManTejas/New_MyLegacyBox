import * as FIN from "../FinancialInstitutionNavigation";
import * as FHN from "../FinancialHoldingsNavigation";
import React from "react";
import { StackType } from "../RootNavigator/RootNavigator";
import SharesAndScurityListScreen from "../../screens/Assets/SharesAndSecurityListScreen";

const HomeNavigator: React.FC<StackType> = ({ Stack }) => {
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
