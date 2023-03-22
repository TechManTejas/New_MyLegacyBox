import React from "react";
import { useAddFinancialHoldingForPostalMutation } from "../../../services/financialHolding/financialHoldingSlice";
import { useRoute } from "@react-navigation/native";
import PostalHoldingForm from "./PostalHoldingForm";

const AddPostalHoldingForm = () => {
  const route = useRoute();
  const { parentId } = route.params;
  const [addFinancialHoldingForPostal, { isLoading }] =
    useAddFinancialHoldingForPostalMutation();

  return (
    <PostalHoldingForm
      ctaCaption="Add"
      defaultBody={{ parentId }}
      apiCallback={addFinancialHoldingForPostal}
      isLoading={isLoading}
    />
  );
};

export default AddPostalHoldingForm;
