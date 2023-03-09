import { z } from "zod";
import { addressValidator } from "./addressValidator";

export const postalValidator = z.object({
  ifsc: z
    .string({
      invalid_type_error: "Invalid type for IFSC code",
    })
    .optional(),
  name: z.string({
    required_error: "Postal name is required",
    invalid_type_error: "Invalid type for Postal name",
  }),
  branchName: z.string({
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
    .optional(),
  pocNumber: z
    .string({
      invalid_type_error: "Invalid type for Point of contact number",
    })
    .optional(),
  address: addressValidator.optional(),
});