import { useRoute } from "@react-navigation/native";
import React from "react";
import { useAddFinancialHoldingForRealEstateMutation } from "../../../redux/api/vault/financialHolding/realEstate/realEstateApiSlice";
import RealEstateHoldingForm from "./RealEstateHoldingForm";

const AddRealEstateHoldingForm = () => {
  const route = useRoute();
  const { realEstateType } = route.params;

  const [addFinancialHoldingForRealEstate, { isLoading }] =
    useAddFinancialHoldingForRealEstateMutation();

  return (
    <RealEstateHoldingForm
      ctaCaption="Add"
      defaultBody={{ realEstateType }}
      apiCallback={addFinancialHoldingForRealEstate}
      isLoading={isLoading}
    />
  );
};

export default AddRealEstateHoldingForm;
