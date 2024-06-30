import { z } from "zod";

export const partnershipHoldingValidator = z
  .object({
    nameOfFirm: z.string({
      required_error: "Firm name is required",
      invalid_type_error: "Invalid type for Firm name",
    }),
    panNumber: z
      .string({
        required_error: "PAN number is required",
        invalid_type_error: "Invalid type for PAN number",
      })
      .regex(new RegExp("^[A-Z]{5}[0-9]{4}[A-Z]{1}$"), "Invalid PAN number"),
    percentageHolding: z
      .number({
        required_error: "Percentage holding is required",
        invalid_type_error: "Invalid type for Percentage holding",
      })
      .max(100)
      .min(0),
  })
  .strict();
