export const BANK_ACCOUNT_TYPES_MAP = {
  savingsAccount: "SAVINGS",
  currentAccount: "CURRENT",
  fdAccount: "FD",
  rdAccount: "RD",
  nscAccount: "NSC",
  ppfAccount: "PPF",
  odAccount: "OD",
  npsAccount: "NPS",
  personalLoanAccount: "PERSONAL_LOAN",
  houseLoanAccount: "HOUSE_LOAN",
  studyLoanAccount: "STUDY_LOAN",
  vehicleLoanAccount: "VEHICLE_LOAN",
  goldLoanAccount: "GOLD_LOAN",
  businessLoanAccount: "BUSINESS_LOAN",
  otherLoanAccount: "OTHERS",
};
export const BANK_ACCOUNT_OWNERSHIP_MAP = {
  single: "SINGLE",
  joint: "JOINT",
  onBehalfOfMinor: "ON_BEHALF_OF_MINOR",
};

export const BANK_ACCOUNT_TYPES_TO_TITLE_MAP = {
  [BANK_ACCOUNT_TYPES_MAP.savingsAccount]: "Savings",
  [BANK_ACCOUNT_TYPES_MAP.fdAccount]: "Fixed Deposit",
  [BANK_ACCOUNT_TYPES_MAP.currentAccount]: "Current",
  [BANK_ACCOUNT_TYPES_MAP.rdAccount]: "RD",
  [BANK_ACCOUNT_TYPES_MAP.nscAccount]: "NSC",
  [BANK_ACCOUNT_TYPES_MAP.ppfAccount]: "PPF",
  [BANK_ACCOUNT_TYPES_MAP.odAccount]: "OD",
  [BANK_ACCOUNT_TYPES_MAP.npsAccount]: "NPS",
  [BANK_ACCOUNT_TYPES_MAP.personalLoanAccount]: "Personal Loan",
  [BANK_ACCOUNT_TYPES_MAP.houseLoanAccount]: "House Loan",
  [BANK_ACCOUNT_TYPES_MAP.studyLoanAccount]: "Study Loan",
  [BANK_ACCOUNT_TYPES_MAP.vehicleLoanAccount]: "Vehicle Loan",
  [BANK_ACCOUNT_TYPES_MAP.goldLoanAccount]: "Gold Loan",
  [BANK_ACCOUNT_TYPES_MAP.businessLoanAccount]: "Business Loan",
  [BANK_ACCOUNT_TYPES_MAP.otherLoanAccount]: "Other Loan",
};

export const BANK_ACCOUNT_OWNERSHIP_TO_TITLE_MAP = {
  [BANK_ACCOUNT_OWNERSHIP_MAP.single]: "Single",
  [BANK_ACCOUNT_OWNERSHIP_MAP.joint]: "Joint",
  [BANK_ACCOUNT_OWNERSHIP_MAP.onBehalfOfMinor]: "On behalf of minor",
};
