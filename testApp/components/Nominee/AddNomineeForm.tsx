import React from "react";
import { useAddNomineeMutation } from "../../redux/api/nominee/nomineeSlice";
import NomineeForm from "./NomineeForm";

const AddNomineeForm = () => {
  const [addNominee, { isLoading }] = useAddNomineeMutation();
  return (
    <NomineeForm
      apiCallback={addNominee}
      isLoading={isLoading}
      ctaCaption="Add"
    />
  );
};

export default AddNomineeForm;
