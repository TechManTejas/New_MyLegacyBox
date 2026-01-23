import { z } from "zod";

export const addressValidator = z
  .object({
    city: z
      .string({
        required_error: "city is required",
        invalid_type_error: "Invalid type for city",
      })
      .refine((value: string) => /^[A-Za-z\s]+$/.test(value), {
        message: "Input should be a non-numeric value",
      }),

    state: z
      .string({
        required_error: "state is required",
        invalid_type_error: "Invalid type for state",
      })
      .refine((value: string) => /^[A-Za-z\s]+$/.test(value), {
        message: "Input should be a non-numeric value",
      }),

    pinCode: z
      .string({
        required_error: "PIN code is required",
        invalid_type_error: "Invalid type for PIN code",
      })
      .refine((value: string) => /^\d{6}$/.test(value), {
        message: "Invalid PIN code. It should be a 6-digit number.",
      }),

    street: z.string({
      required_error: "street address is required",
      invalid_type_error: "Invalid type for street address",
    }),

    country: z
      .string({
        invalid_type_error: "Invalid type for country",
      })
      .refine((value: string) => /^[A-Za-z\s]+$/.test(value), {
        message: "Input should be a non-numeric value",
      })
      .optional(),
  })
  .strict();
