import React from "react";
import { useAddPostalMutation } from "../../../../../testApp/redux/api/vault/financialArtifact/postal/postalApiSlice";
import PostalForm from "../../../../../testApp/components/Postal/PostalForm";

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
