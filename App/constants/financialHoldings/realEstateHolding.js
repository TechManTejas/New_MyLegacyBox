export const REAL_ESTATE_TYPE_MAP = {
  land: "LAND",
  residential: "RESIDENTIAL",
  commercial: "COMMERCIAL",
};

export const REAL_ESTATE_OWNERSHIP_STATUS_MAP = {
  owned: "OWNED",
  joint: "JOINT",
  onBehalfOfSomeOneElse: "ON_BEHALF_OF_SOMEONE_ELSE",
};

export const REAL_ESTATE_PROPERTY_AREA_UNIT_MAP = {
  sqMeter: "SQMETER",
  sqYard: "SQYARD",
  sqFeet: "SQFEET",
  yard: "YARD",
  gaj: "GAJ",
  gattha: "GATTHA",
  hath: "HATH",
  dismil: "DISMIL",
  acre: "ACRE",
};

export const REAL_ESTATE_TYPE_TO_TITLE_MAP = {
  [REAL_ESTATE_TYPE_MAP.land]: "Land",
  [REAL_ESTATE_TYPE_MAP.residential]: "Residential",
  [REAL_ESTATE_TYPE_MAP.commercial]: "Commercial",
  [REAL_ESTATE_TYPE_MAP.other]: "Other",
};

export const REAL_ESTATE_OWNERSHIP_STATUS_TO_TITLE_MAP = {
  [REAL_ESTATE_OWNERSHIP_STATUS_MAP.owned]: "Owned",
  [REAL_ESTATE_OWNERSHIP_STATUS_MAP.joint]: "Joint",
  [REAL_ESTATE_OWNERSHIP_STATUS_MAP.onBehalfOfSomeOneElse]:
    "On behalf of someone else",
};

export const REAL_ESTATE_PROPERTY_AREA_UNIT_TO_TITLE_MAP = {
  [REAL_ESTATE_PROPERTY_AREA_UNIT_MAP.sqMeter]: "sq. mt",
  [REAL_ESTATE_PROPERTY_AREA_UNIT_MAP.sqYard]: "sq. yard",
  [REAL_ESTATE_PROPERTY_AREA_UNIT_MAP.sqFeet]: "sq. ft",
  [REAL_ESTATE_PROPERTY_AREA_UNIT_MAP.yard]: "yard",
  [REAL_ESTATE_PROPERTY_AREA_UNIT_MAP.gaj]: "gaj",
  [REAL_ESTATE_PROPERTY_AREA_UNIT_MAP.gattha]: "gattha",
  [REAL_ESTATE_PROPERTY_AREA_UNIT_MAP.hath]: "hath",
  [REAL_ESTATE_PROPERTY_AREA_UNIT_MAP.dismil]: "dismil",
  [REAL_ESTATE_PROPERTY_AREA_UNIT_MAP.acre]: "acre",
};
