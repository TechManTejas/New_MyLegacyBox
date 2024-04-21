import React from "react";
import { useAddInsuranceMutation } from "../../../../../testApp/redux/api/vault/financialArtifact/insurance/insuranceApiSlice";
import InsuranceForm from "../../../../../testApp/components/Insurance/InsuranceForm";

const AddInsuranceForm = () => {
  const [addInsurance, { isLoading }] = useAddInsuranceMutation();

  return (
    <InsuranceForm
      apiCallback={addInsurance}
      isLoading={isLoading}
      ctaCaption="Add"
    />
  );
};

export default AddInsuranceForm;
