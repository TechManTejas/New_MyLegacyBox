import {
  PRIVATE_LIMITED_COMPANY_TYPE_MAP,
  PRIVATE_LIMITED_COMPANY_TYPE_MAP_TO_TITLE_MAP,
} from "./../constants/financialHoldings/privateLimitedHolding";
import {
  BANK_ACCOUNT_OWNERSHIP_TO_TITLE_MAP,
  BANK_ACCOUNT_TYPES_TO_TITLE_MAP,
} from "../constants/financialHoldings/bankHolding";
import { CASH_TYPE_TO_TITLE_MAP } from "../constants/financialHoldings/cashHolding";
import { DEMAT_TYPE_MAP_TO_TITLE_MAP } from "../constants/financialHoldings/dematHolding";
import {
  POLICY_BENEFICIERY_TO_TITLE_MAP,
  POLICY_PREMIUM_FREQUENCY_TO_TITLE_MAP,
  POLICY_TYPE_TO_TITLE_MAP,
} from "../constants/financialHoldings/insuranceHolding";
import {
  POSTAL_ACCOUNT_OWNERSHIP_TO_TITLE_MAP,
  POSTAL_ACCOUNT_TYPES_TO_TITLE_MAP,
} from "../constants/financialHoldings/postalHolding";
import { PROVIDENT_FUND_TYPE_TO_TITLE_MAP } from "../constants/financialHoldings/providentFundHolding";
import {
  REAL_ESTATE_OWNERSHIP_STATUS_TO_TITLE_MAP,
  REAL_ESTATE_PROPERTY_AREA_UNIT_TO_TITLE_MAP,
} from "../constants/financialHoldings/realEstateHolding";
import { numberWithCommas } from "../utils/manipulators";

const BANK = (item) => {
  return {
    holdingClass: item?.holdingClass,
    updatedAt: item?.updatedAt,
    title: BANK_ACCOUNT_TYPES_TO_TITLE_MAP[item?.holding.accountType],
    tagLabel: BANK_ACCOUNT_OWNERSHIP_TO_TITLE_MAP[item?.holding.ownership],
    content: [
      {
        key: "Account Number",
        value: item?.holding.accountNumber,
      },
      {
        key: "Amount",
        value: item?.holding.amount
          ? `Rs. ${numberWithCommas(item?.holding.amount)}`
          : "Not Available",
      },
      {
        key: "Nominee",
        value: item?.holding.nominee || "Not Available",
      },
    ],
  };
};

const POSTAL = (item) => {
  return {
    updatedAt: item?.updatedAt,
    holdingClass: item?.holdingClass,
    title: POSTAL_ACCOUNT_TYPES_TO_TITLE_MAP[item?.holding.accountType],
    tagLabel: POSTAL_ACCOUNT_OWNERSHIP_TO_TITLE_MAP[item?.holding.ownership],
    content: [
      {
        key: "Account Number",
        value: item?.holding.accountNumber,
      },
      {
        key: "Amount",
        value: item?.holding.amount
          ? `Rs. ${numberWithCommas(item?.holding.amount)}`
          : "Not Available",
      },
      {
        key: "Nominee",
        value: item?.holding.nominee || "Not Available",
      },
    ],
  };
};

