import { z } from "zod";
import { DEMAT_TYPE_MAP } from "../../../constants/financialHoldings/dematHolding";

export const dematHoldingValidator = z
  .object({

    broker: z
      .string({
        required_error: "Broker is required",
        invalid_type_error: "Invalid type for Broker",
      })
      .refine(value => /^[A-Za-z\s]+$/.test(value), {
        message: "Input should be a non-numeric value",
      }),

    customerId: z
      .string({
        required_error: "Customer ID is required",
        invalid_type_error: "Invalid type for Customer ID",
      }),

    dematType: z
      .enum(Object.values(DEMAT_TYPE_MAP), {
        required_error: "Demat type is required",
        invalid_type_error: "Invalid type for demat type",
      }),

    poc: z
      .string({
        invalid_type_error: "Invalid type for Point of contact",
      })
      .refine(value => /^[A-Za-z\s]+$/.test(value), {
        message: "Input should be a non-numeric value",
      })
      .optional(),

    pocNumber: z
      .string({
        invalid_type_error: "Invalid type for Point of contact number",
      })
      .refine(value => !isNaN(value), {
        message: "Input should be a numeric value",
      })
      .refine(value => /^\d{10}$/.test(value), {
        message: "Number should be of 10 digits"
      })
      .optional(),

    investedAmount: z
      .number({
        invalid_type_error: "Invalid type for Invested amount",
      })
      .refine(value => !isNaN(value), {
        message: "Input should be a numeric value",
      })
      .optional(),
      
  })
  .strict();
