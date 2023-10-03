import { View, Text } from "react-native";
import React from "react";
import { useAddFinancialHoldingForPartnershipMutation } from "../../../redux/api/vault/financialHolding/partnership/partnershipApiSlice";
import PartnershipHoldingForm from "./PartnershipHoldingForm";

const AddPartnershipHoldingForm = () => {
  const [addFinancialHoldingForPartnership, { isLoading }] =
    useAddFinancialHoldingForPartnershipMutation();
  return (
    <PartnershipHoldingForm
      ctaCaption="Add"
      apiCallback={addFinancialHoldingForPartnership}
      isLoading={isLoading}
    />
  );
};

export default AddPartnershipHoldingForm;
