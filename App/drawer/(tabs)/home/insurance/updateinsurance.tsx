import React from "react";
import {
  useGetInsurancesQuery,
  useUpdateInsuranceMutation,
} from "../../../../../testApp/redux/api/vault/financialArtifact/insurance/insuranceApiSlice";
import InsuranceForm from "../../../../../testApp/components/Insurance/InsuranceForm";
import { useLocalSearchParams } from "expo-router";

const UpdateInsuranceForm = () => {
  const [updateInsurance, { isLoading }] = useUpdateInsuranceMutation();

  const { _id } = useLocalSearchParams();

  const { data } = useGetInsurancesQuery();

  return (
    <InsuranceForm
      ctaCaption="Update"
      apiCallback={updateInsurance}
      isLoading={isLoading}
      defaultBody={{ _id }}
      initialValues={data?.entities[_id as string]}
    />
  );
};

export default UpdateInsuranceForm;
