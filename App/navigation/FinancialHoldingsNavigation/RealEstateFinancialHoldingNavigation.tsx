import React from "react";
import AddRealEstateHoldingForm from "../../components/FinancialHolding/RealEstateHolding/AddRealEstateHoldingForm";
import UpdateRealEstateHoldingForm from "../../components/FinancialHolding/RealEstateHolding/UpdateRealEstateHoldingForm";
import { REAL_ESTATE_TYPE_TO_TITLE_MAP } from "../../constants/financialHoldings/realEstateHolding";
import { StackType } from "../RootNavigator/RootNavigator";

const RealEstateFinancialHoldingNavigation: React.FC<StackType> = ({
  Stack,
}) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={"ADD_REAL_ESTATE_FINANCIAL_HOLDING_SCREEN"}
        component={AddRealEstateHoldingForm}
        options={({ route }) => ({
          headerShown: true,
          title: `Add ${
            REAL_ESTATE_TYPE_TO_TITLE_MAP[route.params.realEstateType]
          } Details`,
        })}
      />
      <Stack.Screen
        name={"UPDATE_REAL_ESTATE_FINANCIAL_HOLDING_SCREEN"}
        component={UpdateRealEstateHoldingForm}
        options={{
          headerShown: true,
          title: "Update Real estate holding",
        }}
      />
    </Stack.Group>
  );
};

export default RealEstateFinancialHoldingNavigation;
