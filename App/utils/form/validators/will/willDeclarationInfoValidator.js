import { z } from "zod";

export const willDeclarationInfoValidator = z
  .object({
    place: z
      .string({
        required_error: "Place is required",
        invalid_type_error: "Invalid type for Place",
      })
      .refine((value) => /^[A-Za-z\s]+$/.test(value), {
        message: "Input should be a non-numeric value",
      }),

    declaration: z
      .string({
        required_error: "Declaration is required",
        invalid_type_error: "Invalid type for Declaration",
      })
      .refine((v) => v === "YES" || v === "yes" || v === "Yes", {
        message: 'Declaration must be agreed with "YES", "Yes", or "yes"',
      }),
  })
  .strict();
