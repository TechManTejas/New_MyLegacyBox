import React from "react";
import {
  useGetFinancialHoldingForProvidentFundQuery,
  useUpdateFinancialHoldingForProvidentFundMutation,
} from "../../../../../testApp/redux/api/vault/financialHolding/providentFundApiSlice/providentFundApiSlice";
import ProvidentFundHoldingForm from "../../../../../testApp/components/FinancialHolding/ProvidentFundHolding/ProvidentFundHoldingForm";
import { useLocalSearchParams } from "expo-router";

const UpdateProvidentFundHoldingForm = () => {
  const [updateProvidentFundFinancialHolding, { isLoading }] =
    useUpdateFinancialHoldingForProvidentFundMutation();

  const { _id } = useLocalSearchParams();

  const { data } = useGetFinancialHoldingForProvidentFundQuery(_id);

  return (
    <ProvidentFundHoldingForm
      ctaCaption="Update"
      apiCallback={updateProvidentFundFinancialHolding}
      isLoading={isLoading}
      defaultBody={{ _id }}
      initialValues={data?.entities[_id as string]["holding"]}
    />
  );
};

export default UpdateProvidentFundHoldingForm;
