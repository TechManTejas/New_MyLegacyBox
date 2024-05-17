import React from "react";
import { useAddFinancialHoldingForProvidentFundMutation } from "../../../../../testApp/redux/api/vault/financialHolding/providentFundApiSlice/providentFundApiSlice";
import ProvidentFundHoldingForm from "../../../../../testApp/components/FinancialHolding/ProvidentFundHolding/ProvidentFundHoldingForm";

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
