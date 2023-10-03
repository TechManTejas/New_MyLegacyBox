import React from "react";
import DematScreen from "../../screens/Assets/DematScreen";
import { StackType } from "../RootNavigator/RootNavigator";
import ProprietorshipScreen from "../../screens/Assets/ProprietorshipScreen";
import PartnershipScreen from "../../screens/Assets/PartnershipScreen";
import PrivateLimitedCompanyScreen from "../../screens/Assets/PrivateLimitedCompanyScreen";

const SharesAndSecurityNavigation: React.FC<StackType> = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={"DEMAT_SCREEN"}
        component={DematScreen}
        options={{
          headerShown: true,
          title: "Demat",
        }}
      />

      <Stack.Screen
        name={"PROPRIETORSHIP_SCREEN"}
        component={ProprietorshipScreen}
        options={{
          headerShown: true,
          title: "Proprietorship",
        }}
      />

      <Stack.Screen
        name={"PARTNERSHIP_SCREEN"}
        component={PartnershipScreen}
        options={{
          headerShown: true,
          title: "Partnership",
        }}
      />

      <Stack.Screen
        name={"PRIVATE_LIMITED_COMPANY_SCREEN"}
        component={PrivateLimitedCompanyScreen}
        options={{
          headerShown: true,
          title: "Private Limited Company",
        }}
      />
    </Stack.Group>
  );
};

export default SharesAndSecurityNavigation;
