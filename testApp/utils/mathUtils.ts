/**
 * Formats a number as currency in INR format.
 * @param amount The number to format.
 * @returns A string in INR currency format.
 */
export const formatToINR = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Calculates the percentage of a value relative to a total.
 * @param value The numerator value.
 * @param total The denominator value.
 * @returns The calculated percentage rounded to 2 decimal places.
 */
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100 * 100) / 100;
};
