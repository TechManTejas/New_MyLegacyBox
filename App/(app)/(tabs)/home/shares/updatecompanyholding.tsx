import React from "react";
import { useGetFinancialHoldingForPrivateLimitedCompanyQuery, useUpdateFinancialHoldingForPrivateLimitedCompanyMutation } from "../../../../../testApp/redux/api/vault/financialHolding/privateLimitedCompany/privateLimitedCompanyApiSlice";
import PrivateLimitedCompanyHoldingForm from "../../../../../testApp/components/FinancialHolding/PrivateLimitedCompanyHolding/PrivateLimitedCompanyHoldingForm";
import { useLocalSearchParams } from "expo-router";

const UpdatePrivateLimitedCompanyHoldingForm = () => {
  const [updatePrivateLimitedCompanyFinancialHolding, { isLoading }] =
    useUpdateFinancialHoldingForPrivateLimitedCompanyMutation();

  const { _id } = useLocalSearchParams();

  const { data } = useGetFinancialHoldingForPrivateLimitedCompanyQuery(_id)

  return (
    <PrivateLimitedCompanyHoldingForm
      ctaCaption="Update"
      apiCallback={updatePrivateLimitedCompanyFinancialHolding}
      isLoading={isLoading}
      defaultBody={{ _id }}
      initialValues={data?.entities[_id as string]["holding"]}
    />
  );
};

export default UpdatePrivateLimitedCompanyHoldingForm;
