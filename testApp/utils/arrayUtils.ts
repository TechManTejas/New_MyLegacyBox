/**
 * Returns a unique version of an array.
 * @param arr The array to filter.
 * @returns A new array with unique elements.
 */
export const uniqueArray = <T>(arr: T[]): T[] => {
  return [...new Set(arr)];
};

/**
 * Chunks an array into smaller arrays of a specified size.
 * @param arr The array to chunk.
 * @param size The size of each chunk.
 * @returns An array of chunks.
 */
export const chunkArray = <T>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};
