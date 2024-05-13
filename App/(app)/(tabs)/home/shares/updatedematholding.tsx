import React from "react";
import { useGetFinancialHoldingForDematQuery, useUpdateFinancialHoldingForDematMutation } from "../../../../../testApp/redux/api/vault/financialHolding/demat/dematApiSlice";
import DematHoldingForm from "../../../../../testApp/components/FinancialHolding/DematHolding/DematHoldingForm";
import { useLocalSearchParams } from "expo-router";

const UpdateDematHoldingForm = () => {
  const [updateDematFinancialHolding, { isLoading }] =
    useUpdateFinancialHoldingForDematMutation();

  const { _id } = useLocalSearchParams();

  const { data } = useGetFinancialHoldingForDematQuery(_id)

  return (
    <DematHoldingForm
      ctaCaption="Update"
      apiCallback={updateDematFinancialHolding}
      isLoading={isLoading}
      defaultBody={{ _id }}
      initialValues={data?.entities[_id as string]["holding"]}
    />
  );
};

export default UpdateDematHoldingForm;
