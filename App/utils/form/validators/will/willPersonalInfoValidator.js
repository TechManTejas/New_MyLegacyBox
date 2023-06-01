import { z } from "zod";
import { GENDER_MAP } from "../../../../constants/generalFormEntries";
import { addressValidator } from "../addressValidator";

export const willPersonalInfoValidator = z
  .object({
    name: z.string({
      required_error: "Full name is required",
      invalid_type_error: "Invalid type for Full name",
    }),
    fathersName: z.string({
      required_error: "Fathers name is required",
      invalid_type_error: "Invalid type for Father's name",
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
    }),
    address: addressValidator,
  })
  .strict();
