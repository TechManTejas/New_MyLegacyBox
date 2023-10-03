import { z } from "zod";
import { GENDER_MAP } from "../../../../constants/generalFormEntries";
import { addressValidator } from "../addressValidator";

export const willPersonalInfoValidator = z
  .object({

    name: z.string({
      required_error: "Full name is required",
      invalid_type_error: "Invalid type for Full name",
    })
    .refine(value => /^[A-Za-z\s]+$/.test(value), {
      message: "Input should be a non-numeric value",
    }),

    fathersName: z.string({
      required_error: "Fathers name is required",
      invalid_type_error: "Invalid type for Father's name",
    })
    .refine(value => /^[A-Za-z\s]+$/.test(value), {
      message: "Input should be a non-numeric value",
    }),

    gender: z.enum(Object.values(GENDER_MAP), {
      required_error: "Gender is required",
      invalid_type_error: "Invalid type for Gender",
    }),

    dateOfBirth: z.date({
      required_error: "Date of birth is required",
      invalid_type_error: "Invalid type for Date of birth",
    }),

    aadharNumber: z.string({
      required_error: "Aadhar number is required",
      invalid_type_error: "Invalid type for Aadhar number",
    })
    .refine(value => !isNaN(value), {
      message: "Input should be a numeric value",
    })
    .refine(value => /^\d{12}$/.test(value), {
      message: "Number should be of 12 digits"
    }),

    address: addressValidator,

  })
  .strict();
