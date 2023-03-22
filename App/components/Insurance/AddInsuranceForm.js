import React from "react";
import { useAddInsuranceMutation } from "../../services/insurance/insuranceSlice";
import InsuranceForm from "./InsuranceForm";

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
