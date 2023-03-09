export const BANK_ACCOUNT_TYPES_MAP = {
  savingsAccount: "SAVINGS",
  fdAccount: "FD",
  rdAccount: "RD",
  nscAccount: "NSC",
  ppfAccount: "PPF",
  loanAccount: "LOAN",
  odAccount: "OD",
  npsAccount: "NPS",
};
export const BANK_ACCOUNT_OWNERSHIP_MAP = {
  singe: "SINGLE",
  joint: "JOINT",
  onBehalfOfMinor: "ON_BEHALF_OF_MINOR",
};

export const BANK_ACCOUNT_TYPES_TO_TITLE_MAP = {
  [BANK_ACCOUNT_TYPES_MAP.savingsAccount]: "Savings",
  [BANK_ACCOUNT_TYPES_MAP.fdAccount]: "Fixed Deposit",
  [BANK_ACCOUNT_TYPES_MAP.rdAccount]: "RD Account",
  [BANK_ACCOUNT_TYPES_MAP.nscAccount]: "NSC Account",
  [BANK_ACCOUNT_TYPES_MAP.ppfAccount]: "PPF Account",
  [BANK_ACCOUNT_TYPES_MAP.loanAccount]: "Loan",
  [BANK_ACCOUNT_TYPES_MAP.odAccount]: "OD Account",
  [BANK_ACCOUNT_TYPES_MAP.npsAccount]: "NPS Account",
};

export const BANK_ACCOUNT_OWNERSHIP_TO_TITLE_MAP = {
  [BANK_ACCOUNT_OWNERSHIP_MAP.singe]: "single",
  [BANK_ACCOUNT_OWNERSHIP_MAP.joint]: "joint",
  [BANK_ACCOUNT_OWNERSHIP_MAP.onBehalfOfMinor]: "on behalf of minor",
};
