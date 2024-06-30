import {
  REAL_ESTATE_TYPE_MAP,
  REAL_ESTATE_TYPE_TO_TITLE_MAP,
} from "../constants/financialHoldings/realEstateHolding";
import { FontAwesomeIconsData } from "./FontawesomeIconsData";

export const HOME_SMARTBOX_LARGE_MENU_DATA = [
  {
    id: "HOME_SMARTBOX_LARGE_MENU_DATA-1",
    title: "Bank",
    ...FontAwesomeIconsData["Bank"],
    // SvgIcon: BankIcon,
    navigateToScreen: "/home/bank/banklist",
  },
  {
    id: "HOME_SMARTBOX_LARGE_MENU_DATA-2",
    title: "Post Office",
    ...FontAwesomeIconsData["Post Office"],
    // SvgIcon: PostalIcon,
    navigateToScreen: "/home/postal/postallist",
  },
  {
    id: "HOME_SMARTBOX_LARGE_MENU_DATA-3",
    title: "Insurance",
    ...FontAwesomeIconsData["Insurance"],
    // SvgIcon: InsuranceIcon,
    navigateToScreen: "/home/insurance/insurancelist",
  },
  {
    id: "HOME_SMARTBOX_LARGE_MENU_DATA-4",
    title: "Share & Securities",
    ...FontAwesomeIconsData["Share & Securities"],
    // SvgIcon: DematIcon,
    navigateToScreen: "/home/shares/shareslist",
  },
];

export const HOME_SMARTBOX_SMALL_MENU_DATA = [
  {
    id: "HOME_SMARTBOX_SMALL_MENU_DATA-1",
    title: "Cash",
    ...FontAwesomeIconsData["Cash"],
    // SvgIcon: CashIcon,
    navigateToScreen: "/home/cash/cash",
  },
  {
    id: "HOME_SMARTBOX_SMALL_MENU_DATA-2",
    title: "Real Estate",
    ...FontAwesomeIconsData["Real Estate"],
    // SvgIcon: RealEstateIcon,
    navigateToScreen: "/home/realestate/realestatelist",
  },
  {
    id: "HOME_SMARTBOX_SMALL_MENU_DATA-3",
    title: "Provident Fund",
    ...FontAwesomeIconsData["Provident Fund"],
    // SvgIcon: ProvidentFundIcon,
    navigateToScreen: "/home/pf/pfs",
  },
  {
    id: "HOME_SMARTBOX_SMALL_MENU_DATA-4",
    title: "Coming Soon",
    ...FontAwesomeIconsData["Custom Entry"],
    // SvgIcon: CommingSoonIcon,
    navigateToScreen: "",
    disabled: true,
  },
];

export const HOME_HEADER_MENU_DATA = [
  {
    id: "HOME_HEADER_MENU_DATA-1",
    title: "Insights",
    ...FontAwesomeIconsData["pieChart"],
    // SvgIcon: ArchivedIcon,
    navigateToScreen: "/home/assetsAndLiabilities/insights",
  },
  {
    id: "HOME_HEADER_MENU_DATA-2",
    title: "Shared",
    ...FontAwesomeIconsData["sharedWithMe"],
    // SvgIcon: SharedIcon,
    navigateToScreen: "/home/nominatorsList",
  },
  {
    id: "HOME_HEADER_MENU_DATA-3",
    title: "FAQs",
    ...FontAwesomeIconsData["faq"],
    // SvgIcon: FaqIcon,
    navigateToScreen: "/home/faq",
  },
  {
    id: "HOME_HEADER_MENU_DATA-4",
    title: "App tour",
    ...FontAwesomeIconsData["appTour"],
    // SvgIcon: TourIcon,
    navigateToScreen: "/home/appTour",
  },
];

export const DEMAT_PRIVATE_SHARES_MENU_DATA = [
  {
    id: "DEMAT_PRIVATE_SHARES_MENU_DATA-1",
    title: "Demat",
    ...FontAwesomeIconsData["demat"],
    navigateToScreen: "/home/shares/demats",
  },
];

export const DEMAT_BUSINESS_SHARES_NEMU_DATA = [
  {
    id: "DEMAT_BUSINESS_SHARES_NEMU_DATA-1",
    title: "Proprietorship",
    ...FontAwesomeIconsData["proprietorship"],
    navigateToScreen: "/home/shares/proprietorships",
  },
  {
    id: "DEMAT_BUSINESS_SHARES_NEMU_DATA-2",
    title: "Partnership",
    ...FontAwesomeIconsData["partnership"],
    navigateToScreen: "/home/shares/partnerships",
  },
  {
    id: "DEMAT_BUSINESS_SHARES_NEMU_DATA-3",
    title: "Private Limited",
    ...FontAwesomeIconsData["privateLimitedCompany"],
    navigateToScreen: "/home/shares/companies",
  },
];

export const REAL_ESTATE_MENU_DATA = [
  {
    id: "REAL_ESTATE_MENU_DATA-1",
    title: REAL_ESTATE_TYPE_TO_TITLE_MAP[REAL_ESTATE_TYPE_MAP.land],
    ...FontAwesomeIconsData["layer"],
    navigateToScreen: "/home/realestate/realestates",
    navigationParams: {
      realEstateType: REAL_ESTATE_TYPE_MAP.land,
    },
  },
  {
    id: "REAL_ESTATE_MENU_DATA-2",
    title: REAL_ESTATE_TYPE_TO_TITLE_MAP[REAL_ESTATE_TYPE_MAP.residential],
    ...FontAwesomeIconsData["residential"],
    navigateToScreen: "/home/realestate/realestates",
    navigationParams: {
      realEstateType: REAL_ESTATE_TYPE_MAP.residential,
    },
  },
  {
    id: "REAL_ESTATE_MENU_DATA-3",
    title: REAL_ESTATE_TYPE_TO_TITLE_MAP[REAL_ESTATE_TYPE_MAP.commercial],
    ...FontAwesomeIconsData["building"],
    navigateToScreen: "/home/realestate/realestates",
    navigationParams: {
      realEstateType: REAL_ESTATE_TYPE_MAP.commercial,
    },
  },
];
