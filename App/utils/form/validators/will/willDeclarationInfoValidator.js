import { z } from "zod";

export const willDeclarationInfoValidator = z
  .object({
    place: z.string({
      required_error: "Place is required",
      invalid_type_error: "Invalid type for Place",
    }),
    declaration: z
      .string({
        required_error: "Declaration is required",
        invalid_type_error: "Invalid type for Declaration",
      })
      .refine((v) => v === "YES", 'Declaration must be agreed with "YES"'),
  })
  .strict();
