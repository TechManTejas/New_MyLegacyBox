import { z } from "zod";
import { addressValidator } from "./addressValidator";

export const insuranceValidator = z.object({
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
    .optional(),
  pocNumber: z
    .string({
      invalid_type_error: "Invalid type for Point of contact number",
    })
    .optional(),
  address: addressValidator.optional(),
}).strict();
