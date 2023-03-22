import React from "react";
import { useUpdateFinancialHoldingForBankMutation } from "../../../services/financialHolding/financialHoldingSlice";
import { useRoute } from "@react-navigation/native";
import BankHoldingForm from "./BankHoldingForm";

const UpdateBankHoldingForm = () => {
  const [updateBankFinancialHolding, { isLoading }] =
    useUpdateFinancialHoldingForBankMutation();

  const route = useRoute();

  const { parentId, financialHolding } = route.params;

  const { _id, holding } = financialHolding;

  return (
    <BankHoldingForm
      ctaCaption="Update"
      apiCallback={updateBankFinancialHolding}
      isLoading={isLoading}
      defaultBody={{ parentId, _id }}
      initialValues={holding}
    />
  );
};

export default UpdateBankHoldingForm;
