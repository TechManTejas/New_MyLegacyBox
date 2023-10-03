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

const bankProps = (item) => {
  return {
    holdingClass: item.financialArtifact.holdingClass,
    updatedAt: item.financialArtifact.updatedAt,
    title:
      BANK_ACCOUNT_TYPES_TO_TITLE_MAP[
        item.financialArtifact.holding.accountType
      ],
    tagLabel:
      BANK_ACCOUNT_OWNERSHIP_TO_TITLE_MAP[
        item.financialArtifact.holding.ownership
      ],
    content: [
      {
        key: "Nominee",
        value: item.financialArtifact.holding.nominee || "Not Available",
      },
      {
        key: "Account Number",
        value: item.financialArtifact.holding.accountNumber,
      },
      {
        key: "Amount",
        value: item.financialArtifact.holding.amount
          ? `Rs. ${numberWithCommas(item.financialArtifact.holding.amount)}`
          : "Not Available",
      },
    ],
  };
};

const postalProps = (item) => {
  return {
    updatedAt: item.financialArtifact.updatedAt,
    holdingClass: item.financialArtifact.holdingClass,
    title:
      POSTAL_ACCOUNT_TYPES_TO_TITLE_MAP[
        item.financialArtifact.holding.accountType
      ],
    tagLabel:
      POSTAL_ACCOUNT_OWNERSHIP_TO_TITLE_MAP[
        item.financialArtifact.holding.ownership
      ],
    content: [
      {
        key: "Nominee",
        value: item.financialArtifact.holding.nominee || "Not Available",
      },
      {
        key: "Account Number",
        value: item.financialArtifact.holding.accountNumber,
      },
      {
        key: "Amount ",
        value: item.financialArtifact.holding.amount
          ? `Rs. ${numberWithCommas(item.financialArtifact.holding.amount)}`
          : "Not Available",
      },
    ],
  };
};

const insuranceProps = (item) => {
  return {
    holdingClass: item.financialArtifact.holdingClass,
    title: item.financialArtifact.holding.policyName,
    updatedAt: item.financialArtifact.updatedAt,
    tagLabel:
      POLICY_TYPE_TO_TITLE_MAP[item.financialArtifact.holding.policyType],
    content: [
      {
        key: "Nominee",
        value: item.financialArtifact.holding.nominee || "Not Available",
      },
      { key: "Home Branch ", value: item.financialArtifact.holding.homeBranch },
      {
        key: "Policy Number ",
        value: item.financialArtifact.holding.policyNumber,
      },
      {
        key: "Beneficiary ",
        value:
          POLICY_BENEFICIERY_TO_TITLE_MAP[
            item.financialArtifact.holding.beneficiary
          ],
      },
      { type: "divider" },
      {
        key: "Policy Amount ",
        value: item.financialArtifact.holding.policyAmount
          ? `Rs. ${numberWithCommas(
              item.financialArtifact.holding.policyAmount
            )}`
          : "Not Available",
      },
      {
        key: "Date of Maturity ",
        value: new Date(item.financialArtifact.holding.dateOfMaturity)
          .toDateString()
          .replace(/^\w+ /, ""),
      },
      { type: "divider" },
      {
        key: "Premium Amount ",
        value: item.financialArtifact.holding.premiumAmount
          ? `Rs. ${numberWithCommas(
              item.financialArtifact.holding.premiumAmount
            )}`
          : "Not Available",
      },
      {
        key: "Date of Premium ",
        value: new Date(item.financialArtifact.holding.dateOfPremium)
          .toDateString()
          .replace(/^\w+ /, ""),
      },
      {
        key: "Premium Frequency ",
        value:
          POLICY_PREMIUM_FREQUENCY_TO_TITLE_MAP[
            item.financialArtifact.holding.premiumFrequency
          ],
      },
    ],
  };
};

