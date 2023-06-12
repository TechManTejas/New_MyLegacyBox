import { z } from "zod";

export const addressValidator = z
  .object({

    city: z
      .string({
        required_error: "city is required",
        invalid_type_error: "Invalid type for city",
      })
      .refine(value => /^[A-Za-z\s]+$/.test(value), {
        message: "Input should be a non-numeric value",
      }),

    state: z
      .string({
        required_error: "state is required",
        invalid_type_error: "Invalid type for state",
      })
      .refine(value => /^[A-Za-z\s]+$/.test(value), {
        message: "Input should be a non-numeric value",
      }),

    pinCode: z.
      number({
        required_error: "PIN code is required",
        invalid_type_error: "Invalid type for PIN code",
      })
      .refine((value) => /^\d{6}$/.test(value), {
        message: 'Invalid PIN code. It should be a 6-digit number.',
      }),

    contact: z
      .string({
        invalid_type_error: "Invalid type for contact",
      })
      .refine(value => !isNaN(value), {
        message: "Input should be a numeric value",
      })
      .refine(value => /^\d{10}$/.test(value), {
        message: "Number should be of 10 digits"
      })
      .optional(),

    street: z
      .string({
        required_error: "street address is required",
        invalid_type_error: "Invalid type for street address",
      }),

    country: z
      .string({
        invalid_type_error: "Invalid type for country",
      })
      .refine(value => /^[A-Za-z\s]+$/.test(value), {
        message: "Input should be a non-numeric value",
      })
      .optional(),

    landmark: z
      .string({
        invalid_type_error: "Invalid type for landmark",
      })
      .optional(),

    building: z
      .string({
        invalid_type_error: "Invalid type for building",
      })
      .optional(),

  })
  .strict()
