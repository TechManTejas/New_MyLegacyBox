import React from "react";
import { useUpdateFinancialHoldingForCashMutation } from "../../../redux/api/vault/financialHolding/cash/cashApiSlice";
import { useRoute } from "@react-navigation/native";
import CashHoldingForm from "./CashHoldingForm";

const UpdateCashHoldingForm = () => {
  const [updateCashFinancialHolding, { isLoading }] =
    useUpdateFinancialHoldingForCashMutation();

  const route = useRoute();

  const { financialHolding } = route.params;

  const { _id, holding } = financialHolding;

  return (
    <CashHoldingForm
      ctaCaption="Update"
      apiCallback={updateCashFinancialHolding}
      isLoading={isLoading}
      defaultBody={{ _id }}
      initialValues={holding}
    />
  );
};

export default UpdateCashHoldingForm;
