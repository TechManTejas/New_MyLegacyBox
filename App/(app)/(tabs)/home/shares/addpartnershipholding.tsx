import React from "react";
import { useAddFinancialHoldingForPartnershipMutation } from "../../../../../testApp/redux/api/vault/financialHolding/partnership/partnershipApiSlice";
import PartnershipHoldingForm from "../../../../../testApp/components/FinancialHolding/PartnershipHolding/PartnershipHoldingForm";

const AddPartnershipHoldingForm = () => {
  const [addFinancialHoldingForPartnership, { isLoading }] =
    useAddFinancialHoldingForPartnershipMutation();
  return (
    <PartnershipHoldingForm
      ctaCaption="Add"
      apiCallback={addFinancialHoldingForPartnership}
      isLoading={isLoading}
    />
  );
};

export default AddPartnershipHoldingForm;
