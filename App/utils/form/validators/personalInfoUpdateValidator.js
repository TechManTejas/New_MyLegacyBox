import { z } from "zod";
import { addressValidator } from "./addressValidator";
import { NOMINEE_GENDER_MAP } from "../../../constants/nominee";

export const personalInfoUpdateValidator = z
  .object({
    fullName: z.string().optional(),
    gender: z.nativeEnum(Object.values(NOMINEE_GENDER_MAP)).optional(),
    age: z.number().optional(),
    fathersName: z.string().optional(),
    dateOfBirth: z.date().optional(),
    aadharNumber: z
      .string()
      .refine((value) => !isNaN(Number(value)), {
        message: "Input should be a numeric value",
      })
      .refine((value) => /^\d{12}$/.test(value), {
        message: "Number should be of 12 digits",
      })
      .optional(),
    address: addressValidator.optional(),
  })
  .strict();
