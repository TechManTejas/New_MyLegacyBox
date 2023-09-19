import { z } from "zod";
import { addressValidator } from "./addressValidator";
import { NOMINEE_GENDER_MAP } from "../../../constants/nominee";

export const personalInfoUpdateValidator = z
  .object({
    gender: z.enum(Object.values(NOMINEE_GENDER_MAP)),
    fathersName: z.string(),
    dateOfBirth: z.date(),
    aadharNumber: z
      .string()
      .refine((value) => !isNaN(Number(value)), {
        message: "Input should be a numeric value",
      })
      .refine((value) => /^\d{12}$/.test(value), {
        message: "Number should be of 12 digits",
      }),
    address: addressValidator,
  })
  .strict();
