import { StackNavigationProp } from "@react-navigation/stack";

type Nominee = {
  fullName: string;
};

type Bank = {
  name: string;
  branchName: string;
};

type Insurance = {
  companyName: string;
};

type Postal = {
  branchName: string;
};

export type BottomTabStackParamList = {
  HOME_SCREEN: undefined;
  OHUB_SCREEN: undefined;
  WILL_SCREEN: undefined;
  NOMINEE_SCREEN: undefined;
};

export type DrawerStackParamList = {
  SUB_ROOT_NAVIGATOR: undefined;
  PERSONAL_INFO_SCREEN: undefined;
  NOMINATORS_LIST_SCREEN: undefined;
  FEEDBACK_SCREEN: undefined;
  APP_TOURS_SCREEN: undefined;
  ABOUT_US: undefined;
  PRIVACY_POLICY: undefined;
  FAQ: undefined;
  CONTACT_US: undefined;
  ARCHIVED_ASSETS_SCREEN: undefined;
};

type FinancialInstitutionStackParamList = {
  BANK_LIST_SCREEN: undefined;
  BANK_SCREEN: { bank: Bank };
  ADD_BANK_SCREEN: undefined;
  UPDATE_BANK_SCREEN: undefined;

  CASH_SCREEN: undefined;

  SHARES_AND_SECURITY_SCREEN: undefined;

  DEMAT_SCREEN: undefined;
  PROPRIETORSHIP_SCREEN;
  PARTNERSHIP_SCREEN;
  PRIVATE_LIMITED_COMPANY_SCREEN;

  INSURANCE_LIST_SCREEN: undefined;
  INSURANCE_SCREEN: { insurance: Insurance };
  ADD_INSURANCE_SCREEN: undefined;
  UPDATE_INSURANCE_SCREEN: undefined;

  POSTAL_LIST_SCREEN: undefined;
  POSTAL_SCREEN: { postal: Postal };
  ADD_POSTAL_SCREEN: undefined;
  UPDATE_POSTAL_SCREEN: undefined;

  PROVIDENT_FUND_SCREEN: undefined;

  REAL_ESTATE_LIST_SCREEN: undefined;
  REAL_ESTATE_SCREEN: { realEstateType: string };
};

type FinancialHoldingStackParamList = {
  ADD_BANK_FINANCIAL_HOLDING_SCREEN: { parentName: string };
  UPDATE_BANK_FINANCIAL_HOLDING_SCREEN: undefined;

  ADD_CASH_FINANCIAL_HOLDING_SCREEN: undefined;
  UPDATE_CASH_FINANCIAL_HOLDING_SCREEN: undefined;

  ADD_DEMAT_FINANCIAL_HOLDING_SCREEN: undefined;
  UPDATE_DEMAT_FINANCIAL_HOLDING_SCREEN: undefined;

  ADD_PROPRIETORSHIP_FINANCIAL_HOLDING_SCREEN: undefined;
  UPDATE_PROPRIETORSHIP_FINANCIAL_HOLDING_SCREEN: undefined;

  ADD_PARTNERSHIP_FINANCIAL_HOLDING_SCREEN: undefined;
  UPDATE_PARTNERSHIP_FINANCIAL_HOLDING_SCREEN: undefined;

  ADD_PRIVATE_LIMITED_COMPANY_FINANCIAL_HOLDING_SCREEN: undefined;
  UPDATE_PRIVATE_LIMITED_COMPANY_FINANCIAL_HOLDING_SCREEN: undefined;

  ADD_INSURANCE_FINANCIAL_HOLDING_SCREEN: { parentName: string };
  UPDATE_INSURANCE_FINANCIAL_HOLDING_SCREEN: undefined;

  ADD_POSTAL_FINANCIAL_HOLDING_SCREEN: { parentName: string };
  UPDATE_POSTAL_FINANCIAL_HOLDING_SCREEN: undefined;

  ADD_PROVIDENT_FUND_FINANCIAL_HOLDING_SCREEN: undefined;
  UPDATE_PROVIDENT_FUND_FINANCIAL_HOLDING_SCREEN: undefined;

  ADD_REAL_ESTATE_FINANCIAL_HOLDING_SCREEN: { realEstateType: string };
  UPDATE_REAL_ESTATE_FINANCIAL_HOLDING_SCREEN: undefined;
};

export type NomineeStackParamList = {
  ADD_NOMINEE_SCREEN: undefined;
  UPDATE_NOMINEE_SCREEN: { nominee: Nominee };
  ASSETS_WITH_NOMINEE_SCREEN: { nominee: Nominee };
};

export type SharedArtifactsStackParamList = {
  SHARED_ASSETS_TYPE_LIST_SCREEN: undefined;
  SINGLE_SHARED_ARTIFACT_TYPE_SCREEN: undefined;
  SHARED_ARTIFACTS_SCREEN: undefined;
};

export type WillStackParamList = {
  WILL_SCREEN: undefined;
  WILL_INDEX_SCREEN: undefined;
  WILL_ROLE_ASSIGN_SCREEN: undefined;
  WILL_ASSET_INDEX_SCREEN: undefined;

  WILL_RESIDUAL_DISTRIBUTION_SCREEN: undefined;
  WILL_SECONDARY_DISTRIBUTION_SCREEN: undefined;

  WILL_PREVIEW_SCREEN: undefined;
  WILL_SIGN_SCREEN: undefined;

  WILL_ASSETS_SCREEN: undefined;
  WILL_ASSETS_INFO_SCREEN: undefined;
  WILL_DECLARATION_SCREEN: undefined;
  WILL_GENERATION_SCREEN: undefined;
};

export type SubRootStackParamList = {
  BOTTOM_STACK_NAVIGATOR: undefined;
};

export type PensionBoxParamsList = {
  PENSION_BOX_IFRAME_SCREEN: undefined;
};

export type RootStackParamList = {
  ONBOARDING_SCREEN: undefined;
  LOGIN_SCREEN: undefined;
  REGISTER_SCREEN: undefined;
  DRAWER_NAVIGATOR: undefined;
} & DrawerStackParamList &
  SharedArtifactsStackParamList &
  SubRootStackParamList &
  BottomTabStackParamList &
  NomineeStackParamList &
  WillStackParamList &
  FinancialHoldingStackParamList &
  FinancialInstitutionStackParamList &
  PensionBoxParamsList;

export type AllScreenNavigationProp = StackNavigationProp<RootStackParamList>;
