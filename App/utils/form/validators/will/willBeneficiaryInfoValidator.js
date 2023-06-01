import { z } from "zod";

export const willBeneficiaryInfoValidator = z
  .object({
    name: z.string({
      required_error: "Full name is required",
      invalid_type_error: "Invalid type for Full name",
    }),
    age: z
      .number({
        required_error: "Age is required",
        invalid_type_error: "Invalid type for age",
      })
      .min(18, "Age must be greater than 18 for the beneficiary"),
    relationshipWithTestator: z.string({
      required_error: "Relationship with testator is required",
      invalid_type_error: "Invalid type for Relationship with testator",
    }),
  })
  .strict();
