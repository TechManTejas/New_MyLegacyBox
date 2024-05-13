import React from "react";
import { useGetFinancialHoldingForInsuranceQuery, useUpdateFinancialHoldingForInsuranceMutation } from "../../../../../testApp/redux/api/vault/financialHolding/insurance/insuranceApiSlice";
import InsuranceHoldingForm from "../../../../../testApp/components/FinancialHolding/InsuranceHolding/InsuranceHoldingForm";
import { useLocalSearchParams } from "expo-router";

const UpdateInsuranceHoldingForm = () => {
  const [updateInsuranceFinancialHolding, { isLoading }] =
    useUpdateFinancialHoldingForInsuranceMutation();

  const { parentId, _id } = useLocalSearchParams()

  const { data } = useGetFinancialHoldingForInsuranceQuery(parentId)

  return (
    <InsuranceHoldingForm
      ctaCaption="Update"
      apiCallback={updateInsuranceFinancialHolding}
      isLoading={isLoading}
      defaultBody={{ parentId, _id }}
      initialValues={data?.entities[_id as string]["holding"]}
    />
  );
};

export default UpdateInsuranceHoldingForm;
