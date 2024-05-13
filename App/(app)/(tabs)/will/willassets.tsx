import { View, Text, StyleSheet, SectionList } from "react-native";
import React from "react";
import {
  getSelectedAssetsEntitiesSelector,
  removeSelectedAssetRedux,
} from "../../../../testApp/redux/form/willFormSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../../testApp/theme/ThemeProvider";
import WillFormContainer from "../../../../testApp/components/Will/WillFormContainer";
import { useGetBanksQuery } from "../../../../testApp/redux/api/vault/financialArtifact/bank/bankApiSlice";
import { useGetPostalsQuery } from "../../../../testApp/redux/api/vault/financialArtifact/postal/postalApiSlice";
import { useGetInsurancesQuery } from "../../../../testApp/redux/api/vault/financialArtifact/insurance/insuranceApiSlice";
import { useGetAllFinancialHoldingsQuery } from "../../../../testApp/redux/api/vault/financialHolding/allHoldings/allHoldings";
import CustomActivityIndicator from "../../../../testApp/components/Common/CustomActivityIndicator";
import Empty from "../../../../testApp/components/Common/Empty";
import WillAssetCard from "../../../../testApp/components/Will/WillAssetCard";
import {
  FINANCIAL_HOLDING_CLASS_TYPE_MAP,
  FINANCIAL_HOLDING_TYPE_MAP,
} from "../../../../testApp/constants/financialHoldings/financialHolding";
import { addSelectedAssetRedux } from "../../../../testApp/redux/form/willFormSlice";
import { PROVIDENT_FUND_TYPE_TO_TITLE_MAP } from "../../../../testApp/constants/financialHoldings/providentFundHolding";
import { useMemo } from "react";
import { BANK_ACCOUNT_OWNERSHIP_MAP } from "../../../../testApp/constants/financialHoldings/bankHolding";
import { useRouter } from "expo-router";

