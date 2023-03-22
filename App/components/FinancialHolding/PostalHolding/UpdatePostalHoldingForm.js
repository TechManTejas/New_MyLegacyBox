import React from "react";
import { useUpdateFinancialHoldingForPostalMutation } from "../../../services/financialHolding/financialHoldingSlice";
import { useRoute } from "@react-navigation/native";
import PostalHoldingForm from "./PostalHoldingForm";

const UpdatePostalHoldingForm = () => {
  const [updatePostalFinancialHolding, { isLoading }] =
    useUpdateFinancialHoldingForPostalMutation();

  const route = useRoute();

  const { parentId, financialHolding } = route.params;

  const { _id, holding } = financialHolding;

  return (
    <PostalHoldingForm
      ctaCaption="Update"
      apiCallback={updatePostalFinancialHolding}
      isLoading={isLoading}
      defaultBody={{ parentId, _id }}
      initialValues={holding}
    />
  );
};

export default UpdatePostalHoldingForm;
