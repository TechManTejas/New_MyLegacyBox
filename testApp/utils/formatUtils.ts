/**
 * Formats bytes to a human-readable string.
 * @param bytes The number of bytes.
 * @returns A formatted size string (e.g., "1.5 MB").
 */
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * Mask a phone number for display.
 * @param phone The phone number string.
 * @returns The masked phone number.
 */
export const maskPhone = (phone: string): string => {
  if (phone.length < 4) return phone;
  return phone.slice(0, 2) + "*".repeat(phone.length - 4) + phone.slice(-2);
};
