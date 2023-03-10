import React from "react";
import { REAL_ESTATE_TYPE_TO_TITLE_MAP } from "../../constants/financialHoldings/realEstateHolding";
import { SCREEN_NAMES } from "../../constants/screenNames";
import RealEstateListScreen from "../../screens/RealEstateListScreen";
import RealEstateScreen from "../../screens/RealEstateScreen";

const RealEstateNavigation = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={SCREEN_NAMES.realEstateListScreen}
        component={RealEstateListScreen}
        options={{
          headerShown: true,
          title: "Real Estate",
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.realEstateScreen}
        component={RealEstateScreen}
        options={({ route }) => ({
          headerShown: true,
          title: route.params?.realEstateType
            ? `${
                REAL_ESTATE_TYPE_TO_TITLE_MAP[route.params?.realEstateType]
              } Holdings`
            : "Real Estate",
        })}
      />
    </Stack.Group>
  );
};

export default RealEstateNavigation;
