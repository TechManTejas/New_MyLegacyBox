import React from "react";
import { useAddFinancialHoldingForCashMutation } from "../../../../../testApp/redux/api/vault/financialHolding/cash/cashApiSlice";
import CashHoldingForm from "../../../../../testApp/components/FinancialHolding/CashHolding/CashHoldingForm";

const AddCashHoldingForm = () => {
  const [addFinancialHoldingForCash, { isLoading }] =
    useAddFinancialHoldingForCashMutation();

  return (
    <CashHoldingForm
      ctaCaption="Add"
      apiCallback={addFinancialHoldingForCash}
      isLoading={isLoading}
    />
  );
};

export default AddCashHoldingForm;
