import { z } from "zod";
import {
  POSTAL_ACCOUNT_OWNERSHIP_MAP,
  POSTAL_ACCOUNT_TYPES_MAP,
} from "../../../constants/financialHoldings/postalHolding";

export const postalHoldingValidator = z
  .object({
    accountNumber: z.string({
      required_error: "Account number is required",
      invalid_type_error: "Invalid type for Account number",
    }),
    accountType: z.enum(Object.values(POSTAL_ACCOUNT_TYPES_MAP), {
      required_error: "Account type is required",
      invalid_type_error: "Invalid type for Account type",
    }),
    ownership: z.enum(Object.values(POSTAL_ACCOUNT_OWNERSHIP_MAP), {
      required_error: "Ownership is required",
      invalid_type_error: "Invalid type for Ownership",
    }),
    amount: z
      .number({
        invalid_type_error: "Invalid type for Amount",
      })
      .optional(),
    pranNumber: z
      .string({
        invalid_type_error: "Invalid type for PRAN number",
      })
      .optional(),
  })
  .strict();
