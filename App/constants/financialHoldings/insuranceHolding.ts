export const POLICY_TYPE_MAP = {
  life: "LIFE",
  health: "HEALTH",
  accidental: "ACCIDENTAL",
  general: "GENERAL",
  others: "OTHERS",
};

export const POLICY_BENEFICIERY_MAP = {
  self: "SELF",
  spouse: "SPOUSE",
  father: "FATHER",
  mother: "MOTHER",
  sibling: "SIBLINGS",
  children: "CHILDREN",
  familyFloater: "FAMILY_FLOATER",
  others: "OTHERS",
};

export const POLICY_PREMIUM_FREQUENCY_MAP = {
  monthly: "MONTHLY",
  biMonthly: "BIMONTHLY",
  quarterly: "QUARTERLY",
  halfYearly: "HALFYEARLY",
  annually: "ANNUALLY",
};

export const POLICY_TYPE_TO_TITLE_MAP = {
  [POLICY_TYPE_MAP.life]: "Life",
  [POLICY_TYPE_MAP.health]: "Health",
  [POLICY_TYPE_MAP.accidental]: "Accidental",
  [POLICY_TYPE_MAP.general]: "General",
  [POLICY_TYPE_MAP.others]: "Others",
};

export const POLICY_BENEFICIERY_TO_TITLE_MAP = {
  [POLICY_BENEFICIERY_MAP.self]: "Self",
  [POLICY_BENEFICIERY_MAP.spouse]: "Spouse",
  [POLICY_BENEFICIERY_MAP.father]: "Father",
  [POLICY_BENEFICIERY_MAP.mother]: "Mother",
  [POLICY_BENEFICIERY_MAP.sibling]: "Siblings",
  [POLICY_BENEFICIERY_MAP.children]: "Children",
  [POLICY_BENEFICIERY_MAP.familyFloater]: "Family Floater",
  [POLICY_BENEFICIERY_MAP.others]: "Others",
};

export const POLICY_PREMIUM_FREQUENCY_TO_TITLE_MAP = {
  [POLICY_PREMIUM_FREQUENCY_MAP.monthly]: "Monthly",
  [POLICY_PREMIUM_FREQUENCY_MAP.biMonthly]: "Bi Monthly",
  [POLICY_PREMIUM_FREQUENCY_MAP.quarterly]: "Quarterly",
  [POLICY_PREMIUM_FREQUENCY_MAP.halfYearly]: "Half Yearly",
  [POLICY_PREMIUM_FREQUENCY_MAP.annually]: "Annually",
};
