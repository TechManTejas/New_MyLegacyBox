import React from "react";
import { REAL_ESTATE_TYPE_TO_TITLE_MAP } from "../../constants/financialHoldings/realEstateHolding";
import RealEstateListScreen from "../../screens/Assets/RealEstateListScreen";
import RealEstateScreen from "../../screens/Assets/RealEstateScreen";
import { StackType } from "../RootNavigator/RootNavigator";

const RealEstateNavigation: React.FC<StackType> = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={"REAL_ESTATE_LIST_SCREEN"}
        component={RealEstateListScreen}
        options={{
          headerShown: true,
          title: "Real Estate",
        }}
      />
      <Stack.Screen
        name={"REAL_ESTATE_SCREEN"}
        component={RealEstateScreen}
        options={({ route }) => ({
          headerShown: true,
          title: route.params?.realEstateType
            ? `${REAL_ESTATE_TYPE_TO_TITLE_MAP[route.params?.realEstateType]}`
            : "Real Estate",
        })}
      />
    </Stack.Group>
  );
};

export default RealEstateNavigation;
