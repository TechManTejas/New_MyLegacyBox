export const POSTAL_ACCOUNT_TYPES_MAP = {
  savingsAccount: "SAVINGS",
  fdAccount: "FD",
  rdAccount: "RD",
  nscAccount: "NSC",
  ppfAccount: "PPF",
  loanAccount: "LOAN",
  odAccount: "OD",
  npsAccount: "NPS",
};
export const POSTAL_ACCOUNT_OWNERSHIP_MAP = {
  singe: "SINGLE",
  joint: "JOINT",
  onBehalfOfMinor: "ONBEHALFOFMINOR",
};

export const POSTAL_ACCOUNT_TYPES_TO_TITLE_MAP = {
  [POSTAL_ACCOUNT_TYPES_MAP.savingsAccount]: "Savings",
  [POSTAL_ACCOUNT_TYPES_MAP.fdAccount]: "Fixed Deposit",
  [POSTAL_ACCOUNT_TYPES_MAP.rdAccount]: "RD Account",
  [POSTAL_ACCOUNT_TYPES_MAP.nscAccount]: "NSC Account",
  [POSTAL_ACCOUNT_TYPES_MAP.ppfAccount]: "PPF Account",
  [POSTAL_ACCOUNT_TYPES_MAP.loanAccount]: "Loan",
  [POSTAL_ACCOUNT_TYPES_MAP.odAccount]: "OD Account",
  [POSTAL_ACCOUNT_TYPES_MAP.npsAccount]: "NPS Account",
};

export const POSTAL_ACCOUNT_OWNERSHIP_TO_TITLE_MAP = {
  [POSTAL_ACCOUNT_OWNERSHIP_MAP.singe]: "single",
  [POSTAL_ACCOUNT_OWNERSHIP_MAP.joint]: "joint",
  [POSTAL_ACCOUNT_OWNERSHIP_MAP.onBehalfOfMinor]: "on behalf of minor",
};
