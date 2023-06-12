import { z } from "zod";
import { CASH_TYPE_MAP } from "../../../constants/financialHoldings/cashHolding";
import { addressValidator } from "./addressValidator";

export const cashHoldingValidator = z
  .object({

    cashType: z
      .enum(Object.values(CASH_TYPE_MAP), {
        required_error: "Cash type is required",
        invalid_type_error: "Invalid type for Cash type",
      }),

    dateOfTransaction: z
      .date({
        required_error: "Date of transaction is required",
        invalid_type_error: "Invalid type for Date of transaction",
      }),

    nameOfParty: z
      .string({
        required_error: "Name of party is required",
        invalid_type_error: "Invalid type for Name of party",
      }),

    phoneNumberOfParty: z
      .string({
        required_error: "Phone number of party is required",
        invalid_type_error: "Invalid type for Phone number of party",
      })
      .refine(value => !isNaN(value), {
        message: "Input should be a numeric value",
      })
      .refine(value => /^\d{10}$/.test(value), {
        message: "Number should be of 10 digits"
      }),

    amount: z
      .number({
        invalid_type_error: "Invalid type for Amount",
      })
      .optional(),

    address: addressValidator.optional(),
    
  })
  .strict();
