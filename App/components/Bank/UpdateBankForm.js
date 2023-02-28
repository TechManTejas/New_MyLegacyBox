import { useRoute } from "@react-navigation/native";
import React from "react";
import { useUpdateBankMutation } from "../../services/bank/bankSlice";
import BankForm from "./BankForm";

const UpdateBankForm = () => {
  const [updateBank, { isLoading }] = useUpdateBankMutation();

  const route = useRoute();

  const { bank } = route.params;

  const { _id, ...bankFields } = bank;

  return (
    <BankForm
      ctaCaption="Update Bank"
      apiCallback={updateBank}
      isLoading={isLoading}
      defaultBody={{ _id }}
      initialValues={bankFields}
    />
  );
};

export default UpdateBankForm;
