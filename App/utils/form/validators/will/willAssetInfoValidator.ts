import { z } from "zod";

export const willAssetInfoValidator = z.record(
  z
    .record(
      z
        .number({
          required_error: "Allocation is required",
          invalid_type_error: "Invalid type for Allocation",
        })
        .min(0)
        .max(100)
    )
    .refine((value) => {
      const sum = Object.values(value).reduce((acc, v) => acc + v, 0);

      if (sum.toFixed(2) !== '100.00' && sum.toFixed(2) !== '99.99') return false;

      return true;
    }, "Total allocation is not equal to 100 or 99.99")
);
