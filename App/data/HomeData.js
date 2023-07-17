import { SCREEN_NAMES } from "../constants/screenNames";
import { FontAwesomeIconsData } from "./FontawesomeIconsData";

const major_size = 50;
const minor_size = 20;

export const HOME_MAJOR_MENU_DATA = [
  {
    id: 1,
    title: "Bank",
    ...FontAwesomeIconsData["Bank"],
    financialArtifactType: "BANK",
    iconSize: major_size,
    navigateToScreen: SCREEN_NAMES.bankListScreen,
  },
  {
    id: 2,
    title: "Post Office",
    ...FontAwesomeIconsData["Post Office"],
    financialArtifactType: "POSTAL",
    iconSize: major_size,
    navigateToScreen: SCREEN_NAMES.postalListScreen,
  },
  {
    id: 3,
    title: "Insurance",
    ...FontAwesomeIconsData["Insurance"],
    financialArtifactType: "INSURANCE",
    iconSize: major_size,
    navigateToScreen: SCREEN_NAMES.insuranceListScreen,
  },
  {
    id: 4,
    title: "Cash",
    ...FontAwesomeIconsData["Cash"],
    financialArtifactType: "CASH",
    iconSize: major_size,
    navigateToScreen: SCREEN_NAMES.cashScreen,
  },
];

export const HOME_MINOR_MENU_DATA = [
  {
    id: 1,
    title: "Share & Securities",
    ...FontAwesomeIconsData["Share & Securities"],
    financialArtifactType: "DEMAT",
    iconSize: minor_size,
    navigateToScreen: SCREEN_NAMES.dematScreen,
  },
  {
    id: 2,
    title: "Real Estate",
    ...FontAwesomeIconsData["Real Estate"],
    financialArtifactType: "REALESTATE",
    iconSize: minor_size,
    navigateToScreen: SCREEN_NAMES.realEstateListScreen,
  },
  {
    id: 3,
    title: "Provident Fund",
    ...FontAwesomeIconsData["Provident Fund"],
    financialArtifactType: "PROVIDENTFUND",
    iconSize: minor_size,
    navigateToScreen: SCREEN_NAMES.providentFundScreen,
  },
  {
    id: 4,
    title: "Custom Entry",
    ...FontAwesomeIconsData["Custom Entry"],
    financialArtifactType: "",
    iconSize: minor_size,
    navigateToScreen: SCREEN_NAMES.bankListScreen,
    disabled: true,
  },
];
