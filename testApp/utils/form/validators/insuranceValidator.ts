import { z } from "zod";
import { addressValidator } from "./addressValidator";

export const insuranceValidator = z
  .object({
    companyName: z.string({
      required_error: "Company name is required",
      invalid_type_error: "Invalid type for Company name",
    }),

    customerId: z
      .string({
        invalid_type_error: "Invalid type for CustomerId",
      })
      .optional(),

    poc: z
      .string({
        invalid_type_error: "Invalid type for Point of contact name",
      })
      .refine((value: string) => /^[A-Za-z\s]+$/.test(value), {
        message: "Input should be a non-numeric value",
      })
      .optional(),

    pocNumber: z
      .string({
        invalid_type_error: "Invalid type for Point of contact number",
      })
      .refine((value: any) => !isNaN(value), {
        message: "Input should be a numeric value",
      })
      .refine((value: string) => /^\d{10}$/.test(value), {
        message: "Number should be of 10 digits",
      })
      .optional(),

    address: addressValidator.optional(),
  })
  .strict();
