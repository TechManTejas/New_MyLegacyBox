import React from "react";
import { useAddFinancialHoldingForRealEstateMutation } from "../../../../../testApp/redux/api/vault/financialHolding/realEstate/realEstateApiSlice";
import RealEstateHoldingForm from "../../../../../testApp/components/FinancialHolding/RealEstateHolding/RealEstateHoldingForm";
import { useLocalSearchParams } from "expo-router";

const AddRealEstateHoldingForm = () => {

  const { realEstateType } = useLocalSearchParams()

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
