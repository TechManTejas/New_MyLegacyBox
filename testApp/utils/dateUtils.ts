/**
 * Formats a date to YYYY-MM-DD.
 * @param date The date to format.
 * @returns A formatted date string.
 */
export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

/**
 * Gets the difference in days between two dates.
 * @param date1 The first date.
 * @param date2 The second date.
 * @returns The difference in days.
 */
export const daysBetween = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
