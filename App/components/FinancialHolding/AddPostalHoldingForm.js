import React from "react";
import { useAddFinancialHoldingForPostalMutation } from "../../services/financialHolding/financialHoldingSlice";
import { useRoute } from "@react-navigation/native";
import HoldingForm from "./HoldingForm";

const AddPostalHoldingForm = () => {
  const route = useRoute();
  const { parentId, parentName } = route.params;
  const [addFinancialHoldingForPostal, { isLoading }] =
    useAddFinancialHoldingForPostalMutation();

  return (
    <HoldingForm
      ctaCaption="Add Holding"
      defaultBody={{ parentId, parentName }}
      apiCallback={addFinancialHoldingForPostal}
      isLoading={isLoading}
    />
  );
};

export default AddPostalHoldingForm;
