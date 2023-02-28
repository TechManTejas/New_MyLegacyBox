import React from "react";
import { useUpdateFinancialHoldingMutation } from "../../services/financialHolding/financialHoldingSlice";
import { useRoute } from "@react-navigation/native";
import HoldingForm from "./HoldingForm";

const UpdateHoldingForm = () => {
  const [updateFinancialHolding, { isLoading }] =
    useUpdateFinancialHoldingMutation();

  const route = useRoute();

  const { financialHolding } = route.params;

  const { _id, ...financialHoldingFields } = financialHolding;

  return (
    <HoldingForm
      ctaCaption="Update Holding"
      apiCallback={updateFinancialHolding}
      isLoading={isLoading}
      defaultBody={{ _id }}
      initialValues={financialHoldingFields}
    />
  );
};

export default UpdateHoldingForm;
