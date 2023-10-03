import React from "react";
import { useAddFinancialHoldingForProprietorshipMutation } from "../../../redux/api/vault/financialHolding/proprietorship/proprietorshipApiSlice";
import ProprietorshipHoldingForm from "./ProprietorshipHoldingForm";

const AddProprietorshipHoldingForm = () => {
  const [addFinancialHoldingForProprietorship, { isLoading }] =
    useAddFinancialHoldingForProprietorshipMutation();

  return (
    <ProprietorshipHoldingForm
      ctaCaption="Add"
      apiCallback={addFinancialHoldingForProprietorship}
      isLoading={isLoading}
    />
  );
};

export default AddProprietorshipHoldingForm;
