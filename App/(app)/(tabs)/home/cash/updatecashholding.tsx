import React from "react";
import {
  useGetFinancialHoldingForCashQuery,
  useUpdateFinancialHoldingForCashMutation,
} from "../../../../../testApp/redux/api/vault/financialHolding/cash/cashApiSlice";
import CashHoldingForm from "../../../../../testApp/components/FinancialHolding/CashHolding/CashHoldingForm";
import { useLocalSearchParams } from "expo-router";

const UpdateCashHoldingForm = () => {
  const [updateCashFinancialHolding, { isLoading }] =
    useUpdateFinancialHoldingForCashMutation();

  const { _id } = useLocalSearchParams();

  const { data } = useGetFinancialHoldingForCashQuery(_id);

  return (
    <CashHoldingForm
      ctaCaption="Update"
      apiCallback={updateCashFinancialHolding}
      isLoading={isLoading}
      defaultBody={{ _id }}
      initialValues={data?.entities[_id as string]["holding"]}
    />
  );
};

export default UpdateCashHoldingForm;
