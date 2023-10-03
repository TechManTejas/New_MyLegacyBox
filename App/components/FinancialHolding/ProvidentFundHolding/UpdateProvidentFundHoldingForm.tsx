import React from "react";
import { useUpdateFinancialHoldingForProvidentFundMutation } from "../../../redux/api/vault/financialHolding/providentFundApiSlice/providentFundApiSlice";
import { useRoute } from "@react-navigation/native";
import ProvidentFundHoldingForm from "./ProvidentFundHoldingForm";

const UpdateProvidentFundHoldingForm = () => {
  const [updateProvidentFundFinancialHolding, { isLoading }] =
    useUpdateFinancialHoldingForProvidentFundMutation();

  const route = useRoute();

  const { financialHolding } = route.params;

  const { _id, holding } = financialHolding;

  return (
    <ProvidentFundHoldingForm
      ctaCaption="Update"
      apiCallback={updateProvidentFundFinancialHolding}
      isLoading={isLoading}
      defaultBody={{ _id }}
      initialValues={holding}
    />
  );
};

export default UpdateProvidentFundHoldingForm;
