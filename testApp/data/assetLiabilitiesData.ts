import { numberToInr } from "../../utils";
import { BANK_ACCOUNT_TYPES_TO_TITLE_MAP } from "../constants/financialHoldings/bankHolding";
import { CASH_TYPE_TO_TITLE_MAP } from "../constants/financialHoldings/cashHolding";
import { DEMAT_TYPE_MAP_TO_TITLE_MAP } from "../constants/financialHoldings/dematHolding";
import { POLICY_TYPE_TO_TITLE_MAP } from "../constants/financialHoldings/insuranceHolding";
import { POSTAL_ACCOUNT_TYPES_TO_TITLE_MAP } from "../constants/financialHoldings/postalHolding";
import { PROVIDENT_FUND_TYPE_TO_TITLE_MAP } from "../constants/financialHoldings/providentFundHolding";
import {
  REAL_ESTATE_OWNERSHIP_STATUS_TO_TITLE_MAP,
  REAL_ESTATE_TYPE_TO_TITLE_MAP,
} from "../constants/financialHoldings/realEstateHolding";

export const artifactsData = {
  bank: (item) => [
    {
      key: "Bank",
      value: item.bankName,
    },
    {
      key: "Account Type",
      value: BANK_ACCOUNT_TYPES_TO_TITLE_MAP[item.accountType],
    },
    {
      key: "Account Number",
      value: item.accountNumber,
    },
    {
      key: "Amount",
      value: item.amount ? `₹ ${numberToInr(item.amount)}` : "",
    },
  ],

  insurance: (item) => [
    {
      key: "Company",
      value: item.companyName,
    },
    {
      key: "Policy Type",
      value: POLICY_TYPE_TO_TITLE_MAP[item.policyType],
    },
    {
      key: "Policy Name",
      value: item.policyName,
    },
    {
      key: "Policy Number",
      value: item.policyNumber,
    },
    {
      key: "Policy Amount",
      value: item.policyAmount ? `₹ ${numberToInr(item.policyAmount)}` : "",
    },
  ],

  providentfund: (item) => [
    {
      key: "Employer Name",
      value: item.employerName,
    },
    {
      key: "PF Type",
      value: PROVIDENT_FUND_TYPE_TO_TITLE_MAP[item.pfType],
    },
    {
      key: "Amount",
      value: item.amount ? `₹ ${numberToInr(item.amount)}` : "",
    },
  ],

  postal: (item) => [
    {
      key: "Post Office Name",
      value: item.postOfficeName,
    },
    {
      key: "Account Type",
      value: POSTAL_ACCOUNT_TYPES_TO_TITLE_MAP[item.accountType],
    },
    {
      key: "Account Number",
      value: item.accountNumber,
    },
    {
      key: "Amount",
      value: item.amount ? `₹ ${numberToInr(item.amount)}` : "",
    },
  ],

  demat: (item) => [
    {
      key: "Broker Name",
      value: item.broker,
    },
    {
      key: "Demat Type",
      value: DEMAT_TYPE_MAP_TO_TITLE_MAP[item.dematType],
    },
    {
      key: "Customer ID",
      value: item.customerId,
    },
    {
      key: "Amount",
      value: item.amount ? `₹ ${numberToInr(item.amount)}` : "",
    },
  ],

  realestate: (item) => [
    {
      key: "Real Estate Type",
      value: REAL_ESTATE_TYPE_TO_TITLE_MAP[item.realEstateType],
    },
    {
      key: "Ownership Status",
      value: REAL_ESTATE_OWNERSHIP_STATUS_TO_TITLE_MAP[item.ownershipStatus],
    },
    {
      key: "Ownership %",
      value: item.ownershipPercentage,
    },
    {
      key: "Amount",
      value: item.amount ? `₹ ${numberToInr(item.amount)}` : "",
    },
  ],

  cash: (item) => [
    {
      key: "Name of Party",
      value: item.nameOfParty,
    },
    {
      key: "Cash Type",
      value: CASH_TYPE_TO_TITLE_MAP[item.cashType],
    },
    {
      key: "Amount",
      value: item.amount ? `₹ ${numberToInr(item.amount)}` : "",
    },
  ],

  proprietorship: (item) => [
    {
      key: "GST Number",
      value: item.gstNumber,
    },
    {
      key: "Organisation Name",
      value: item.organisationName,
    },
  ],

  partnership: (item) => [
    {
      key: "Percentage Holding",
      value: item.percentageHolding,
    },
    {
      key: "PAN",
      value: item.panNumber,
    },
  ],

  privatelimitedcompany: (item) => [
    {
      key: "Nature of Investment",
      value: item.natureOfInvestment,
    },
    {
      key: "No. of shared held",
      value: item.noOfSharesHeld,
    },
    {
      key: "Name of Company",
      value: item.nameOfCompany,
    },
    {
      key: "CIN",
      value: item.cinNumber,
    },
    {
      key: "Share Certificate Number",
      value: item.shareCertificateNumber,
    },
  ]

};
