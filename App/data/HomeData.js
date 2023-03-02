import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { SCREEN_NAMES } from "../constants/screenNames";

export const HOME_MAJOR_MENU_DATA = [
  {
    id: 1,
    title: "Banks",
    iconName: "university",
    IconComponent: FontAwesome5,
    navigateToScreen: SCREEN_NAMES.bankListScreen,
  },
  {
    id: 2,
    title: "Postal",
    iconName: "landmark",
    IconComponent: FontAwesome5,
    navigateToScreen: SCREEN_NAMES.postalListScreen,
  },
  {
    id: 3,
    title: "Insurance",
    iconName: "house-damage",
    IconComponent: FontAwesome5,
    navigateToScreen: SCREEN_NAMES.bankListScreen,
  },
  {
    id: 4,
    title: "Unsecured Loans",
    iconName: "hand-holding-usd",
    IconComponent: FontAwesome5,
    navigateToScreen: SCREEN_NAMES.bankListScreen,
  },
];

export const HOME_MINOR_MENU_DATA = [
  {
    id: 1,
    title: "Demat",
    iconName: "chart-line",
    IconComponent: FontAwesome5,
    navigateToScreen: SCREEN_NAMES.bankListScreen,
  },
  {
    id: 2,
    title: "Real Estate",
    iconName: "hotel",
    IconComponent: FontAwesome5,
    navigateToScreen: SCREEN_NAMES.bankListScreen,
  },
  {
    id: 3,
    title: "Provident Fund",
    iconName: "funnel-dollar",
    IconComponent: FontAwesome5,
    navigateToScreen: SCREEN_NAMES.bankListScreen,
  },
  {
    id: 4,
    title: "Custom Entry",
    iconName: "signature",
    IconComponent: FontAwesome5,
    navigateToScreen: SCREEN_NAMES.bankListScreen,
  },
];
