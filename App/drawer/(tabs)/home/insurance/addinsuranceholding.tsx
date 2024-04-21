import React from "react";
import { useAddFinancialHoldingForInsuranceMutation } from "../../../../../testApp/redux/api/vault/financialHolding/insurance/insuranceApiSlice";
import InsuranceHoldingForm from "../../../../../testApp/components/FinancialHolding/InsuranceHolding/InsuranceHoldingForm";
import { useLocalSearchParams } from "expo-router";

const AddInsuranceHoldingForm = () => {

  const { parentId } = useLocalSearchParams();
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
