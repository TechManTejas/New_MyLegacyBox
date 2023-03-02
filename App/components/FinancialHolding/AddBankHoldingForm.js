import React from "react";
import { useAddFinancialHoldingForBankMutation } from "../../services/financialHolding/financialHoldingSlice";
import { useRoute } from "@react-navigation/native";
import HoldingForm from "./HoldingForm";

const AddBankHoldingForm = () => {
  const route = useRoute();
  const { parentId, parentName } = route.params;
  const [addFinancialHoldingForBank, { isLoading }] =
    useAddFinancialHoldingForBankMutation();

  return (
    <HoldingForm
      ctaCaption="Add Holding"
      defaultBody={{ parentId, parentName }}
      apiCallback={addFinancialHoldingForBank}
      isLoading={isLoading}
    />
  );
};

export default AddBankHoldingForm;
