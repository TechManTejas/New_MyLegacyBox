import React from "react";
import {
  useGetFinancialHoldingForRealEstateQuery,
  useUpdateFinancialHoldingForRealEstateMutation,
} from "../../../../../testApp/redux/api/vault/financialHolding/realEstate/realEstateApiSlice";
import RealEstateHoldingForm from "../../../../../testApp/components/FinancialHolding/RealEstateHolding/RealEstateHoldingForm";
import { useLocalSearchParams } from "expo-router";

const UpdateRealEstateHoldingForm = () => {
  const [updateRealEstateFinancialHolding, { isLoading }] =
    useUpdateFinancialHoldingForRealEstateMutation();

  const { _id } = useLocalSearchParams();

  const { data } = useGetFinancialHoldingForRealEstateQuery(_id);

  return (
    <RealEstateHoldingForm
      ctaCaption="Update"
      apiCallback={updateRealEstateFinancialHolding}
      isLoading={isLoading}
      defaultBody={{
        _id,
        realEstateType: data?.entities[_id as string]["realEstateType"],
      }}
      initialValues={data?.entities[_id as string]["holding"]}
    />
  );
};

export default UpdateRealEstateHoldingForm;
