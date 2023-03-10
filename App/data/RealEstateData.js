import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import {
  REAL_ESTATE_TYPE_MAP,
  REAL_ESTATE_TYPE_TO_TITLE_MAP,
} from "../constants/financialHoldings/realEstateHolding";
import { SCREEN_NAMES } from "../constants/screenNames";

export const REAL_ESTATE_MENU_DATA = [
  {
    id: 1,
    title: REAL_ESTATE_TYPE_TO_TITLE_MAP[REAL_ESTATE_TYPE_MAP.land],
    iconName: "island",
    IconComponent: Fontisto,
    iconSizeMultiplier: 1.1,
    navigateToScreen: SCREEN_NAMES.realEstateScreen,
    navigationParams: {
      realEstateType: REAL_ESTATE_TYPE_MAP.land,
    },
  },
  {
    id: 2,
    title: REAL_ESTATE_TYPE_TO_TITLE_MAP[REAL_ESTATE_TYPE_MAP.residential],
    iconName: "house-user",
    IconComponent: FontAwesome5,
    navigateToScreen: SCREEN_NAMES.realEstateScreen,
    navigationParams: {
      realEstateType: REAL_ESTATE_TYPE_MAP.residential,
    },
  },
  {
    id: 3,
    title: REAL_ESTATE_TYPE_TO_TITLE_MAP[REAL_ESTATE_TYPE_MAP.commercial],
    iconName: "building",
    IconComponent: FontAwesome5,
    navigateToScreen: SCREEN_NAMES.realEstateScreen,
    navigationParams: {
      realEstateType: REAL_ESTATE_TYPE_MAP.commercial,
    },
  },
  {
    id: 4,
    title: REAL_ESTATE_TYPE_TO_TITLE_MAP[REAL_ESTATE_TYPE_MAP.other],
    iconName: "th",
    IconComponent: FontAwesome5,
    navigateToScreen: SCREEN_NAMES.realEstateScreen,
    navigationParams: {
      realEstateType: REAL_ESTATE_TYPE_MAP.other,
    },
  },
];
