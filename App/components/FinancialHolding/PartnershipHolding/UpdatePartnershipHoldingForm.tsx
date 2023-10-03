import { View, Text } from "react-native";
import React from "react";
import { useUpdateFinancialHoldingForPartnershipMutation } from "../../../redux/api/vault/financialHolding/partnership/partnershipApiSlice";
import PartnershipHoldingForm from "./PartnershipHoldingForm";

const UpdatePartnershipHoldingForm = () => {
  const [updatePartnershipFinancialHolding, { isLoading }] =
    useUpdateFinancialHoldingForPartnershipMutation();

  const route = useRoute();

  const { financialHolding } = route.params;

  const { _id, holding } = financialHolding;
  return (
    <PartnershipHoldingForm
      ctaCaption="Update"
      apiCallback={updatePartnershipFinancialHolding}
      isLoading={isLoading}
      defaultBody={{ _id }}
      initialValues={holding}
    />
  );
};

export default UpdatePartnershipHoldingForm;
