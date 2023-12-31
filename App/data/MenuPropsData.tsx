import {
  REAL_ESTATE_TYPE_MAP,
  REAL_ESTATE_TYPE_TO_TITLE_MAP,
} from "../constants/financialHoldings/realEstateHolding";
import { SCREEN_NAMES } from "../constants/screenNames";
import { FontAwesomeIconsData } from "./FontawesomeIconsData";

import BankIcon from "../assets/icons/bank.svg"
import PostalIcon from "../assets/icons/postal.svg"
import InsuranceIcon from "../assets/icons/insurance.svg"
import DematIcon from "../assets/icons/demat.svg"

import CashIcon from "../assets/icons/cash.svg"
import RealEstateIcon from "../assets/icons/realEstate.svg"
import ProvidentFundIcon from "../assets/icons/pf.svg"
import CommingSoonIcon from "../assets/icons/pen.svg"

import SharedIcon from "../assets/icons/shared.svg"
import ArchivedIcon from "../assets/icons/archived.svg"
import FaqIcon from "../assets/icons/faq.svg"
import TourIcon from "../assets/icons/tour.svg"

export const HOME_SMARTBOX_LARGE_MENU_DATA = [
  {
    id: 1,
    title: "Bank",
    ...FontAwesomeIconsData["Bank"],
    // SvgIcon: BankIcon,
    navigateToScreen: SCREEN_NAMES.bankListScreen,
  },
  {
    id: 2,
    title: "Post Office",
    ...FontAwesomeIconsData["Post Office"],
    // SvgIcon: PostalIcon,
    navigateToScreen: SCREEN_NAMES.postalListScreen,
  },
  {
    id: 3,
    title: "Insurance",
    ...FontAwesomeIconsData["Insurance"],
    // SvgIcon: InsuranceIcon,
    navigateToScreen: SCREEN_NAMES.insuranceListScreen,
  },
  {
    id: 4,
    title: "Share & Securities",
    ...FontAwesomeIconsData["Share & Securities"],
    // SvgIcon: DematIcon,
    navigateToScreen: SCREEN_NAMES.sharesAndSecurityScreen,
  },
];

export const HOME_SMARTBOX_SMALL_MENU_DATA = [
  {
    id: 1,
    title: "Cash",
    ...FontAwesomeIconsData["Cash"],
    // SvgIcon: CashIcon,
    navigateToScreen: SCREEN_NAMES.cashScreen,
  },
  {
    id: 2,
    title: "Real Estate",
    ...FontAwesomeIconsData["Real Estate"],
    // SvgIcon: RealEstateIcon,
    navigateToScreen: SCREEN_NAMES.realEstateListScreen,
  },
  {
    id: 3,
    title: "Provident Fund",
    ...FontAwesomeIconsData["Provident Fund"],
    // SvgIcon: ProvidentFundIcon,
    navigateToScreen: SCREEN_NAMES.providentFundScreen,
  },
  {
    id: 4,
    title: "Coming Soon",
    ...FontAwesomeIconsData["Custom Entry"],
    // SvgIcon: CommingSoonIcon,
    navigateToScreen: SCREEN_NAMES.bankListScreen,
    disabled: true,
  },
];

export const HOME_HEADER_MENU_DATA = [
  {
    id: 1,
    title: "Shared",
    ...FontAwesomeIconsData["sharedWithMe"],
    // SvgIcon: SharedIcon,
    navigateToScreen: SCREEN_NAMES.nominatorsListScreen,
  },
  {
    id: 2,
    title: "Archived",
    ...FontAwesomeIconsData["archived"],
    // SvgIcon: ArchivedIcon,
    navigateToScreen: SCREEN_NAMES.archivedAssetsScreen,
  },
  {
    id: 3,
    title: "FAQs",
    ...FontAwesomeIconsData["faq"],
    // SvgIcon: FaqIcon,
    navigateToScreen: SCREEN_NAMES.faq,
  },
  {
    id: 4,
    title: "App tour",
    ...FontAwesomeIconsData["appTour"],
    // SvgIcon: TourIcon,
    navigateToScreen: SCREEN_NAMES.appTourScreen,
  },
];

export const DEMAT_PRIVATE_SHARES_MENU_DATA = [
  {
    id: 1,
    title: "Demat",
    ...FontAwesomeIconsData["demat"],
    navigateToScreen: SCREEN_NAMES.dematScreen,
  },
];

export const DEMAT_BUSINESS_SHARES_NEMU_DATA = [
  {
    id: 1,
    title: "Proprietorship",
    ...FontAwesomeIconsData["proprietorship"],
    navigateToScreen: SCREEN_NAMES.proprietorshipScreen,
  },
  {
    id: 2,
    title: "Partnership",
    ...FontAwesomeIconsData["partnership"],
    navigateToScreen: SCREEN_NAMES.partnershipScreen,
  },
  {
    id: 3,
    title: "Private Limited",
    ...FontAwesomeIconsData["privateLimitedCompany"],
    navigateToScreen: SCREEN_NAMES.privateLimitedCompanyScreen,
  },
];

export const REAL_ESTATE_MENU_DATA = [
  {
    id: 1,
    title: REAL_ESTATE_TYPE_TO_TITLE_MAP[REAL_ESTATE_TYPE_MAP.land],
    ...FontAwesomeIconsData["layer"],
    navigateToScreen: SCREEN_NAMES.realEstateScreen,
    navigationParams: {
      realEstateType: REAL_ESTATE_TYPE_MAP.land,
    },
  },
  {
    id: 2,
    title: REAL_ESTATE_TYPE_TO_TITLE_MAP[REAL_ESTATE_TYPE_MAP.residential],
    ...FontAwesomeIconsData["residential"],
    navigateToScreen: SCREEN_NAMES.realEstateScreen,
    navigationParams: {
      realEstateType: REAL_ESTATE_TYPE_MAP.residential,
    },
  },
  {
    id: 3,
    title: REAL_ESTATE_TYPE_TO_TITLE_MAP[REAL_ESTATE_TYPE_MAP.commercial],
    ...FontAwesomeIconsData["building"],
    navigateToScreen: SCREEN_NAMES.realEstateScreen,
    navigationParams: {
      realEstateType: REAL_ESTATE_TYPE_MAP.commercial,
    },
  },
];
