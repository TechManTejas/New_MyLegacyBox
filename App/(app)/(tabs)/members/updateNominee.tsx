import React from "react";
import {
  useGetNomineesQuery,
  useUpdateNomineeMutation,
} from "../../../../testApp/redux/api/nominee/nomineeSlice";
import NomineeForm from "../../../../testApp/components/Nominee/NomineeForm";
import { useLocalSearchParams } from "expo-router";

const UpdateNominee = () => {
  const { _id } = useLocalSearchParams();

  const { data } = useGetNomineesQuery();

  const [updateNominee, { isLoading }] = useUpdateNomineeMutation();
  return (
    <NomineeForm
      apiCallback={updateNominee}
      isLoading={isLoading}
      ctaCaption="Confirm"
      defaultBody={{ _id }}
      initialValues={data?.entities[_id as string]}
    />
  );
};

export default UpdateNominee;
