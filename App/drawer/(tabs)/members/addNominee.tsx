import React from "react";
import { useAddNomineeMutation } from "../../../../testApp/redux/api/nominee/nomineeSlice";
import NomineeForm from "../../../../testApp/components/Nominee/NomineeForm";

const AddNominee = () => {
  const [addNominee, { isLoading }] = useAddNomineeMutation();
  return (
    <NomineeForm
      apiCallback={addNominee}
      isLoading={isLoading}
      ctaCaption="Add"
    />
  );
};

export default AddNominee;
