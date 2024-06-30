import React from "react";
import {
  useGetFinancialHoldingForProprietorshipQuery,
  useUpdateFinancialHoldingForProprietorshipMutation,
} from "../../../../../testApp/redux/api/vault/financialHolding/proprietorship/proprietorshipApiSlice";
import ProprietorshipHoldingForm from "../../../../../testApp/components/FinancialHolding/ProprietorshipHolding/ProprietorshipHoldingForm";
import { useLocalSearchParams } from "expo-router";

const UpdateProprietorshipHoldingForm = () => {
  const [updateProprietorshipFinancialHolding, { isLoading }] =
    useUpdateFinancialHoldingForProprietorshipMutation();

  const { _id } = useLocalSearchParams();

  const { data } = useGetFinancialHoldingForProprietorshipQuery(_id);

  return (
    <ProprietorshipHoldingForm
      ctaCaption="Update"
      apiCallback={updateProprietorshipFinancialHolding}
      isLoading={isLoading}
      defaultBody={{ _id }}
      initialValues={data?.entities[_id as string]["holding"]}
    />
  );
};

export default UpdateProprietorshipHoldingForm;
