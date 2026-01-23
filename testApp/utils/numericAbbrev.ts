/**
 * Utility for numeric abbreviations.
 */
export const NumericAbbrev = {
  /**
   * Formats a large number into a readable abbreviation.
   * Example: 1500 -> 1.5K, 2000000 -> 2M
   */
  format: (value: number): string => {
    if (value < 1000) return value.toString();

    const suffixes = ["", "K", "M", "B", "T"];
    const suffixNum = Math.floor(("" + value).length / 3);

    let shortValue: number | string = parseFloat(
      (suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(
        2,
      ),
    );

    if (shortValue % 1 !== 0) {
      shortValue = shortValue.toFixed(1);
    }

    return shortValue + suffixes[suffixNum];
  },
};
