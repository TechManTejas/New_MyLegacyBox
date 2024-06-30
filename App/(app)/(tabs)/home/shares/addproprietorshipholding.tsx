import React from "react";
import { useAddFinancialHoldingForProprietorshipMutation } from "../../../../../testApp/redux/api/vault/financialHolding/proprietorship/proprietorshipApiSlice";
import ProprietorshipHoldingForm from "../../../../../testApp/components/FinancialHolding/ProprietorshipHolding/ProprietorshipHoldingForm";

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
