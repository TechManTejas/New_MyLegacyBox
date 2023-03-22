import React from "react";
import { useAddFinancialHoldingForProvidentFundMutation } from "../../../services/financialHolding/financialHoldingSlice";
import ProvidentFundHoldingForm from "./ProvidentFundHoldingForm";

const AddProvidentFundHoldingForm = () => {
  const [addFinancialHoldingForProvidentFund, { isLoading }] =
    useAddFinancialHoldingForProvidentFundMutation();

  return (
    <ProvidentFundHoldingForm
      ctaCaption="Add"
      apiCallback={addFinancialHoldingForProvidentFund}
      isLoading={isLoading}
    />
  );
};

export default AddProvidentFundHoldingForm;
