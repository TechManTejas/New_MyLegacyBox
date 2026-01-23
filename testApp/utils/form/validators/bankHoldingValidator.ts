import { z } from "zod";
import {
  BANK_ACCOUNT_OWNERSHIP_MAP,
  BANK_ACCOUNT_TYPES_MAP,
} from "../../../constants/financialHoldings/bankHolding";

export const bankHoldingValidator = z
  .object({
    accountNumber: z
      .string({
        required_error: "Account number is required",
        invalid_type_error: "Invalid type for Account number",
      })
      .refine((value: any) => !isNaN(value), {
        message: "Input should be a numeric value",
      }),

    accountType: z.enum(
      Object.values(BANK_ACCOUNT_TYPES_MAP) as [string, ...string[]],
      {
        required_error: "Account type is required",
        invalid_type_error: "Invalid type for Account type",
      },
    ),

    ownership: z.enum(
      Object.values(BANK_ACCOUNT_OWNERSHIP_MAP) as [string, ...string[]],
      {
        required_error: "Ownership is required",
        invalid_type_error: "Invalid type for Ownership",
      },
    ),

    amount: z
      .number({
        invalid_type_error: "Invalid type for Amount",
      })
      .refine((value: any) => !isNaN(value), {
        message: "Input should be a numeric value",
      })
      .optional(),

    pranNumber: z
      .string({
        invalid_type_error: "Invalid type for PRAN number",
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
