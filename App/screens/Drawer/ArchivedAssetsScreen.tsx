import { View, Text, FlatList, Alert } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import {
  useGetArchivedFinancialHoldingsQuery,
  usePermanentlyDeleteFinancialHoldingMutation,
  useUnarchiveFinancialHoldingByIdMutation,
} from "../../redux/api/vault/financialHolding/allHoldings/allHoldings";
import CustomActivityIndicator from "../../components/Common/CustomActivityIndicator";
import FinancialInstitutionHoldingCard from "../../components/Common/FinancialInstitutionHoldingCard";
import {
  BANK_ACCOUNT_OWNERSHIP_TO_TITLE_MAP,
  BANK_ACCOUNT_TYPES_TO_TITLE_MAP,
} from "../../constants/financialHoldings/bankHolding";
import { numberWithCommas } from "../../utils/manipulators";
import {
  POSTAL_ACCOUNT_OWNERSHIP_TO_TITLE_MAP,
  POSTAL_ACCOUNT_TYPES_TO_TITLE_MAP,
} from "../../constants/financialHoldings/postalHolding";
import {
  POLICY_BENEFICIERY_TO_TITLE_MAP,
  POLICY_PREMIUM_FREQUENCY_TO_TITLE_MAP,
  POLICY_TYPE_TO_TITLE_MAP,
} from "../../constants/financialHoldings/insuranceHolding";
import { DEMAT_TYPE_MAP_TO_TITLE_MAP } from "../../constants/financialHoldings/dematHolding";
import { CASH_TYPE_TO_TITLE_MAP } from "../../constants/financialHoldings/cashHolding";
import {
  REAL_ESTATE_OWNERSHIP_STATUS_TO_TITLE_MAP,
  REAL_ESTATE_PROPERTY_AREA_UNIT_TO_TITLE_MAP,
} from "../../constants/financialHoldings/realEstateHolding";
import { PROVIDENT_FUND_TYPE_TO_TITLE_MAP } from "../../constants/financialHoldings/providentFundHolding";

