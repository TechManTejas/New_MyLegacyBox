/**
 * Validates a password against security criteria:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one number
 * - At least one special character
 * @param password The password string.
 * @returns True if valid, false otherwise.
 */
export const validatePassword = (password: string): boolean => {
  if (password.length < 8) return false;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return hasUppercase && hasNumber && hasSpecial;
};
