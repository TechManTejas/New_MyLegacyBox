import React from "react";
import {
  useGetPostalsQuery,
  useUpdatePostalMutation,
} from "../../../../../testApp/redux/api/vault/financialArtifact/postal/postalApiSlice";
import PostalForm from "../../../../../testApp/components/Postal/PostalForm";
import { useLocalSearchParams } from "expo-router";

const UpdatePostalForm = () => {
  const [updatePostal, { isLoading }] = useUpdatePostalMutation();

  const { _id } = useLocalSearchParams();

  const { data } = useGetPostalsQuery();

  return (
    <PostalForm
      ctaCaption="Update"
      apiCallback={updatePostal}
      isLoading={isLoading}
      defaultBody={{ _id }}
      initialValues={data?.entities[_id as string]}
    />
  );
};

export default UpdatePostalForm;
