import React from "react";
import { useAddBankMutation } from "../../../../../testApp/redux/api/vault/financialArtifact/bank/bankApiSlice";
import BankForm from "../../../../../testApp/components/Bank/BankForm";

const AddBank = () => {
  const [addBank, { isLoading }] = useAddBankMutation();

  return (
    <BankForm
      apiCallback={addBank}
      isLoading={isLoading}
      ctaCaption="Add"
    />
  );
};

export default AddBank;
