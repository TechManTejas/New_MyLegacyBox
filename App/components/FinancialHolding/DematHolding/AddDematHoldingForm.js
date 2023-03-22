import React from "react";
import { useAddFinancialHoldingForDematMutation } from "../../../services/financialHolding/financialHoldingSlice";
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