const INSURANCE = (item) => {
  return {
    holdingClass: item?.holdingClass,
    title: item?.holding.policyName,
    updatedAt: item?.updatedAt,
    tagLabel: POLICY_TYPE_TO_TITLE_MAP[item?.holding.policyType],
    content: [
      { key: "Home Branch", value: item?.holding.homeBranch },
      {
        key: "Policy Number",
        value: item?.holding.policyNumber,
      },
      {
        key: "Beneficiary",
        value: POLICY_BENEFICIERY_TO_TITLE_MAP[item?.holding.beneficiary],
      },
      {
        key: "Nominee",
        value: item?.holding.nominee || "Not Available",
      },
      { type: "divider" },
      {
        key: "Policy Amount",
        value: item?.holding.policyAmount
          ? `Rs. ${numberWithCommas(item?.holding.policyAmount)}`
          : "Not Available",
      },
      {
        key: "Date of Maturity",
        value: new Date(item?.holding.dateOfMaturity)
          .toDateString()
          .replace(/^\w+ /, ""),
      },
      { type: "divider" },
      {
        key: "Premium Amount",
        value: item?.holding.premiumAmount
          ? `Rs. ${numberWithCommas(item?.holding.premiumAmount)}`
          : "Not Available",
      },
      {
        key: "Date of Premium",
        value: new Date(item?.holding.dateOfPremium)
          .toDateString()
          .replace(/^\w+ /, ""),
      },
      {
        key: "Premium Frequency",
        value: item?.holding.premiumFrequency
          ? POLICY_PREMIUM_FREQUENCY_TO_TITLE_MAP[
              item?.holding.premiumFrequency
            ]
          : "Not Available",
      },
    ],
  };
};

const CASH = (item) => {
  return {
    holdingClass: item?.holdingClass,
    updatedAt: item?.updatedAt,
    title: item?.holding.nameOfParty,
    tagLabel: CASH_TYPE_TO_TITLE_MAP[item?.holding.cashType],
    content: [
      {
        key: "Phone Number",
        value: item?.holding.phoneNumberOfParty,
      },
      {
        key: "Date of Transaction",
        value: new Date(item?.holding.dateOfTransaction)
          .toDateString()
          .replace(/^\w+ /, ""),
      },
      {
        key: "Amount",
        value: item?.holding.amount
          ? `Rs. ${numberWithCommas(item?.holding.amount)}`
          : "Not Available",
      },
      {
        key: "Nominee",
        value: item?.holding.nominee || "Not Available",
      },
      {
        key: "Address",
        value: item?.holding.address
          ? `${item?.holding.address.street},\n ${item?.holding.address.city}, ${item?.holding.address.state}, ${item?.holding.address.pinCode}`
          : "Not Available",
      },
    ],
  };
};

const DEMAT = (item) => {
  return {
    title: item?.holding.broker,
    updatedAt: item?.updatedAt,
    holdingClass: item?.holdingClass,
    tagLabel: DEMAT_TYPE_MAP_TO_TITLE_MAP[item?.holding.dematType],
    content: [
      { key: "Customer ID", value: item?.holding.customerId },
      {
        key: "Nominee",
        value: item?.holding.nominee || "Not Available",
      },
      { type: "divider" },
      {
        key: "Relationship Manager",
        value: item?.holding.poc || "Not available",
      },
      {
        key: "Relationship Manager's Contact",
        value: item?.holding.pocNumber || "Not available",
      },
      { type: "divider" },
      {
        key: "Invested Amount",
        value: item?.holding.investedAmount
          ? `Rs. ${numberWithCommas(item?.holding.investedAmount)}`
          : "Not available",
      },
    ],
  };
};

const PROPRIETORSHIP = (item) => {
  return {
    title: item?.holding.organisationName,
    updatedAt: item?.updatedAt,
    holdingClass: item?.holdingClass,
    content: [{ key: "GST Number", value: item?.holding.gstNumber }],
  };
};

const PARTNERSHIP = (item) => {
  return {
    title: item?.holding.nameOfFirm,
    updatedAt: item.updatedAt,
    holdingClass: item?.holdingClass,
    content: [
      { key: "PAN Number", value: item?.holding.panNumber },
      {
        key: "Holding %",
        value: item?.holding.percentageHolding,
      },
    ],
  };
};

