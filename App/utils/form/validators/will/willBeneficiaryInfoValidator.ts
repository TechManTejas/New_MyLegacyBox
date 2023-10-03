import { z } from "zod";

export const willBeneficiaryInfoValidator = z
  .object({

    name: z.string({
      required_error: "Full name is required",
      invalid_type_error: "Invalid type for Full name",
    })
    .refine(value => /^[A-Za-z\s]+$/.test(value), {
      message: "Input should be a non-numeric value",
    }),

    age: z
      .number({
        required_error: "Age is required",
        invalid_type_error: "Invalid type for age",
      })
      .min(18, "Age must be greater than 18 for the beneficiary")
      .refine(value => !isNaN(value), {
        message: "Input should be a numeric value",
      }),

    relationshipWithTestator: z.string({
      required_error: "Relationship with testator is required",
      invalid_type_error: "Invalid type for Relationship with testator",
    })
    .refine(value => /^[A-Za-z\s]+$/.test(value), {
      message: "Input should be a non-numeric value",
    }),

  })
  .strict();
