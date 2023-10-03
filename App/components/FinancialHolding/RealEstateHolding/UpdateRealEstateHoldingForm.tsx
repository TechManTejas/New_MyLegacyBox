import React from "react";
import { useUpdateFinancialHoldingForRealEstateMutation } from "../../../redux/api/vault/financialHolding/realEstate/realEstateApiSlice";
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
      ctaCaption="Update"
      apiCallback={updateRealEstateFinancialHolding}
      isLoading={isLoading}
      defaultBody={{ _id, realEstateType: holding.realEstateType }}
      initialValues={holding}
    />
  );
};

export default UpdateRealEstateHoldingForm;