const ArchivedAssetsScreen = () => {
  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const { data, isLoading, isFetching } =
    useGetArchivedFinancialHoldingsQuery();

  const [unarchiveFinancialHolding] =
    useUnarchiveFinancialHoldingByIdMutation();

  const [permanentlyDeleteFinancialHolding] =
    usePermanentlyDeleteFinancialHoldingMutation();

  const unarchiveButtonCallBack = (financialHoldingId: string) => {
    unarchiveFinancialHolding(financialHoldingId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const permanentDeleteButtonCallBack = (financialHoldingId: string) => {
    permanentlyDeleteFinancialHolding(financialHoldingId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const confirmDeleteHolding = (financialHoldingId: string) => {
    Alert.alert("Permanently Delete", "Are you sure you want to delete ?", [
      {
        text: "Delete",
        onPress: () => {
          permanentlyDeleteFinancialHolding(financialHoldingId)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        },
        style: "destructive",
        isPreferred: true,
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  if (isFetching || isLoading) return <CustomActivityIndicator />;

  if (data !== undefined)
    return (
      <FlatList
        contentContainerStyle={{ padding: spacing.md }}
        data={data.ids}
        renderItem={({ item }) => {
          const asset = data.entities[item];

          if (asset.holdingType === "BANK")
            return (
              <FinancialInstitutionHoldingCard
                unarchiveButtonCallBack={() =>
                  unarchiveButtonCallBack(asset?._id)
                }
                permanentDeleteButtonCallBack={() =>
                  confirmDeleteHolding(asset?._id)
                }
                key={asset?._id}
                holdingClass={asset?.holdingClass}
                updatedAt={asset.updatedAt}
                title={
                  BANK_ACCOUNT_TYPES_TO_TITLE_MAP[asset.holding.accountType]
                }
                tagLabel={
                  BANK_ACCOUNT_OWNERSHIP_TO_TITLE_MAP[asset.holding.ownership]
                }
                content={[
                  {
                    key: "Account Number",
                    value: asset.holding.accountNumber,
                  },
                  {
                    key: "Amount ",
                    value: asset.holding.amount
                      ? `Rs. ${numberWithCommas(asset?.holding.amount)}`
                      : "Not Available",
                  },
                  {
                    key: "Nominee",
                    value: asset.holding.nominee || "Not Available",
                  },
                ]}
              />
            );

          if (asset.holdingType === "POSTAL")
            return (
              <FinancialInstitutionHoldingCard
                unarchiveButtonCallBack={() =>
                  unarchiveButtonCallBack(asset?._id)
                }
                permanentDeleteButtonCallBack={() =>
                  confirmDeleteHolding(asset?._id)
                }
                updatedAt={asset.updatedAt}
                holdingClass={asset.holdingClass}
                title={
                  POSTAL_ACCOUNT_TYPES_TO_TITLE_MAP[asset.holding.accountType]
                }
                tagLabel={
                  POSTAL_ACCOUNT_OWNERSHIP_TO_TITLE_MAP[asset.holding.ownership]
                }
                content={[
                  {
                    key: "Account Number",
                    value: asset.holding.accountNumber,
                  },
                  {
                    key: "Amount ",
                    value: asset.holding.amount
                      ? `Rs. ${numberWithCommas(asset.holding.amount)}`
                      : "Not Available",
                  },
                  {
                    key: "Nominee",
                    value: asset.holding.nominee || "Not Available",
                  },
                ]}
              />
            );

          if (asset.holdingType === "INSURANCE")
            return (
              <FinancialInstitutionHoldingCard
                unarchiveButtonCallBack={() =>
                  unarchiveButtonCallBack(asset?._id)
                }
                permanentDeleteButtonCallBack={() =>
                  confirmDeleteHolding(asset?._id)
                }
                holdingClass={asset.holdingClass}
                title={asset.holding.policyName}
                updatedAt={asset.updatedAt}
                tagLabel={POLICY_TYPE_TO_TITLE_MAP[asset.holding.policyType]}
                content={[
                  { key: "Home Branch ", value: asset.holding.homeBranch },
                  {
                    key: "Policy Number ",
                    value: asset.holding.policyNumber,
                  },
                  {
                    key: "Beneficiary ",
                    value:
                      POLICY_BENEFICIERY_TO_TITLE_MAP[
                        asset.holding.beneficiary
                      ],
                  },
                  {
                    key: "Nominee",
                    value: asset.holding.nominee || "Not Available",
                  },
                  { type: "divider" },
                  {
                    key: "Policy Amount ",
                    value: asset.holding.policyAmount
                      ? `Rs. ${numberWithCommas(asset.holding.policyAmount)}`
                      : "Not Available",
                  },
                  {
                    key: "Date of Maturity ",
                    value: new Date(asset.holding.dateOfMaturity)
                      .toDateString()
                      .replace(/^\w+ /, ""),
                  },
                  { type: "divider" },
                  {
                    key: "Premium Amount ",
                    value: asset.holding.premiumAmount
                      ? `Rs. ${numberWithCommas(asset.holding.premiumAmount)}`
                      : "Not Available",
                  },
                  {
                    key: "Date of Premium ",
                    value: new Date(asset.holding.dateOfPremium)
                      .toDateString()
                      .replace(/^\w+ /, ""),
                  },
                  {
                    key: "Premium Frequency ",
                    value:
                      POLICY_PREMIUM_FREQUENCY_TO_TITLE_MAP[
                        asset.holding.premiumFrequency
                      ],
                  },
                ]}
              />
            );

          if (asset.holdingType === "DEMAT")
            return (
              <FinancialInstitutionHoldingCard
                unarchiveButtonCallBack={() =>
                  unarchiveButtonCallBack(asset?._id)
                }
                permanentDeleteButtonCallBack={() =>
                  confirmDeleteHolding(asset?._id)
                }
                title={asset.holding.broker}
                updatedAt={asset.updatedAt}
                holdingClass={asset.holdingClass}
                tagLabel={DEMAT_TYPE_MAP_TO_TITLE_MAP[asset.holding.dematType]}
                content={[
                  { key: "Customer ID", value: asset.holding.customerId },
                  {
                    key: "Nominee",
                    value: asset.holding.nominee || "Not Available",
                  },
                  { type: "divider" },
                  {
                    key: "Relationship Manager",
                    value: asset.holding.poc || "Not available",
                  },
                  {
                    key: "Relationship Manager's Contact",
                    value: asset.holding.pocNumber || "Not available",
                  },
                  { type: "divider" },
                  {
                    key: "Invested Amount",
                    value: asset.holding.investedAmount
                      ? `Rs. ${numberWithCommas(asset.holding.investedAmount)}`
                      : "Not available",
                  },
                ]}
              />
            );

          if (asset.holdingType === "CASH")
            return (
              <FinancialInstitutionHoldingCard
                unarchiveButtonCallBack={() =>
                  unarchiveButtonCallBack(asset?._id)
                }
                permanentDeleteButtonCallBack={() =>
                  confirmDeleteHolding(asset?._id)
                }
                holdingClass={asset.holdingClass}
                updatedAt={asset.updatedAt}
                title={asset.holding.nameOfParty}
                tagLabel={CASH_TYPE_TO_TITLE_MAP[asset.holding.cashType]}
                content={[
                  {
                    key: "Phone Number",
                    value: asset.holding.phoneNumberOfParty,
                  },
                  {
                    key: "Date of Transaction",
                    value: new Date(asset.holding.dateOfTransaction)
                      .toDateString()
                      .replace(/^\w+ /, ""),
                  },
                  {
                    key: "Amount",
                    value: asset.holding.amount
                      ? `Rs. ${numberWithCommas(asset.holding.amount)}`
                      : "Not Available",
                  },
                  {
                    key: "Nominee",
                    value: asset.holding.nominee || "Not Available",
                  },
                  {
                    key: "Address",
                    value: asset.holding.address
                      ? `${asset.holding.address.street},\n ${asset.holding.address.city}, ${asset.holding.address.state}, ${asset.holding.address.pinCode}`
                      : "Not Available",
                  },
                ]}
              />
            );

          if (asset.holdingType === "REALESTATE")
            return (
              <FinancialInstitutionHoldingCard
                unarchiveButtonCallBack={() =>
                  unarchiveButtonCallBack(asset?._id)
                }
                permanentDeleteButtonCallBack={() =>
                  confirmDeleteHolding(asset?._id)
                }
                title={asset.holding.propertyName}
                holdingClass={asset.holdingClass}
                tagLabel={
                  REAL_ESTATE_OWNERSHIP_STATUS_TO_TITLE_MAP[
                    asset.holding.ownershipStatus
                  ]
                }
                updatedAt={asset.updatedAt}
                content={[
                  {
                    key: "Nominee",
                    value: asset.holding.nominee || "Not Available",
                  },
                  {
                    key: "Ownership share",
                    value: `${asset.holding.ownershipPercentage} %`,
                  },
                  {
                    key: "Area",
                    value: asset.holding.propertyArea
                      ? `${asset.holding.propertyArea}${
                          asset.holding.propertyAreaUnit
                            ? " " +
                              REAL_ESTATE_PROPERTY_AREA_UNIT_TO_TITLE_MAP[
                                asset.holding.propertyAreaUnit
                              ]
                            : ""
                        }`
                      : "Not available",
                  },
                  {
                    key: "Property Value",
                    value: asset.holding.propertyValue
                      ? `Rs. ${numberWithCommas(asset.holding.propertyValue)}`
                      : "Not Available",
                  },
                  {
                    key: "Date of Purchase",
                    value: asset.holding.dateOfPurchase
                      ? new Date(asset.holding.dateOfPurchase)
                          .toDateString()
                          .replace(/^\w+ /, "")
                      : "Not available",
                  },
                  { type: "divider" },
                  {
                    key: "Address",
                    value: asset.holding.address
                      ? `${asset.holding.address.street},\n ${asset.holding.address.city}, ${asset.holding.address.state}, ${asset.holding.address.pinCode}`
                      : "Not Available",
                  },
                  {
                    key: "Description",
                    value: asset.holding.decription || "Not Available",
                  },
                ]}
              />
            );

          if (asset.holdingType === "PROVIDENTFUND")
            return (
              <FinancialInstitutionHoldingCard
                unarchiveButtonCallBack={() =>
                  unarchiveButtonCallBack(asset?._id)
                }
                permanentDeleteButtonCallBack={() =>
                  confirmDeleteHolding(asset?._id)
                }
                title={asset.holding.employerName}
                holdingClass={asset.holdingClass}
                updatedAt={asset.updatedAt}
                tagLabel={
                  PROVIDENT_FUND_TYPE_TO_TITLE_MAP[asset.holding.pfType]
                }
                content={[
                  { key: "UAN", value: asset.holding.uan },
                  {
                    key: "Amount",
                    value: asset.holding.amount
                      ? `Rs. ${numberWithCommas(asset.holding.amount)}`
                      : "Not available",
                  },
                  {
                    key: "Nominee",
                    value: asset.holding.nominee || "Not Available",
                  },
                ]}
              />
            );
        }}
      />
    );
};

export default ArchivedAssetsScreen;
