import React from "react";
import { useUpdateFinancialHoldingForDematMutation } from "../../../redux/api/vault/financialHolding/demat/dematApiSlice";
import { useRoute } from "@react-navigation/native";
import DematHoldingForm from "./DematHoldingForm";

const UpdateDematHoldingForm = () => {
  const [updateDematFinancialHolding, { isLoading }] =
    useUpdateFinancialHoldingForDematMutation();

  const route = useRoute();

  const { financialHolding } = route.params;

  const { _id, holding } = financialHolding;

  return (
    <DematHoldingForm
      ctaCaption="Update"
      apiCallback={updateDematFinancialHolding}
      isLoading={isLoading}
      defaultBody={{ _id }}
      initialValues={holding}
    />
  );
};

export default UpdateDematHoldingForm;
