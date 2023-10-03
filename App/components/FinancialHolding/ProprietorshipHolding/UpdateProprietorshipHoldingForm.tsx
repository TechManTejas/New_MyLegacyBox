import React from "react";
import { useRoute } from "@react-navigation/native";
import { useUpdateFinancialHoldingForProprietorshipMutation } from "../../../redux/api/vault/financialHolding/proprietorship/proprietorshipApiSlice";
import ProprietorshipHoldingForm from "./ProprietorshipHoldingForm";

const UpdateProprietorshipHoldingForm = () => {
  const [updateProprietorshipFinancialHolding, { isLoading }] =
    useUpdateFinancialHoldingForProprietorshipMutation();

  const route = useRoute();

  const { financialHolding } = route.params;

  const { _id, holding } = financialHolding;

  return (
    <ProprietorshipHoldingForm
      ctaCaption="Update"
      apiCallback={updateProprietorshipFinancialHolding}
      isLoading={isLoading}
      defaultBody={{ _id }}
      initialValues={holding}
    />
  );
};

export default UpdateProprietorshipHoldingForm;
