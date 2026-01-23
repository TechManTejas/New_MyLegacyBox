/**
 * Utility for mock currency conversion.
 */
export const CurrencyConverter = {
  /**
   * Mock exchange rates relative to USD.
   */
  _rates: {
    USD: 1,
    INR: 83.5,
    EUR: 0.92,
    GBP: 0.78,
  } as Record<string, number>,

  /**
   * Converts an amount from one currency to another.
   */
  convert: (amount: number, from: string, to: string): number => {
    const fromRate = CurrencyConverter._rates[from];
    const toRate = CurrencyConverter._rates[to];

    if (!fromRate || !toRate) return amount;

    const baseAmount = amount / fromRate;
    return Math.round(baseAmount * toRate * 100) / 100;
  },
};
