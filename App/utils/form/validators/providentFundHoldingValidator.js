import { z } from "zod";
import { PROVIDENT_FUND_TYPE_MAP } from "../../../constants/financialHoldings/providentFundHolding";

export const providentFundHoldingValidator = z
  .object({
    pfType: z.enum(Object.values(PROVIDENT_FUND_TYPE_MAP), {
      required_error: "PF type is required",
      invalid_type_error: "Invalid type for PF type",
    }),
    uan: z.string({
      required_error: "UAN is required",
      invalid_type_error: "Invalid type for UAN",
    }),
    employerName: z.string({
      required_error: "Employer name is required",
      invalid_type_error: "Invalid type for Employer name",
    }),
    amount: z
      .number({
        invalid_type_error: "Invalid type for Amount",
      })
      .optional(),
  })
  .strict();
