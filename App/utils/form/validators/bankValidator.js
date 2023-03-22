import { z } from "zod";
import { addressValidator } from "./addressValidator";

export const bankValidator = z.object({
  ifsc: z.string({
    required_error: "IFSC code is required",
    invalid_type_error: "Invalid type for IFSC code",
  }),
  name: z.string({
    required_error: "Bank name is required",
    invalid_type_error: "Invalid type for Bank name",
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
}).strict();
