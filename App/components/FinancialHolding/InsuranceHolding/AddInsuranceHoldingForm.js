import React from "react";
import { useAddFinancialHoldingForInsuranceMutation } from "../../../services/financialHolding/financialHoldingSlice";
import { useRoute } from "@react-navigation/native";
import InsuranceHoldingForm from "./InsuranceHoldingForm";

const AddInsuranceHoldingForm = () => {
  const route = useRoute();
  const { parentId } = route.params;
  const [addFinancialHoldingForInsurance, { isLoading }] =
    useAddFinancialHoldingForInsuranceMutation();

  return (
    <InsuranceHoldingForm
      ctaCaption="Add Holding"
      defaultBody={{ parentId }}
      apiCallback={addFinancialHoldingForInsurance}
      isLoading={isLoading}
    />
  );
};

export default AddInsuranceHoldingForm;
