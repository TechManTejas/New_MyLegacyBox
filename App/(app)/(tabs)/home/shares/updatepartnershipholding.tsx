import React from "react";
import {
  useGetFinancialHoldingForPartnershipQuery,
  useUpdateFinancialHoldingForPartnershipMutation,
} from "../../../../../testApp/redux/api/vault/financialHolding/partnership/partnershipApiSlice";
import PartnershipHoldingForm from "../../../../../testApp/components/FinancialHolding/PartnershipHolding/PartnershipHoldingForm";
import { useLocalSearchParams } from "expo-router";

const UpdatePartnershipHoldingForm = () => {
  const [updatePartnershipFinancialHolding, { isLoading }] =
    useUpdateFinancialHoldingForPartnershipMutation();

  const { _id } = useLocalSearchParams();

  const { data } = useGetFinancialHoldingForPartnershipQuery(_id);

  return (
    <PartnershipHoldingForm
      ctaCaption="Update"
      apiCallback={updatePartnershipFinancialHolding}
      isLoading={isLoading}
      defaultBody={{ _id }}
      initialValues={data?.entities[_id as string]["holding"]}
    />
  );
};

export default UpdatePartnershipHoldingForm;
