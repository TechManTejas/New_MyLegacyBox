import React from "react";
import { useAddFinancialHoldingForBankMutation } from "../../../../../testApp/redux/api/vault/financialHolding/bank/bankApiSlice";
import BankHoldingForm from "../../../../../testApp/components/FinancialHolding/BankHolding/BankHoldingForm";
import { useLocalSearchParams } from "expo-router";

const AddBankHoldingForm = () => {

  const { parentId } = useLocalSearchParams();

  const [addFinancialHoldingForBank, { isLoading }] =
    useAddFinancialHoldingForBankMutation();

  return (
    <BankHoldingForm
      ctaCaption="Add"
      defaultBody={{ parentId }}
      apiCallback={addFinancialHoldingForBank}
      isLoading={isLoading}
    />
  );
};

export default AddBankHoldingForm;
