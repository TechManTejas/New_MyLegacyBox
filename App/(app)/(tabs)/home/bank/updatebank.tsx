import React from "react";
import {
  useGetBanksQuery,
  useUpdateBankMutation,
} from "../../../../../testApp/redux/api/vault/financialArtifact/bank/bankApiSlice";
import BankForm from "../../../../../testApp/components/Bank/BankForm";
import { useLocalSearchParams } from "expo-router";

const UpdateBankForm = () => {
  const [updateBank, { isLoading }] = useUpdateBankMutation();

  const { _id } = useLocalSearchParams();

  const { data } = useGetBanksQuery();

  return (
    <BankForm
      ctaCaption="Update"
      apiCallback={updateBank}
      isLoading={isLoading}
      defaultBody={{ _id }}
      initialValues={data?.entities[_id as string]}
    />
  );
};

export default UpdateBankForm;
