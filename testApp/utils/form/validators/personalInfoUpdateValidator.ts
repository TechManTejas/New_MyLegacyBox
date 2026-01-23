import { z } from "zod";
import { addressValidator } from "./addressValidator";
import { NOMINEE_GENDER_MAP } from "../../../constants/nominee";

export const personalInfoUpdateValidator = z
  .object({
    gender: z
      .enum(Object.values(NOMINEE_GENDER_MAP) as [string, ...string[]])
      .optional(),
    fathersName: z.string().optional(),
    dateOfBirth: z.date().optional(),
    aadharNumber: z
      .string()
      .refine((value: string) => !isNaN(Number(value)), {
        message: "Input should be a numeric value",
      })
      .refine((value: string) => /^\d{12}$/.test(value), {
        message: "Number should be of 12 digits",
      })
      .optional(),
    address: addressValidator.optional(),
  })
  .strict();
