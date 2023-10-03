import { SCREEN_NAMES } from "../constants/screenNames";
import { FontAwesomeIconsData } from "./FontawesomeIconsData";

export const MAJOR_SIZE = 50;
export const MINOR_SIZE = 20;

export interface MenuDataProps {
  id: number;
  title: string;
  viewBox: string;
  path: string;
  financialArtifactType: string;
  iconSize: number;
  navigateToScreen: string;
  disabled?: boolean
}

export const HOME_MAJOR_MENU_DATA: Array<MenuDataProps> = [
  {
    id: 1,
    title: "Bank",
    ...FontAwesomeIconsData["Bank"],
    financialArtifactType: "BANK",
    iconSize: MAJOR_SIZE,
    navigateToScreen: SCREEN_NAMES.bankListScreen,
  },
  {
    id: 2,
    title: "Post Office",
    ...FontAwesomeIconsData["Post Office"],
    financialArtifactType: "POSTAL",
    iconSize: MAJOR_SIZE,
    navigateToScreen: SCREEN_NAMES.postalListScreen,
  },
  {
    id: 3,
    title: "Insurance",
    ...FontAwesomeIconsData["Insurance"],
    financialArtifactType: "INSURANCE",
    iconSize: MAJOR_SIZE,
    navigateToScreen: SCREEN_NAMES.insuranceListScreen,
  },

  {
    id: 4,
    title: "Share & Securities",
    ...FontAwesomeIconsData["Share & Securities"],
    financialArtifactType: "DEMAT",
    iconSize: MAJOR_SIZE,
    navigateToScreen: SCREEN_NAMES.sharesAndSecurityScreen,
  },
];

export const HOME_MINOR_MENU_DATA: Array<MenuDataProps> = [
  {
    id: 1,
    title: "Cash",
    ...FontAwesomeIconsData["Cash"],
    financialArtifactType: "CASH",
    iconSize: MINOR_SIZE,
    navigateToScreen: SCREEN_NAMES.cashScreen,
  },
  {
    id: 2,
    title: "Real Estate",
    ...FontAwesomeIconsData["Real Estate"],
    financialArtifactType: "REALESTATE",
    iconSize: MINOR_SIZE,
    navigateToScreen: SCREEN_NAMES.realEstateListScreen,
  },
  {
    id: 3,
    title: "Provident Fund",
    ...FontAwesomeIconsData["Provident Fund"],
    financialArtifactType: "PROVIDENTFUND",
    iconSize: MINOR_SIZE,
    navigateToScreen: SCREEN_NAMES.providentFundScreen,
  },
  {
    id: 4,
    title: "Coming Soon",
    ...FontAwesomeIconsData["Custom Entry"],
    financialArtifactType: "",
    iconSize: MINOR_SIZE,
    navigateToScreen: SCREEN_NAMES.bankListScreen,
    disabled: true,
  },
];
