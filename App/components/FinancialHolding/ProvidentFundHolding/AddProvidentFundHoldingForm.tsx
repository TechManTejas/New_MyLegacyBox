import React from "react";
import { useAddFinancialHoldingForProvidentFundMutation } from "../../../redux/api/vault/financialHolding/providentFundApiSlice/providentFundApiSlice";
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
