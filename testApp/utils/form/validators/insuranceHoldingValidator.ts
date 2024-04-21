import { z } from "zod";
import {
  POLICY_BENEFICIERY_MAP,
  POLICY_PREMIUM_FREQUENCY_MAP,
  POLICY_TYPE_MAP,
} from "../../../constants/financialHoldings/insuranceHolding";

export const insuranceHoldingValidator = z
  .object({
    policyName: z
      .string({
        invalid_type_error: "Invalid type for Policy name",
      })
      .optional(),

    policyNumber: z
      .string({
        required_error: "Policy number is required",
        invalid_type_error: "Invalid type for Policy number",
      })
      .refine((value) => !isNaN(value), {
        message: "Input should be a numeric value",
      }),

    policyType: z.enum(Object.values(POLICY_TYPE_MAP), {
      required_error: "Policy type is required",
      invalid_type_error: "Invalid type for Policy type",
    }),

    beneficiary: z.enum(Object.values(POLICY_BENEFICIERY_MAP), {
      required_error: "Beneficiary is required",
      invalid_type_error: "Invalid type for Beneficiary",
    }),

    premiumFrequency: z.enum(Object.values(POLICY_PREMIUM_FREQUENCY_MAP), {
      required_error: "Premium frequency is required",
      invalid_type_error: "Invalid type for Premium frequency",
    }),

    homeBranch: z
      .string({
        invalid_type_error: "Invalid type for Home branch",
      })
      .optional(),

    policyAmount: z
      .number({
        invalid_type_error: "Invalid type for Policy amount",
      })
      .refine((value) => !isNaN(value), {
        message: "Input should be a numeric value",
      })
      .optional(),

    premiumAmount: z
      .number({
        invalid_type_error: "Invalid type for Premium amount",
      })
      .refine((value) => !isNaN(value), {
        message: "Input should be a numeric value",
      })
      .optional(),

    dateOfPremium: z.date({
      required_error: "Date of premium is required",
      invalid_type_error: "Invalid type for Date of premium",
    }),

    dateOfMaturity: z.date({
      required_error: "Date of maturity is required",
      invalid_type_error: "Invalid type for Date of maturity",
    }),

    nominee: z
      .string({
        invalid_type_error: "Invalid type for Nominee",
      })
      .refine((value) => /^[A-Za-z\s]+$/.test(value), {
        message: "Input should be a non-numeric value",
      })
      .optional(),
  })
  .strict();
