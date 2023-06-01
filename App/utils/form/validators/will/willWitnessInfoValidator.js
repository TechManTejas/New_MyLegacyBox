import { z } from "zod";
import { GENDER_MAP } from "../../../../constants/generalFormEntries";
import { addressValidator } from "../addressValidator";

export const willWitnessInfoValidator = z
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
    relationshipWithTestator: z.string({
      required_error: "Relationship with testator is required",
      invalid_type_error: "Invalid type for Relationship with testator",
    }),
    address: addressValidator,
  })
  .strict();
