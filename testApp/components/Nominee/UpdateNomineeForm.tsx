import React from "react";
import { useUpdateNomineeMutation } from "../../redux/api/nominee/nomineeSlice";
import NomineeForm from "./NomineeForm";
import { useRoute } from "@react-navigation/core";

const UpdateNomineeForm = () => {
  const route = useRoute();

  const { nominee } = route.params;

  const { _id, ...nomineeFields } = nominee

  const [updateNominee, { isLoading }] = useUpdateNomineeMutation();
  return (
    <NomineeForm
      apiCallback={updateNominee}
      isLoading={isLoading}
      ctaCaption="Confirm"
      defaultBody={{_id}}
      initialValues={nomineeFields}
    />
  );
};

export default UpdateNomineeForm;
