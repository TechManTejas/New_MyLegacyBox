import React from "react";
import { useAddFinancialHoldingForInsuranceMutation } from "../../../redux/api/vault/financialHolding/insurance/insuranceApiSlice";
import { useRoute } from "@react-navigation/native";
import InsuranceHoldingForm from "./InsuranceHoldingForm";

const AddInsuranceHoldingForm = () => {
  const route = useRoute();
  const { parentId } = route.params;
  const [addFinancialHoldingForInsurance, { isLoading }] =
    useAddFinancialHoldingForInsuranceMutation();

  return (
    <InsuranceHoldingForm
      ctaCaption="Add"
      defaultBody={{ parentId }}
      apiCallback={addFinancialHoldingForInsurance}
      isLoading={isLoading}
    />
  );
};

export default AddInsuranceHoldingForm;
