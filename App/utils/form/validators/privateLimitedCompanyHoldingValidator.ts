import { z } from "zod";
import { PRIVATE_LIMITED_COMPANY_TYPE_MAP } from "../../../constants/financialHoldings/privateLimitedHolding";

export const privateLimitedCompanyHoldingValidator = z
  .object({
    nameOfCompany: z.string({
      required_error: "Company name is required",
      invalid_type_error: "Invalid type for Company name",
    }),
    cinNumber: z
      .string({
        required_error: "CIN number is required",
        invalid_type_error: "Invalid type for CIN number",
      })
      .regex(
        new RegExp(
          "^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$"
        ),
        "Invalid CIN number"
      ),
    natureOfInvestment: z.enum(
      Object.values(PRIVATE_LIMITED_COMPANY_TYPE_MAP),
      {
        required_error: "Nature of investment is required",
        invalid_type_error: "Invalid type for Nature of investment",
      }
    ),
    noOfSharesHeld: z
      .number({
        invalid_type_error: "Invalid type for Shares held",
      })
      .min(0)
      .optional(),
    shareCertificateNumber: z
      .string({
        invalid_type_error: "Invalid type for Share certificate number",
      })
      .optional(),
    noOfSharesGranted: z
      .number({
        invalid_type_error: "Invalid type for shares granted",
      })
      .min(0)
      .optional(),
    noOfSharesVested: z
      .number({
        invalid_type_error: "Invalid type for shares investment",
      })
      .min(0)
      .optional(),
  })
  .strict()
  .refine(
    (args) => {
      if (
        args.natureOfInvestment === PRIVATE_LIMITED_COMPANY_TYPE_MAP.equity ||
        args.natureOfInvestment === PRIVATE_LIMITED_COMPANY_TYPE_MAP.preference
      ) {
        return !!args.noOfSharesHeld;
      }
      return true;
    },
    {
      message: "This field is required for equity/preference",
      path: ["noOfSharesHeld"],
    }
  )
  .refine(
    (args) => {
      if (
        args.natureOfInvestment === PRIVATE_LIMITED_COMPANY_TYPE_MAP.equity ||
        args.natureOfInvestment === PRIVATE_LIMITED_COMPANY_TYPE_MAP.preference
      ) {
        return !!args.shareCertificateNumber;
      }
      return true;
    },
    {
      message: "This field is required for equity/preference",
      path: ["shareCertificateNumber"],
    }
  )
  .refine(
    (args) => {
      if (args.natureOfInvestment === PRIVATE_LIMITED_COMPANY_TYPE_MAP.esop) {
        return !!args.noOfSharesGranted;
      }
      return true;
    },
    {
      message: "This field is required for esop",
      path: ["noOfSharesGranted"],
    }
  )
  .refine(
    (args) => {
      if (args.natureOfInvestment === PRIVATE_LIMITED_COMPANY_TYPE_MAP.esop) {
        return !!args.noOfSharesVested;
      }
      return true;
    },
    {
      message: "This field is required for esop",
      path: ["noOfSharesVested"],
    }
  );
