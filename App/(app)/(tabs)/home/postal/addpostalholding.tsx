import React from "react";
import { useAddFinancialHoldingForPostalMutation } from "../../../../../testApp/redux/api/vault/financialHolding/postal/postalApiSlice";
import PostalHoldingForm from "../../../../../testApp/components/FinancialHolding/PostalHolding/PostalHoldingForm";
import { useLocalSearchParams } from "expo-router";

const AddPostalHoldingForm = () => {

  const { parentId } = useLocalSearchParams();

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
