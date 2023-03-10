import { useRoute } from "@react-navigation/native";
import React from "react";
import { useAddFinancialHoldingForRealEstateMutation } from "../../../services/financialHolding/financialHoldingSlice";
import RealEstateHoldingForm from "./RealEstateHoldingForm";

const AddRealEstateHoldingForm = () => {
  const route = useRoute();
  const { realEstateType } = route.params;

  const [addFinancialHoldingForRealEstate, { isLoading }] =
    useAddFinancialHoldingForRealEstateMutation();

  return (
    <RealEstateHoldingForm
      ctaCaption="Add Holding"
      defaultBody={{ realEstateType }}
      apiCallback={addFinancialHoldingForRealEstate}
      isLoading={isLoading}
    />
  );
};

export default AddRealEstateHoldingForm;
