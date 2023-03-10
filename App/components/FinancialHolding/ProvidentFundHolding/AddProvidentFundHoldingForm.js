import { useRoute } from "@react-navigation/native";
import React from "react";
import { useAddFinancialHoldingForProvidentFundMutation } from "../../../services/financialHolding/financialHoldingSlice";
import ProvidentFundHoldingForm from "./ProvidentFundHoldingForm";

const AddProvidentFundHoldingForm = () => {
  const route = useRoute();
  const { pfType } = route.params;

  const [addFinancialHoldingForProvidentFund, { isLoading }] =
    useAddFinancialHoldingForProvidentFundMutation();

  return (
    <ProvidentFundHoldingForm
      ctaCaption="Add Holding"
      defaultBody={{ pfType }}
      apiCallback={addFinancialHoldingForProvidentFund}
      isLoading={isLoading}
    />
  );
};

export default AddProvidentFundHoldingForm;
