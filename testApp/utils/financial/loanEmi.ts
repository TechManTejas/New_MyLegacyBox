/**
 * Calculates Loan EMI (Equated Monthly Installment).
 * Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
 * @param principal Principal loan amount (P).
 * @param annualRate Annual interest rate in percentage.
 * @param tenureYears Loan tenure in years (N = years * 12).
 * @returns Monthly EMI amount.
 */
export const calculateEMI = (
  principal: number,
  annualRate: number,
  tenureYears: number,
): number => {
  const monthlyRate = annualRate / 12 / 100;
  const numberOfMonths = tenureYears * 12;

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
    (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

  return Math.round(emi);
};
