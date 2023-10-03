import React from "react";
import AddDematHoldingForm from "../../components/FinancialHolding/DematHolding/AddDematHoldingForm";
import UpdateDematHoldingForm from "../../components/FinancialHolding/DematHolding/UpdateDematHoldingForm";
import { StackType } from "../RootNavigator/RootNavigator";
import AddProprietorshipHoldingForm from "../../components/FinancialHolding/ProprietorshipHolding/AddProprietorshipHoldingForm";
import UpdateProprietorshipHoldingForm from "../../components/FinancialHolding/ProprietorshipHolding/UpdateProprietorshipHoldingForm";
import AddPartnershipHoldingForm from "../../components/FinancialHolding/PartnershipHolding/AddPartnershipHoldingForm";
import UpdatePartnershipHoldingForm from "../../components/FinancialHolding/PartnershipHolding/UpdatePartnershipHoldingForm";
import AddPrivateLimitedCompanyHoldingForm from "../../components/FinancialHolding/PrivateLimitedCompanyHolding/AddPrivateLimitedCompanyHoldingForm";
import UpdatePrivateLimitedCompanyHoldingForm from "../../components/FinancialHolding/PrivateLimitedCompanyHolding/UpdatePrivateLimitedCompanyHoldingForm";

const SharesAndSecurityFinancialHoldingNavigation: React.FC<StackType> = ({
  Stack,
}) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={"ADD_DEMAT_FINANCIAL_HOLDING_SCREEN"}
        component={AddDematHoldingForm}
        options={{
          headerShown: true,
          title: "Add Demat Holding",
        }}
      />
      <Stack.Screen
        name={"UPDATE_DEMAT_FINANCIAL_HOLDING_SCREEN"}
        component={UpdateDematHoldingForm}
        options={{
          headerShown: true,
          title: "Update Demat holding",
        }}
      />

      <Stack.Screen
        name={"ADD_PROPRIETORSHIP_FINANCIAL_HOLDING_SCREEN"}
        component={AddProprietorshipHoldingForm}
        options={{
          headerShown: true,
          title: "Add Proprietorship Holding",
        }}
      />
      <Stack.Screen
        name={"UPDATE_PROPRIETORSHIP_FINANCIAL_HOLDING_SCREEN"}
        component={UpdateProprietorshipHoldingForm}
        options={{
          headerShown: true,
          title: "Update Proprietorship holding",
        }}
      />

      <Stack.Screen
        name={"ADD_PARTNERSHIP_FINANCIAL_HOLDING_SCREEN"}
        component={AddPartnershipHoldingForm}
        options={{
          headerShown: true,
          title: "Add Partnership Holding",
        }}
      />
      <Stack.Screen
        name={"UPDATE_PARTNERSHIP_FINANCIAL_HOLDING_SCREEN"}
        component={UpdatePartnershipHoldingForm}
        options={{
          headerShown: true,
          title: "Update Partnership holding",
        }}
      />

      <Stack.Screen
        name={"ADD_PRIVATE_LIMITED_COMPANY_FINANCIAL_HOLDING_SCREEN"}
        component={AddPrivateLimitedCompanyHoldingForm}
        options={{
          headerShown: true,
          title: "Add Private Limited Holding",
        }}
      />
      <Stack.Screen
        name={"UPDATE_PRIVATE_LIMITED_COMPANY_FINANCIAL_HOLDING_SCREEN"}
        component={UpdatePrivateLimitedCompanyHoldingForm}
        options={{
          headerShown: true,
          title: "Update Private Limited holding",
        }}
      />
    </Stack.Group>
  );
};

export default SharesAndSecurityFinancialHoldingNavigation;