const cashProps = (item) => {
  return {
    holdingClass: item.financialArtifact.holdingClass,
    updatedAt: item.financialArtifact.updatedAt,
    title: item.financialArtifact.holding.nameOfParty,
    tagLabel: CASH_TYPE_TO_TITLE_MAP[item.financialArtifact.holding.cashType],
    content: [
      {
        key: "Nominee",
        value: item.financialArtifact.holding.nominee || "Not Available",
      },
      {
        key: "Phone Number",
        value: item.financialArtifact.holding.phoneNumberOfParty,
      },
      {
        key: "Date of Transaction",
        value: new Date(item.financialArtifact.holding.dateOfTransaction)
          .toDateString()
          .replace(/^\w+ /, ""),
      },
      {
        key: "Amount",
        value: item.financialArtifact.holding.amount
          ? `Rs. ${numberWithCommas(item.financialArtifact.holding.amount)}`
          : "Not Available",
      },
      {
        key: "Address",
        value: item.financialArtifact.holding.address
          ? `${item.financialArtifact.holding.address.street},\n ${item.financialArtifact.holding.address.city}, ${item.financialArtifact.holding.address.state}, ${item.financialArtifact.holding.address.pinCode}`
          : "Not Available",
      },
    ],
  };
};

const dematProps = (item) => {
  return {
    title: item.financialArtifact.holding.broker,
    updatedAt: item.financialArtifact.updatedAt,
    holdingClass: item.financialArtifact.holdingClass,
    tagLabel:
      DEMAT_TYPE_MAP_TO_TITLE_MAP[item.financialArtifact.holding.dematType],
    content: [
      {
        key: "Nominee",
        value: item.financialArtifact.holding.nominee || "Not Available",
      },
      { key: "Customer ID", value: item.financialArtifact.holding.customerId },
      { type: "divider" },
      {
        key: "Relationship Manager",
        value: item.financialArtifact.holding.poc || "Not available",
      },
      {
        key: "Relationship Manager's Contact",
        value: item.financialArtifact.holding.pocNumber || "Not available",
      },
      { type: "divider" },
      {
        key: "Invested Amount",
        value: item.financialArtifact.holding.investedAmount
          ? `Rs. ${numberWithCommas(
              item.financialArtifact.holding.investedAmount
            )}`
          : "Not available",
      },
    ],
  };
};

const proprietorshipProps = (item) => {
  return {
    title: item.financialArtifact.holding.organisationName,
    updatedAt: item.financialArtifact.updatedAt,
    holdingClass: item.financialArtifact.holdingClass,
    content: [
      { key: "GST Number", value: item.financialArtifact.holding.gstNumber },
    ],
  };
};

const partnershipProps = (item) => {
  return {
    title: item.financialArtifact.holding.nameOfFirm,
    updatedAt: item.updatedAt,
    holdingClass: item.financialArtifact.holdingClass,
    content: [
      { key: "PAN Number", value: item.financialArtifact.holding.panNumber },
      {
        key: "Holding %",
        value: item.financialArtifact.holding.percentageHolding,
      },
    ],
  };
};

const privateLimitedCompanyProps = (item) => {
  return {
    title: item.financialArtifact.holding.nameOfCompany,
    updatedAt: item.financialArtifact.updatedAt,
    holdingClass: item.financialArtifact.holdingClass,
    tagLabel:
      PRIVATE_LIMITED_COMPANY_TYPE_MAP_TO_TITLE_MAP[
        item.financialArtifact.holding.natureOfInvestment
      ],
    content: [
      { key: "CIN Number", value: item.financialArtifact.holding.cinNumber },
      ...(item.financialArtifact.holding.natureOfInvestment ===
        PRIVATE_LIMITED_COMPANY_TYPE_MAP.equity ||
      item.financialArtifact.holding.natureOfInvestment ===
        PRIVATE_LIMITED_COMPANY_TYPE_MAP.preference
        ? [
            {
              key: "No of Shares held",
              value: item.financialArtifact.holding.noOfSharesHeld,
            },
            {
              key: "Share Certificate Number",
              value: item.financialArtifact.holding.shareCertificateNumber,
            },
          ]
        : [
            {
              key: "No of Shares granted",
              value: item.financialArtifact.holding.noOfSharesGranted,
            },
            {
              key: "No of Shares vested",
              value: item.financialArtifact.holding.noOfSharesVested,
            },
          ]),
    ],
  };
};

