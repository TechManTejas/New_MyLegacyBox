import React from "react";
import { useGetFinancialHoldingForBankQuery, useUpdateFinancialHoldingForBankMutation } from "../../../../../testApp/redux/api/vault/financialHolding/bank/bankApiSlice";
import BankHoldingForm from "../../../../../testApp/components/FinancialHolding/BankHolding/BankHoldingForm";
import { useLocalSearchParams } from "expo-router";

const UpdateBankHoldingForm = () => {
  const [updateBankFinancialHolding, { isLoading }] =
    useUpdateFinancialHoldingForBankMutation();

  const { parentId, _id } = useLocalSearchParams();

  const { data } = useGetFinancialHoldingForBankQuery(parentId)

  return (
    <BankHoldingForm
      ctaCaption="Update"
      apiCallback={updateBankFinancialHolding}
      isLoading={isLoading}
      defaultBody={{ parentId, _id }}
      initialValues={data?.entities[_id as string]["holding"]}
    />
  );
};

export default UpdateBankHoldingForm;
