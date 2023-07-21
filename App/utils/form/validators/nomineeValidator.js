import { z } from "zod";
import {
  NOMINEE_GENDER_MAP,
  NOMINEE_RELATIONSHIP_MAP,
} from "../../../constants/nominee";
import { addressValidator } from "./addressValidator";

export const nomineeValidator = z
  .object({
    fullName: z
      .string({
        required_error: "Full name is required",
        invalid_type_error: "Invalid type for Full name",
      })
      .refine((value) => /^[A-Za-z\s]+$/.test(value), {
        message: "Input should be a non-numeric value",
      }),

    gender: z.enum(Object.values(NOMINEE_GENDER_MAP), {
      required_error: "Gender is required",
      invalid_type_error: "Invalid type for Gender",
    }),

    relationship: z.enum(Object.values(NOMINEE_RELATIONSHIP_MAP), {
      required_error: "Relationship is required",
      invalid_type_error: "Invalid type for Relationship",
    }),

    phoneNumber: z
      .string({
        required_error: "Phone number is required",
        invalid_type_error: "Invalid type for Phone number",
      })
      .refine((value) => !isNaN(value), {
        message: "Input should be a numeric value",
      })
      .refine((value) => /^\d{10}$/.test(value), {
        message: "Number should be of 10 digits",
      }),

    email: z
      .string({
        invalid_type_error: "Invalid type for email",
      })
      .email({
        message: "Enter a valid email",
      }),

    age: z
      .number({
        invalid_type_error: "Invalid type for number",
      })
      .refine((value) => !isNaN(value), {
        message: "Input should be a numeric value",
      })
      .optional(),

    aadharNumber: z
      .string({
        invalid_type_error: "Invalid type for Aadhar number",
      })
      .refine((value) => !isNaN(value), {
        message: "Input should be a numeric value",
      })
      .refine((value) => /^\d{12}$/.test(value), {
        message: "Number should be of 12 digits",
      })
      .optional(),

    fathersName: z
      .string({
        invalid_type_error: "Invalid type for father's name",
      })
      .refine((value) => /^[A-Za-z\s]+$/.test(value), {
        message: "Input should be a non-numeric value",
      })
      .optional(),

    address: addressValidator.optional(),
  })
  .strict();
