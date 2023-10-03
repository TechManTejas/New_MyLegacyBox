import { FontAwesomeIconsData } from "./FontawesomeIconsData";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

import { SCREEN_NAMES } from "../constants/screenNames";
import { MAJOR_SIZE } from "./HomeData";

export const PRIVATE_SHARES_DATA = [
  {
    id: 1,
    title: "Demat",
    ...FontAwesomeIconsData["demat"],
    iconSize: MAJOR_SIZE,
    navigateToScreen: SCREEN_NAMES.dematScreen,
  },
];

export const BUSINESS_SHARES_DATA = [
  {
    id: 1,
    title: "Proprietorship",
    ...FontAwesomeIconsData["proprietorship"],
    iconSize: MAJOR_SIZE,

    navigateToScreen: SCREEN_NAMES.proprietorshipScreen,
  },
  {
    id: 2,
    title: "Partnership",
    ...FontAwesomeIconsData["partnership"],
    iconSize: MAJOR_SIZE,

    navigateToScreen: SCREEN_NAMES.partnershipScreen,
  },
  {
    id: 3,
    title: "Private Limited",
    ...FontAwesomeIconsData["privateLimitedCompany"],
    iconSize: MAJOR_SIZE,

    navigateToScreen: SCREEN_NAMES.privateLimitedCompanyScreen,
  },
];
