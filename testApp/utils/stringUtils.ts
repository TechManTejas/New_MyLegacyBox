/**
 * Converts a string to Title Case.
 * @param str The string to convert.
 * @returns The Title Cased string.
 */
export const toTitleCase = (str: string): string => {
  if (!str) return "";
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

/**
 * Truncates a string to a specific length and adds an ellipsis.
 * @param str The string to truncate.
 * @param length The maximum length.
 * @returns The truncated string.
 */
export const truncateString = (str: string, length: number): string => {
  if (!str || str.length <= length) return str;
  return str.substring(0, length) + "...";
};
