/**
 * Validates an Indian PAN (Permanent Account Number).
 * Format: 5 uppercase letters, 4 digits, 1 uppercase letter.
 * @param pan The PAN string.
 * @returns True if valid, false otherwise.
 */
export const validatePAN = (pan: string): boolean => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan.toUpperCase());
};
