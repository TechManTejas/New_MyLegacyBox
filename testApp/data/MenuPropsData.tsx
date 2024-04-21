import {
  REAL_ESTATE_TYPE_MAP,
  REAL_ESTATE_TYPE_TO_TITLE_MAP,
} from "../constants/financialHoldings/realEstateHolding";
import { FontAwesomeIconsData } from "./FontawesomeIconsData";

export const HOME_SMARTBOX_LARGE_MENU_DATA = [
  {
    id: 1,
    title: "Bank",
    ...FontAwesomeIconsData["Bank"],
    // SvgIcon: BankIcon,
    navigateToScreen: "/drawer/home/bank/banklist",
  },
  {
    id: 2,
    title: "Post Office",
    ...FontAwesomeIconsData["Post Office"],
    // SvgIcon: PostalIcon,
    navigateToScreen: "/drawer/home/postal/postallist",
  },
  {
    id: 3,
    title: "Insurance",
    ...FontAwesomeIconsData["Insurance"],
    // SvgIcon: InsuranceIcon,
    navigateToScreen: "/drawer/home/insurance/insurancelist",
  },
  {
    id: 4,
    title: "Share & Securities",
    ...FontAwesomeIconsData["Share & Securities"],
    // SvgIcon: DematIcon,
    navigateToScreen: "/drawer/home/shares/shareslist",
  },
];

export const HOME_SMARTBOX_SMALL_MENU_DATA = [
  {
    id: 1,
    title: "Cash",
    ...FontAwesomeIconsData["Cash"],
    // SvgIcon: CashIcon,
    navigateToScreen: "/drawer/home/cash/cash",
  },
  {
    id: 2,
    title: "Real Estate",
    ...FontAwesomeIconsData["Real Estate"],
    // SvgIcon: RealEstateIcon,
    navigateToScreen: "/drawer/home/realestate/realestatelist",
  },
  {
    id: 3,
    title: "Provident Fund",
    ...FontAwesomeIconsData["Provident Fund"],
    // SvgIcon: ProvidentFundIcon,
    navigateToScreen: "/drawer/home/pf/pfs",
  },
  {
    id: 4,
    title: "Coming Soon",
    ...FontAwesomeIconsData["Custom Entry"],
    // SvgIcon: CommingSoonIcon,
    navigateToScreen: "",
    disabled: true,
  },
];

export const HOME_HEADER_MENU_DATA = [
  {
    id: 1,
    title: "Shared",
    ...FontAwesomeIconsData["sharedWithMe"],
    // SvgIcon: SharedIcon,
    navigateToScreen: "/drawer/home/nominatorsList",
  },
  {
    id: 2,
    title: "Archived",
    ...FontAwesomeIconsData["archived"],
    // SvgIcon: ArchivedIcon,
    navigateToScreen: "/drawer/home/archived",
  },
  {
    id: 3,
    title: "FAQs",
    ...FontAwesomeIconsData["faq"],
    // SvgIcon: FaqIcon,
    navigateToScreen: "/drawer/home/faq",
  },
  {
    id: 4,
    title: "App tour",
    ...FontAwesomeIconsData["appTour"],
    // SvgIcon: TourIcon,
    navigateToScreen: "/drawer/home/appTour",
  },
];

export const DEMAT_PRIVATE_SHARES_MENU_DATA = [
  {
    id: 1,
    title: "Demat",
    ...FontAwesomeIconsData["demat"],
    navigateToScreen: "/drawer/home/shares/demats",
  },
];

export const DEMAT_BUSINESS_SHARES_NEMU_DATA = [
  {
    id: 1,
    title: "Proprietorship",
    ...FontAwesomeIconsData["proprietorship"],
    navigateToScreen: "/drawer/home/shares/proprietorships",
  },
  {
    id: 2,
    title: "Partnership",
    ...FontAwesomeIconsData["partnership"],
    navigateToScreen: "/drawer/home/shares/partnerships",
  },
  {
    id: 3,
    title: "Private Limited",
    ...FontAwesomeIconsData["privateLimitedCompany"],
    navigateToScreen: "/drawer/home/shares/companies",
  },
];

export const REAL_ESTATE_MENU_DATA = [
  {
    id: 1,
    title: REAL_ESTATE_TYPE_TO_TITLE_MAP[REAL_ESTATE_TYPE_MAP.land],
    ...FontAwesomeIconsData["layer"],
    navigateToScreen: "/drawer/home/realestate/realestates",
    navigationParams: {
      realEstateType: REAL_ESTATE_TYPE_MAP.land,
    },
  },
  {
    id: 2,
    title: REAL_ESTATE_TYPE_TO_TITLE_MAP[REAL_ESTATE_TYPE_MAP.residential],
    ...FontAwesomeIconsData["residential"],
    navigateToScreen: "/drawer/home/realestate/realestates",
    navigationParams: {
      realEstateType: REAL_ESTATE_TYPE_MAP.residential,
    },
  },
  {
    id: 3,
    title: REAL_ESTATE_TYPE_TO_TITLE_MAP[REAL_ESTATE_TYPE_MAP.commercial],
    ...FontAwesomeIconsData["building"],
    navigateToScreen: "/drawer/home/realestate/realestates",
    navigationParams: {
      realEstateType: REAL_ESTATE_TYPE_MAP.commercial,
    },
  },
];
