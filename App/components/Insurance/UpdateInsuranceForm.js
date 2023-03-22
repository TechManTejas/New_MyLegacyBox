import { useRoute } from "@react-navigation/native";
import React from "react";
import { useUpdateInsuranceMutation } from "../../services/insurance/insuranceSlice";
import InsuranceForm from "./InsuranceForm";

const UpdateInsuranceForm = () => {
  const [updateInsurance, { isLoading }] = useUpdateInsuranceMutation();

  const route = useRoute();

  const { insurance } = route.params;

  const { _id, ...insuranceFields } = insurance;

  return (
    <InsuranceForm
      ctaCaption="Update"
      apiCallback={updateInsurance}
      isLoading={isLoading}
      defaultBody={{ _id }}
      initialValues={insuranceFields}
    />
  );
};

export default UpdateInsuranceForm;
