import React from "react";
import { useGetFinancialHoldingForPostalQuery, useUpdateFinancialHoldingForPostalMutation } from "../../../../../testApp/redux/api/vault/financialHolding/postal/postalApiSlice";
import PostalHoldingForm from "../../../../../testApp/components/FinancialHolding/PostalHolding/PostalHoldingForm";
import { useLocalSearchParams } from "expo-router";

const UpdatePostalHoldingForm = () => {
  const [updatePostalFinancialHolding, { isLoading }] =
    useUpdateFinancialHoldingForPostalMutation();

  const { parentId, _id } = useLocalSearchParams();

  const { data } = useGetFinancialHoldingForPostalQuery(parentId)

  return (
    <PostalHoldingForm
      ctaCaption="Update"
      apiCallback={updatePostalFinancialHolding}
      isLoading={isLoading}
      defaultBody={{ parentId, _id }}
      initialValues={data?.entities[_id as string]["holding"]}
    />
  );
};

export default UpdatePostalHoldingForm;
