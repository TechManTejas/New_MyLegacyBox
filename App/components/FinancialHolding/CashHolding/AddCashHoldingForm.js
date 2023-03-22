import React from "react";
import { useAddFinancialHoldingForCashMutation } from "../../../services/financialHolding/financialHoldingSlice";
import CashHoldingForm from "./CashHoldingForm";

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
