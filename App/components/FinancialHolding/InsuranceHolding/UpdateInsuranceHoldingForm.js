import React from "react";
import { useUpdateFinancialHoldingForInsuranceMutation } from "../../../services/financialHolding/financialHoldingSlice";
import { useRoute } from "@react-navigation/native";
import InsuranceHoldingForm from "./InsuranceHoldingForm";

const UpdateInsuranceHoldingForm = () => {
  const [updateInsuranceFinancialHolding, { isLoading }] =
    useUpdateFinancialHoldingForInsuranceMutation();

  const route = useRoute();

  const { parentId, financialHolding } = route.params;

  const { _id, holding } = financialHolding;

  return (
    <InsuranceHoldingForm
      ctaCaption="Update Bank Holding"
      apiCallback={updateInsuranceFinancialHolding}
      isLoading={isLoading}
      defaultBody={{ parentId, _id }}
      initialValues={holding}
    />
  );
};

export default UpdateInsuranceHoldingForm;
