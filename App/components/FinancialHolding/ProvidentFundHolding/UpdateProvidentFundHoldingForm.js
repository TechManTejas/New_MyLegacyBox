import React from "react";
import {
  useUpdateFinancialHoldingForProvidentFundMutation,
} from "../../../services/financialHolding/financialHoldingSlice";
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
      ctaCaption="Update PF Holding"
      apiCallback={updateProvidentFundFinancialHolding}
      isLoading={isLoading}
      defaultBody={{ _id, pfType: holding.pfType }}
      initialValues={holding}
    />
  );
};

export default UpdateProvidentFundHoldingForm;