const WillAssetsScreen = () => {
  const router = useRouter()

  const dispatch = useDispatch();

  const selectedAssetsEntities = useSelector((state) =>
    getSelectedAssetsEntitiesSelector(state)
  );

  const allFinancialHolding = useGetAllFinancialHoldingsQuery();
  const banks = useGetBanksQuery();
  const postals = useGetPostalsQuery();
  const insurances = useGetInsurancesQuery();

  const {
    data: allFinancialHoldingData,
    isFetching: isAllFinancialHoldingFetching,
    isLoading: isAllFinancialHoldingLoading,
    isError: isAllFinancialHoldingError,
    error: allFinancialHoldingError,
  } = allFinancialHolding;

  const {
    data: bankData,
    isFetching: isBankFetching,
    isLoading: isBankLoading,
    isError: isBankError,
    error: bankError,
  } = banks;

  const {
    data: postalData,
    isFetching: isPostalFetching,
    isLoading: isPostalLoading,
    isError: isPostalError,
    error: postalError,
  } = postals;

  const {
    data: insuranceData,
    isFetching: isInsuranceFetching,
    isLoading: isInsuranceLoading,
    isError: isInsuranceError,
    error: insuranceError,
  } = insurances;

  const {
    theme: { spacing, colors, fontFamily, fontSize },
  } = useTheme();

  const financialData = useMemo(() => {
    return allFinancialHoldingData && allFinancialHoldingData.ids
      ? allFinancialHoldingData.ids
          .map((id) => allFinancialHoldingData.entities[id])
          .filter(
            (financialHolding) =>
              financialHolding.holdingClass !==
                FINANCIAL_HOLDING_CLASS_TYPE_MAP.debt &&
              (financialHolding.holding.ownership
                ? financialHolding.holding.ownership ===
                  BANK_ACCOUNT_OWNERSHIP_MAP.single
                : true)
          )
      : undefined;
  }, [allFinancialHoldingData]);

  const sectionListData = useMemo(() => {
    const result =
      bankData && postalData && insuranceData && financialData
        ? [
            {
              title: "Bank",
              data: financialData
                .filter(
                  (financialHolding) =>
                    financialHolding.holdingType ===
                    FINANCIAL_HOLDING_TYPE_MAP.bank
                )
                .reduce(
                  (acc, holding) => {
                    if (!acc.lookup[holding.parentId]) {
                      acc.lookup[holding.parentId] = true;
                      acc.ids.push(holding.parentId);
                    }

                    return acc;
                  },
                  {
                    lookup: {},
                    ids: [],
                  }
                )
                .ids.map((parentId) => bankData.entities[parentId]),
              //  bankData.ids.map((id) => bankData.entities[id]),
            },
            {
              title: "Postal",
              data: financialData
                .filter(
                  (financialHolding) =>
                    financialHolding.holdingType ===
                    FINANCIAL_HOLDING_TYPE_MAP.postal
                )
                .reduce(
                  (acc, holding) => {
                    if (!acc.lookup[holding.parentId]) {
                      acc.lookup[holding.parentId] = true;
                      acc.ids.push(holding.parentId);
                    }

                    return acc;
                  },
                  {
                    lookup: {},
                    ids: [],
                  }
                )
                .ids.map((parentId) => postalData.entities[parentId]),
            },
            {
              title: "Insurance",
              data: financialData
                .filter(
                  (financialHolding) =>
                    financialHolding.holdingType ===
                    FINANCIAL_HOLDING_TYPE_MAP.insurance
                )
                .reduce(
                  (acc, holding) => {
                    if (!acc.lookup[holding.parentId]) {
                      acc.lookup[holding.parentId] = true;
                      acc.ids.push(holding.parentId);
                    }

                    return acc;
                  },
                  {
                    lookup: {},
                    ids: [],
                  }
                )
                .ids.map((parentId) => insuranceData.entities[parentId]),
            },
            {
              title: "Demat",
              data: financialData.filter(
                (financialHolding) =>
                  financialHolding.holdingType ===
                  FINANCIAL_HOLDING_TYPE_MAP.demat
              ),
            },
            {
              title: "Proprietorship",
              data: financialData.filter(
                (financialHolding) =>
                  financialHolding.holdingType ===
                  FINANCIAL_HOLDING_TYPE_MAP.proprietorship
              ),
            },
            {
              title: "Partnership",
              data: financialData.filter(
                (financialHolding) =>
                  financialHolding.holdingType ===
                  FINANCIAL_HOLDING_TYPE_MAP.partnership
              ),
            },
            {
              title: "Private Limited Company",
              data: financialData.filter(
                (financialHolding) =>
                  financialHolding.holdingType ===
                  FINANCIAL_HOLDING_TYPE_MAP.privateLimitedCompany
              ),
            },
            {
              title: "Provident Fund",
              data: financialData.filter(
                (financialHolding) =>
                  financialHolding.holdingType ===
                  FINANCIAL_HOLDING_TYPE_MAP.providentFund
              ),
            },
            {
              title: "Real Estate",
              data: financialData.filter(
                (financialHolding) =>
                  financialHolding.holdingType ===
                  FINANCIAL_HOLDING_TYPE_MAP.realEstate
              ),
            },
            {
              title: "Cash",
              data: financialData.filter(
                (financialHolding) =>
                  financialHolding.holdingType ===
                  FINANCIAL_HOLDING_TYPE_MAP.cash
              ),
            },
          ].filter((section) => section.data && section.data.length > 0)
        : undefined;

    return result;
  }, [financialData, bankData, postalData, insuranceData]);

  const pressHandler = (item, sectionTitle, itemTitle) => {
    const children = financialData.filter(
      (financialHolding) => financialHolding.parentId === item._id
    );

    if (selectedAssetsEntities[item._id]) {
      dispatch(removeSelectedAssetRedux(item._id));
    } else {
      dispatch(
        addSelectedAssetRedux({
          _id: item._id,
          itemTitle,
          asset: item,
          rawSection: sectionTitle,
          section: sectionTitle.toUpperCase().split(" ").join("_"),
          children,
        })
      );
    }
  };

  const getItemTitleAndSubTitle = (item, sectionTitle) => {
    let title, subTitle;

    if (sectionTitle === "Bank") {
      title = `${item.name}, ${item.branchName}`;
      subTitle = item.ifsc;
    } else if (sectionTitle === "Postal") {
      title = item.branchName;
      subTitle = item.ifsc ? item.ifsc : "IFSC unavailable";
    } else if (sectionTitle === "Insurance") {
      title = item.companyName;
      subTitle = item.customerId ? item.customerId : "Customer ID unavailable";
    } else {
      switch (item.holdingType) {
        case FINANCIAL_HOLDING_TYPE_MAP.demat:
          title = item.holding.broker;
          subTitle = item.holding.customerId;
          break;
        case FINANCIAL_HOLDING_TYPE_MAP.proprietorship:
          title = item.holding.organisationName;
          subTitle = item.holding.gstNumber;
          break;
        case FINANCIAL_HOLDING_TYPE_MAP.partnership:
          title = item.holding.nameOfFirm;
          subTitle = item.holding.panNumber;
          break;
        case FINANCIAL_HOLDING_TYPE_MAP.privateLimitedCompany:
          title = item.holding.nameOfCompany;
          subTitle = item.holding.cinNumber;
          break;
        case FINANCIAL_HOLDING_TYPE_MAP.providentFund:
          title = PROVIDENT_FUND_TYPE_TO_TITLE_MAP[item.holding.pfType];
          subTitle = item.holding.uan;
          break;
        case FINANCIAL_HOLDING_TYPE_MAP.realEstate:
          title = item.holding.propertyName;
          subTitle = `${item.holding.address.street}, ${item.holding.address.city}`;
          break;
        case FINANCIAL_HOLDING_TYPE_MAP.cash:
          title = `${item.holding.nameOfParty} (${item.holding.cashType})`;
          subTitle = item.holding.phoneNumberOfParty;
          break;
        default:
          title = "unset";
          subTitle = "unset";
          break;
      }
    }

    return { title, subTitle };
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white100,
    },
    content: {
      flex: 1,
    },
    listContentContainer: {
      flex: 0,
    },
    marginBottomLg: {
      marginBottom: spacing.lg,
    },
    assetContainerStyle: {
      paddingHorizontal: spacing.lg,
    },
    sectionTitleContainer: {
      marginBottom: spacing.md,
      paddingHorizontal: spacing.lg,
    },
    sectionTitle: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
      paddingBottom: spacing.xs,
      color: colors.black400,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black200,
    },
    emptyContent: {
      padding: spacing.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black200,
      marginBottom: spacing.md,
      borderRadius: spacing.sm,
    },
    emptyText: {
      fontFamily: fontFamily.regular,
      lineHeight: fontSize.lg,
      color: colors.blue400,
    },
  });

  if (
    isAllFinancialHoldingFetching ||
    isAllFinancialHoldingLoading ||
    isBankLoading ||
    isBankFetching ||
    isPostalFetching ||
    isPostalLoading ||
    isInsuranceLoading ||
    isInsuranceFetching
  )
    return <CustomActivityIndicator />;

  if (
    isAllFinancialHoldingError ||
    isBankError ||
    isPostalError ||
    isInsuranceError
  )
    return <Empty message="Unable to fetch financial artifacts" />;

  return (
    <View style={styles.container}>
      <WillFormContainer
        Handler={() => router.push("/will/willassetinfo")}
        nextDisabled={Object.keys(selectedAssetsEntities).length < 1}
        title="Next"
      >
        <View style={styles.content}>
          <SectionList
            sections={sectionListData}
            keyExtractor={({ _id }) => _id}
            renderItem={({ item, index, section }) => {
              return (
                <View style={styles.assetContainerStyle}>
                  <WillAssetCard
                    {...getItemTitleAndSubTitle(item, section.title)}
                    pressHandler={(itemTitle) => {
                      pressHandler(item, section.title, itemTitle);
                    }}
                    selected={!!selectedAssetsEntities[item._id]}
                  />
                </View>
              );
            }}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>{title}</Text>
              </View>
            )}
            renderSectionFooter={() => (
              <View style={styles.marginBottomLg}></View>
            )}
            ListHeaderComponent={() => (
              <View style={styles.marginBottomLg}></View>
            )}
            ListFooterComponent={() => (
              <View style={styles.marginBottomLg}></View>
            )}
          />
        </View>
      </WillFormContainer>
    </View>
  );
};

export default WillAssetsScreen;