const realEstateProps = (item) => {
  return {
    title: item.financialArtifact.holding.propertyName,
    holdingClass: item.financialArtifact.holdingClass,
    tagLabel:
      REAL_ESTATE_OWNERSHIP_STATUS_TO_TITLE_MAP[
        item.financialArtifact.holding.ownershipStatus
      ],
    updatedAt: item.financialArtifact.updatedAt,
    content: [
      {
        key: "Nominee",
        value: item.financialArtifact.holding.nominee || "Not Available",
      },
      {
        key: "Ownership share",
        value: `${item.financialArtifact.holding.ownershipPercentage} %`,
      },
      {
        key: "Area",
        value: item.financialArtifact.holding.propertyArea
          ? `${item.financialArtifact.holding.propertyArea}${
              item.financialArtifact.holding.propertyAreaUnit
                ? " " +
                  REAL_ESTATE_PROPERTY_AREA_UNIT_TO_TITLE_MAP[
                    item.financialArtifact.holding.propertyAreaUnit
                  ]
                : ""
            }`
          : "Not available",
      },
      {
        key: "Property Value",
        value: item.financialArtifact.holding.propertyValue
          ? `Rs. ${numberWithCommas(
              item.financialArtifact.holding.propertyValue
            )}`
          : "Not Available",
      },
      {
        key: "Date of Purchase",
        value: item.financialArtifact.holding.dateOfPurchase
          ? new Date(item.financialArtifact.holding.dateOfPurchase)
              .toDateString()
              .replace(/^\w+ /, "")
          : "Not available",
      },
      { type: "divider" },
      {
        key: "Address",
        value: item.financialArtifact.holding.address
          ? `${item.financialArtifact.holding.address.street},\n ${item.financialArtifact.holding.address.city}, ${item.financialArtifact.holding.address.state}, ${item.financialArtifact.holding.address.pinCode}`
          : "Not Available",
      },
      {
        key: "Description",
        value: item.financialArtifact.holding.decription || "Not Available",
      },
    ],
  };
};

const providentFundProps = (item) => {
  return {
    title: item.financialArtifact.holding.employerName,
    holdingClass: item.financialArtifact.holdingClass,
    updatedAt: item.financialArtifact.updatedAt,
    tagLabel:
      PROVIDENT_FUND_TYPE_TO_TITLE_MAP[item.financialArtifact.holding.pfType],
    content: [
      {
        key: "Nominee",
        value: item.financialArtifact.holding.nominee || "Not Available",
      },
      { key: "UAN", value: item.financialArtifact.holding.uan },
      {
        key: "Amount",
        value: item.financialArtifact.holding.amount
          ? `Rs. ${numberWithCommas(item.financialArtifact.holding.amount)}`
          : "Not available",
      },
    ],
  };
};

export const INSTITUTE_PROPS_MAP = {
  BANK: bankProps,
  POSTAL: postalProps,
  INSURANCE: insuranceProps,
  CASH: cashProps,
  DEMAT: dematProps,
  PROPRIETORSHIP: proprietorshipProps,
  PARTNERSHIP: partnershipProps,
  PRIVATELIMITEDCOMPANY: privateLimitedCompanyProps,
  REALESTATE: realEstateProps,
  PROVIDENTFUND: providentFundProps,
};

export const INSTITUTES_NAME_MAP = {
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

export const institutes = [
  "BANK",
  "POSTAL",
  "INSURANCE",
  "CASH",
  "DEMAT",
  "PROPRIETORSHIP",
  "PARTNERSHIP",
  "PRIVATELIMITEDCOMPANY",
  "REALESTATE",
  "PROVIDENTFUND",
];