const PRIVATELIMITEDCOMPANY = (item) => {
  return {
    widthKey: 45,
    title: item?.holding.nameOfCompany,
    updatedAt: item?.updatedAt,
    holdingClass: item?.holdingClass,
    tagLabel:
      PRIVATE_LIMITED_COMPANY_TYPE_MAP_TO_TITLE_MAP[
        item?.holding.natureOfInvestment
      ],
    content: [
      { key: "CIN Number", value: item?.holding.cinNumber },
      ...(item?.holding.natureOfInvestment ===
        PRIVATE_LIMITED_COMPANY_TYPE_MAP.equity ||
      item?.holding.natureOfInvestment ===
        PRIVATE_LIMITED_COMPANY_TYPE_MAP.preference
        ? [
            {
              key: "No of Shares held",
              value: item?.holding.noOfSharesHeld,
            },
            {
              key: "Share Certificate Number",
              value: item?.holding.shareCertificateNumber,
            },
          ]
        : [
            {
              key: "No of Shares granted",
              value: item?.holding.noOfSharesGranted,
            },
            {
              key: "No of Shares vested",
              value: item?.holding.noOfSharesVested,
            },
          ]),
    ],
  };
};

const REALESTATE = (item) => {
  return {
    title: item?.holding.propertyName,
    holdingClass: item?.holdingClass,
    tagLabel:
      REAL_ESTATE_OWNERSHIP_STATUS_TO_TITLE_MAP[item?.holding.ownershipStatus],
    updatedAt: item?.updatedAt,
    content: [
      {
        key: "Nominee",
        value: item?.holding.nominee || "Not Available",
      },
      {
        key: "Ownership share",
        value: `${item?.holding.ownershipPercentage} %`,
      },
      {
        key: "Area",
        value: item?.holding.propertyArea
          ? `${item?.holding.propertyArea}${
              item?.holding.propertyAreaUnit
                ? " " +
                  REAL_ESTATE_PROPERTY_AREA_UNIT_TO_TITLE_MAP[
                    item?.holding.propertyAreaUnit
                  ]
                : ""
            }`
          : "Not available",
      },
      {
        key: "Property Value",
        value: item?.holding.propertyValue
          ? `Rs. ${numberWithCommas(item?.holding.propertyValue)}`
          : "Not Available",
      },
      {
        key: "Date of Purchase",
        value: item?.holding.dateOfPurchase
          ? new Date(item?.holding.dateOfPurchase)
              .toDateString()
              .replace(/^\w+ /, "")
          : "Not available",
      },
      { type: "divider" },
      {
        key: "Address",
        value: item?.holding.address
          ? `${item?.holding.address.street},\n ${item?.holding.address.city}, ${item?.holding.address.state}, ${item?.holding.address.pinCode}`
          : "Not Available",
      },
      {
        key: "Description",
        value: item?.holding.decription || "Not Available",
      },
    ],
  };
};

const PROVIDENTFUND = (item) => {
  return {
    title: item?.holding.employerName,
    holdingClass: item?.holdingClass,
    updatedAt: item?.updatedAt,
    tagLabel: PROVIDENT_FUND_TYPE_TO_TITLE_MAP[item?.holding.pfType],
    content: [
      { key: "UAN", value: item?.holding.uan },
      {
        key: "Amount",
        value: item?.holding.amount
          ? `Rs. ${numberWithCommas(item?.holding.amount)}`
          : "Not available",
      },
      {
        key: "Nominee",
        value: item?.holding.nominee || "Not Available",
      },
    ],
  };
};

export const HOLDINGS_PROPS_MAP = {
  BANK,
  POSTAL,
  INSURANCE,
  CASH,
  DEMAT,
  PROPRIETORSHIP,
  PARTNERSHIP,
  PRIVATELIMITEDCOMPANY,
  REALESTATE,
  PROVIDENTFUND,
};

export const HOLDINGS_NAME_MAP = {
  BANK: "Bank",
  POSTAL: "Post Office",
  INSURANCE: "Insurance",
  CASH: "Cash",
  DEMAT: "Demat Investment",
  PROPRIETORSHIP: "Proprietorship Investment",
  PARTNERSHIP: "Partnership Investment",
  PRIVATELIMITEDCOMPANY: "Private Limited Investment",
  REALESTATE: "Real Estate",
  PROVIDENTFUND: "Provident Funds",
};
