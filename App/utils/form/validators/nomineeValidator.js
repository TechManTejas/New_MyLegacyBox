import { z } from "zod";
import {
  NOMINEE_GENDER_MAP,
  NOMINEE_RELATIONSHIP_MAP,
} from "../../../constants/nominee";
import { addressValidator } from "./addressValidator";

export const nomineeValidator = z
  .object({
    fullName: z.string({
      required_error: "Full name is required",
      invalid_type_error: "Invalid type for Full name",
    }),
    gender: z.enum(Object.values(NOMINEE_GENDER_MAP), {
      required_error: "Gender is required",
      invalid_type_error: "Invalid type for Gender",
    }),
    relationship: z.enum(Object.values(NOMINEE_RELATIONSHIP_MAP), {
      required_error: "Relationship is required",
      invalid_type_error: "Invalid type for Relationship",
    }),
    phoneNumber: z.string({
      required_error: "Phone number is required",
      invalid_type_error: "Invalid type for Phone number",
    }),
    email: z
      .string({
        invalid_type_error: "Invalid type for email",
      })
      .optional(),
    address: addressValidator.optional(),
  })
  .strict();
