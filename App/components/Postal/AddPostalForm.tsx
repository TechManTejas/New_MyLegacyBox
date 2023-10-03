import React from "react";
import { useAddPostalMutation } from "../../redux/api/vault/financialArtifact/postal/postalApiSlice";
import PostalForm from "./PostalForm";

const AddPostalForm = () => {
  const [addPostal, { isLoading }] = useAddPostalMutation();

  return (
    <PostalForm
      apiCallback={addPostal}
      isLoading={isLoading}
      ctaCaption="Add"
    />
  );
};

export default AddPostalForm;
