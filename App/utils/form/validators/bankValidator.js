import { z } from "zod";
import { addressValidator } from "./addressValidator";

export const bankValidator = z
  .object({

    ifsc: z
      .string({
        required_error: "IFSC code is required",
        invalid_type_error: "Invalid type for IFSC code",
      }),

    name: z
      .string({
        required_error: "Bank name is required",
        invalid_type_error: "Invalid type for Bank name",
      })
      .refine(value => /^[A-Za-z\s]+$/.test(value), {
        message: "Input should be a non-numeric value",
      }),

    branchName: z
      .string({
        required_error: "Branch name is required",
        invalid_type_error: "Invalid type for Branch name",
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

    address: addressValidator.optional(),
    
  })
  .strict();
