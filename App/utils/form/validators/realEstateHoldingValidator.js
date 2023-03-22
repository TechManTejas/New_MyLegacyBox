import { z } from "zod";
import {
  REAL_ESTATE_OWNERSHIP_STATUS_MAP,
  REAL_ESTATE_PROPERTY_AREA_UNIT_MAP,
  REAL_ESTATE_TYPE_MAP,
} from "../../../constants/financialHoldings/realEstateHolding";
import { addressValidator } from "./addressValidator";

export const realEstateHoldingValidator = z
  .object({
    propertyName: z.string({
      required_error: "Property Name is required",
      invalid_type_error: "Invalid type for property name",
    }),
    realEstateType: z.enum(Object.values(REAL_ESTATE_TYPE_MAP), {
      required_error: "Real estate type is required",
      invalid_type_error: "Invalid type for Real estate type",
    }),
    ownershipStatus: z.enum(Object.values(REAL_ESTATE_OWNERSHIP_STATUS_MAP), {
      required_error: "Ownership status is required",
      invalid_type_error: "Invalid type for Ownership status",
    }),
    propertyArea: z
      .number({
        invalid_type_error: "Invalid type for Property area",
      })
      .optional(),
    propertyAreaUnit: z
      .enum(Object.values(REAL_ESTATE_PROPERTY_AREA_UNIT_MAP), {
        invalid_type_error: "Invalid type for Property Area Unit",
      })
      .optional(),
    propertyValue: z
      .number({
        invalid_type_error: "Invalid type for Property value",
      })
      .optional(),
    dateOfPurchase: z
      .date({
        invalid_type_error: "Invalid type for date of purchase",
      })
      .optional(),
    ownershipPercentage: z
      .number({
        required_error: "Ownership percentage is required",
        invalid_type_error: "Invalid type for Ownership percentage",
      })
      .max(100),
    description: z
      .string({
        invalid_type_error: "Invalid type for description",
      })
      .optional(),
    address: addressValidator,
  })
  .strict();
