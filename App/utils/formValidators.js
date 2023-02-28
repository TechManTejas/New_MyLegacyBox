import { z } from "zod";
import { financialHoldingtypeMapper } from "./financialHolding";

export const addressValidator = z.object({
  city: z.string({
    required_error: "city is required",
    invalid_type_error: "Invalid type for city",
  }),
  state: z.string({
    required_error: "state is required",
    invalid_type_error: "Invalid type for state",
  }),
  pinCode: z.number({
    required_error: "PIN code is required",
    invalid_type_error: "Invalid type for PIN code",
  }),
  contact: z.string({
    required_error: "contact is required",
    invalid_type_error: "Invalid type for contact",
  }),
  street: z.string({
    required_error: "street address is required",
    invalid_type_error: "Invalid type for street address",
  }),
  country: z
    .string({
      invalid_type_error: "Invalid type for country",
    })
    .optional(),
  landmark: z
    .string({
      invalid_type_error: "Invalid type for landmark",
    })
    .optional(),
  building: z
    .string({
      invalid_type_error: "Invalid type for building",
    })
    .optional(),
});

export const bankValidator = z.object({
  ifsc: z.string({
    required_error: "IFSC code is required",
    invalid_type_error: "Invalid type for IFSC code",
  }),
  name: z.string({
    required_error: "Bank name is required",
    invalid_type_error: "Invalid type for Bank name",
  }),
  branchName: z.string({
    required_error: "Branch name is required",
    invalid_type_error: "Invalid type for Branch name",
  }),
  poc: z
    .string({
      invalid_type_error: "Invalid type for Point of contact name",
    })
    .optional(),
  pocNumber: z
    .string({
      invalid_type_error: "Invalid type for Point of contact number",
    })
    .optional(),
  address: addressValidator.optional(),
});

export const financialHoldingBodyValidator = z.object({
  holdingType: z.enum(Object.keys(financialHoldingtypeMapper), {
    required_error: "Type is required",
    invalid_type_error: "Invalid type for Holding type",
  }),
  holdingNumber: z.string({
    required_error: "Account / Holding Number is required",
    invalid_type_error: "Invalid type for Account / Holding Number",
  }),
  parentName: z
    .string({
      invalid_type_error: "Invalid type for Parent Name",
    })
    .optional(),
  amount: z
    .number({
      invalid_type_error: "Invalid type for Amount",
    })
    .optional(),
});
