import { z } from "zod";

export const addressValidator = z
  .object({
    city: z.string({
      required_error: "city is required",
      invalid_type_error: "Invalid type for city",
    }),
    state: z.string({
      required_error: "state is required",
      invalid_type_error: "Invalid type for state",
    }),
    pinCode: z.number({
      required_error: "PIN code is required",
      invalid_type_error: "Invalid type for PIN code",
    }),
    contact: z
      .string({
        invalid_type_error: "Invalid type for contact",
      })
      .optional(),
    street: z.string({
      required_error: "street address is required",
      invalid_type_error: "Invalid type for street address",
    }),
    country: z
      .string({
        invalid_type_error: "Invalid type for country",
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
  .strict();
