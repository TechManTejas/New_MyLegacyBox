import React from "react";
import { useAddFinancialHoldingForDematMutation } from "../../../redux/api/vault/financialHolding/demat/dematApiSlice";
import DematHoldingForm from "./DematHoldingForm";

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
