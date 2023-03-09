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
  parent: "PARENT",
  children: "CHILDREN",
  family: "FAMILY",
  floater: "FLOATER",
  others: "OTHERS",
};

export const POLICY_TYPE_TO_TITLE_MAP = {
  [POLICY_TYPE_MAP.life]: "Life Insurance",
  [POLICY_TYPE_MAP.health]: "Health Insurance",
  [POLICY_TYPE_MAP.accidental]: "Accidental Insurance",
  [POLICY_TYPE_MAP.general]: "General Insurance",
  [POLICY_TYPE_MAP.others]: "Other",
};

export const POLICY_BENEFICIERY_TO_TITLE_MAP = {
  [POLICY_BENEFICIERY_MAP.self]: "Self",
  [POLICY_BENEFICIERY_MAP.spouse]: "Spouse",
  [POLICY_BENEFICIERY_MAP.parent]: "Parent",
  [POLICY_BENEFICIERY_MAP.children]: "Children",
  [POLICY_BENEFICIERY_MAP.family]: "Family",
  [POLICY_BENEFICIERY_MAP.floater]: "Floater",
  [POLICY_BENEFICIERY_MAP.others]: "Others",
}