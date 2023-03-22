import React from "react";
import { SCREEN_NAMES } from "../../constants/screenNames";
import AddRealEstateHoldingForm from "../../components/FinancialHolding/RealEstateHolding/AddRealEstateHoldingForm";
import UpdateRealEstateHoldingForm from "../../components/FinancialHolding/RealEstateHolding/UpdateRealEstateHoldingForm";
import { REAL_ESTATE_TYPE_TO_TITLE_MAP } from "../../constants/financialHoldings/realEstateHolding";

const RealEstateFinancialHoldingNavigation = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={SCREEN_NAMES.addRealEstateFinancialHoldingScreen}
        component={AddRealEstateHoldingForm}
        options={({ route }) => ({
          headerShown: true,
          title: `Add Holding for ${
            REAL_ESTATE_TYPE_TO_TITLE_MAP[route.params.realEstateType]
          }`,
        })}
      />
      <Stack.Screen
        name={SCREEN_NAMES.updateRealEstateFinancialHoldingScreen}
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
