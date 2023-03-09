import React from "react";
import { useAddFinancialHoldingForBankMutation } from "../../../services/financialHolding/financialHoldingSlice";
import { useRoute } from "@react-navigation/native";
import BankHoldingForm from "./BankHoldingForm";

const AddBankHoldingForm = () => {
  const route = useRoute();
  const { parentId } = route.params;
  const [addFinancialHoldingForBank, { isLoading }] =
    useAddFinancialHoldingForBankMutation();

  return (
    <BankHoldingForm
      ctaCaption="Add Holding"
      defaultBody={{ parentId }}
      apiCallback={addFinancialHoldingForBank}
      isLoading={isLoading}
    />
  );
};

export default AddBankHoldingForm;
