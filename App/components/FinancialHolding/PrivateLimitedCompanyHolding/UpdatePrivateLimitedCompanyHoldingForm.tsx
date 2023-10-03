import React from "react";
import { useRoute } from "@react-navigation/native";
import { useUpdateFinancialHoldingForPrivateLimitedCompanyMutation } from "../../../redux/api/vault/financialHolding/privateLimitedCompany/privateLimitedCompanyApiSlice";
import PrivateLimitedCompanyHoldingForm from "./PrivateLimitedCompanyHoldingForm";

const UpdatePrivateLimitedCompanyHoldingForm = () => {
  const [updatePrivateLimitedCompanyFinancialHolding, { isLoading }] =
    useUpdateFinancialHoldingForPrivateLimitedCompanyMutation();

  const route = useRoute();

  const { financialHolding } = route.params;

  const { _id, holding } = financialHolding;

  return (
    <PrivateLimitedCompanyHoldingForm
      ctaCaption="Update"
      apiCallback={updatePrivateLimitedCompanyFinancialHolding}
      isLoading={isLoading}
      defaultBody={{ _id }}
      initialValues={holding}
    />
  );
};

export default UpdatePrivateLimitedCompanyHoldingForm;
