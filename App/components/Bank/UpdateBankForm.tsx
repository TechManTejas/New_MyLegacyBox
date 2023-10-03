import React from "react"
import { useRoute } from "@react-navigation/native";
import { useUpdateBankMutation } from "../../redux/api/vault/financialArtifact/bank/bankApiSlice";
import BankForm from "./BankForm";

const UpdateBankForm = () => {

  const [updateBank, { isLoading }] = useUpdateBankMutation();

  const route = useRoute();

  const { bank } = route.params;

  const { _id, ...bankFields } = bank;

  return (
    <BankForm
      ctaCaption="Update"
      apiCallback={updateBank}
      isLoading={isLoading}
      defaultBody={{ _id }}
      initialValues={bankFields}
    />
  );
};

export default UpdateBankForm;
