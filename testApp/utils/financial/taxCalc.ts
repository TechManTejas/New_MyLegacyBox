/**
 * Simplified Indian Income Tax Calculator (New Tax Regime - FY 2024-25).
 * @param annualIncome The total annual income.
 * @returns The calculated tax amount.
 */
export const calculateIndianTax = (annualIncome: number): number => {
  const standardDeduction = 75000;
  const taxableIncome = Math.max(0, annualIncome - standardDeduction);

  if (taxableIncome <= 700000) return 0; // Rebate under Section 87A

  let tax = 0;
  const slabs = [
    { limit: 300000, rate: 0 },
    { limit: 700000, rate: 0.05 },
    { limit: 1000000, rate: 0.1 },
    { limit: 1200000, rate: 0.15 },
    { limit: 1500000, rate: 0.2 },
    { limit: Infinity, rate: 0.3 },
  ];

  let remainingIncome = taxableIncome;
  let previousLimit = 0;

  for (const slab of slabs) {
    const range = slab.limit - previousLimit;
    const taxableAmountInSlab = Math.min(range, Math.max(0, remainingIncome));
    tax += taxableAmountInSlab * slab.rate;
    remainingIncome -= taxableAmountInSlab;
    previousLimit = slab.limit;
    if (remainingIncome <= 0) break;
  }

  return Math.round(tax);
};
