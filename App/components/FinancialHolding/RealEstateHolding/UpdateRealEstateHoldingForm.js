import React from "react";
import { useUpdateFinancialHoldingForRealEstateMutation } from "../../../services/financialHolding/financialHoldingSlice";
import { useRoute } from "@react-navigation/native";
import RealEstateHoldingForm from "./RealEstateHoldingForm";

const UpdateRealEstateHoldingForm = () => {
  const [updateRealEstateFinancialHolding, { isLoading }] =
    useUpdateFinancialHoldingForRealEstateMutation();

  const route = useRoute();

  const { financialHolding } = route.params;

  const { _id, holding } = financialHolding;

  return (
    <RealEstateHoldingForm
      ctaCaption="Update Real Estate Holding"
      apiCallback={updateRealEstateFinancialHolding}
      isLoading={isLoading}
      defaultBody={{ _id, realEstateType: holding.realEstateType }}
      initialValues={holding}
    />
  );
};

export default UpdateRealEstateHoldingForm;
