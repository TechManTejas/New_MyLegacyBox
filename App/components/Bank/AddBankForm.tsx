import React from "react";
import { useAddBankMutation } from "../../redux/api/vault/financialArtifact/bank/bankApiSlice";
import BankForm from "./BankForm";

const AddBankForm = () => {
  const [addBank, { isLoading }] = useAddBankMutation();

  return (
    <BankForm
      apiCallback={addBank}
      isLoading={isLoading}
      ctaCaption="Add"
    />
  );
};

export default AddBankForm;
