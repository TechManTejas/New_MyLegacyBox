import React from "react";
import { useAddFinancialHoldingForPrivateLimitedCompanyMutation } from "../../../redux/api/vault/financialHolding/privateLimitedCompany/privateLimitedCompanyApiSlice";
import PrivateLimitedCompanyHoldingForm from "./PrivateLimitedCompanyHoldingForm";

const AddPrivateLimitedCompanyHoldingForm = () => {
  const [addFinancialHoldingForPrivateLimitedCompany, { isLoading }] =
    useAddFinancialHoldingForPrivateLimitedCompanyMutation();

  return (
    <PrivateLimitedCompanyHoldingForm
      ctaCaption="Add"
      apiCallback={addFinancialHoldingForPrivateLimitedCompany}
      isLoading={isLoading}
    />
  );
};

export default AddPrivateLimitedCompanyHoldingForm;
