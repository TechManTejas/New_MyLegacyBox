import React from "react";
import { useAddFinancialHoldingForDematMutation } from "../../../../../testApp/redux/api/vault/financialHolding/demat/dematApiSlice";
import DematHoldingForm from "../../../../../testApp/components/FinancialHolding/DematHolding/DematHoldingForm";

const AddDematHoldingForm = () => {
  const [addFinancialHoldingForDemat, { isLoading }] =
    useAddFinancialHoldingForDematMutation();

  return (
    <DematHoldingForm
      ctaCaption="Add"
      apiCallback={addFinancialHoldingForDemat}
      isLoading={isLoading}
    />
  );
};

export default AddDematHoldingForm;
