import { z } from "zod";

export const proprietorshipHoldingValidator = z
  .object({
    organisationName: z.string({
      required_error: "Organisation name is required",
      invalid_type_error: "Invalid type for Organisation name",
    }),
    gstNumber: z
      .string({
        required_error: "GST number is required",
        invalid_type_error: "Invalid type for GST number",
      })
      .regex(
        new RegExp("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"),
        "Invalid GST number"
      ),
  })
  .strict();
