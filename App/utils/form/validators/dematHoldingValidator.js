import { z } from "zod";

export const dematHoldingValidator = z
  .object({
    broker: z.string({
      required_error: "Broker is required",
      invalid_type_error: "Invalid type for Broker",
    }),
    customerId: z.string({
      required_error: "Customer ID is required",
      invalid_type_error: "Invalid type for Customer ID",
    }),
    poc: z
      .string({
        invalid_type_error: "Invalid type for Point of contact",
      })
      .optional(),
    pocNumber: z
      .string({
        invalid_type_error: "Invalid type for Point of contact number",
      })
      .optional(),
    investedAmount: z
      .number({
        invalid_type_error: "Invalid type for Invested amount",
      })
      .optional(),
  })
  .strict();
