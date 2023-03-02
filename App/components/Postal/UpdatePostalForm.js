import { useRoute } from "@react-navigation/native";
import React from "react";
import { useUpdatePostalMutation } from "../../services/postal/postalSlice";
import PostalForm from "./PostalForm";

const UpdatePostalForm = () => {
  const [updatePostal, { isLoading }] = useUpdatePostalMutation();

  const route = useRoute();

  const { postal } = route.params;

  const { _id, ...postalFields } = postal;

  return (
    <PostalForm
      ctaCaption="Update Postal"
      apiCallback={updatePostal}
      isLoading={isLoading}
      defaultBody={{ _id }}
      initialValues={postalFields}
    />
  );
};

export default UpdatePostalForm;
