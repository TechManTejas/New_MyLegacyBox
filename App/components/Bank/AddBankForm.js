import React from "react";
import { useAddBankMutation } from "../../services/bank/bankSlice";
import BankForm from "./BankForm";

const AddBankForm = () => {
  const [addBank, { isLoading }] = useAddBankMutation();

  return (
    <BankForm
      apiCallback={addBank}
      isLoading={isLoading}
      ctaCaption="Add Bank"
    />
  );
};

export default AddBankForm;
