export const financialHoldingtypeMapper = {
  savingsAccount: "Savings",
  fdAccount: "Fixed Deposit",
  rdAccount: "RD Account",
  nscAccount: "NSC Account",
  ppfAccount: "PPF Account",
  loanAccount: "Loan",
  odAccount: "OD Account",
};

export const financialHoldingTypeForDropDown = Object.entries(
  financialHoldingtypeMapper
).map(([k, v]) => ({ label: v, value: k }));

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
