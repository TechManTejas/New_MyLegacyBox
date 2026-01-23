import { z } from "zod";
import { PROVIDENT_FUND_TYPE_MAP } from "../../../constants/financialHoldings/providentFundHolding";

export const providentFundHoldingValidator = z
  .object({
    pfType: z.enum(
      Object.values(PROVIDENT_FUND_TYPE_MAP) as [string, ...string[]],
      {
        required_error: "PF type is required",
        invalid_type_error: "Invalid type for PF type",
      },
    ),

    uan: z
      .string({
        required_error: "UAN is required",
        invalid_type_error: "Invalid type for UAN",
      })
      .refine((value: any) => !isNaN(value), {
        message: "Input should be a numeric value",
      })
      .refine((value: string) => /^\d{12}$/.test(value), {
        message: "Number should be of 12 digits",
      }),

    employerName: z
      .string({
        required_error: "Employer name is required",
        invalid_type_error: "Invalid type for Employer name",
      })
      .refine((value: string) => /^[A-Za-z\s]+$/.test(value), {
        message: "Input should be a non-numeric value",
      }),

    amount: z
      .number({
        invalid_type_error: "Invalid type for Amount",
      })
      .refine((value: any) => !isNaN(value), {
        message: "Input should be a numeric value",
      })
      .optional(),

    nominee: z
      .string({
        invalid_type_error: "Invalid type for Nominee",
      })
      .refine((value: string) => /^[A-Za-z\s]+$/.test(value), {
        message: "Input should be a non-numeric value",
      })
      .optional(),
  })
  .strict();
