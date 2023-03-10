import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { PROVIDENT_FUND_TYPE_MAP } from "../constants/financialHoldings/providentFundHolding";
import { SCREEN_NAMES } from "../constants/screenNames";

export const PROVIDENT_FUND_MENU_DATA = [
  {
    id: 1,
    title: PROVIDENT_FUND_TYPE_MAP.epf,
    iconName: "user-friends",
    IconComponent: FontAwesome5,
    navigateToScreen: SCREEN_NAMES.providentFundScreen,
    navigationParams: {
      pfType: PROVIDENT_FUND_TYPE_MAP.epf,
    },
  },
  {
    id: 2,
    title: PROVIDENT_FUND_TYPE_MAP.upf,
    iconName: "money-bill",
    IconComponent: FontAwesome5,
    navigateToScreen: SCREEN_NAMES.providentFundScreen,
    navigationParams: {
      pfType: PROVIDENT_FUND_TYPE_MAP.upf,
    },
  },
  {
    id: 3,
    title: PROVIDENT_FUND_TYPE_MAP.rpf,
    iconName: "rupee-sign",
    IconComponent: FontAwesome5,
    navigateToScreen: SCREEN_NAMES.providentFundScreen,
    navigationParams: {
      pfType: PROVIDENT_FUND_TYPE_MAP.rpf,
    },
  },
];
