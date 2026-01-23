/**
 * Calculates compound interest.
 * Formula: A = P(1 + r/n)^(nt)
 * @param principal The initial amount (P).
 * @param rate Annual interest rate in decimal (r).
 * @param time Time in years (t).
 * @param frequency Number of times interest is compounded per year (n). default 1.
 * @returns Total amount including interest.
 */
export const calculateCompoundInterest = (
  principal: number,
  rate: number,
  time: number,
  frequency: number = 1,
): number => {
  const amount = principal * Math.pow(1 + rate / frequency, frequency * time);
  return Math.round(amount * 100) / 100;
};
