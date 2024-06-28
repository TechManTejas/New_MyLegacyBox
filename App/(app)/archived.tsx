import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../testApp/theme/ThemeProvider";
import {
  useGetArchivedFinancialHoldingsQuery,
  usePermanentlyDeleteFinancialHoldingMutation,
  useUnarchiveFinancialHoldingByIdMutation,
} from "../../testApp/redux/api/vault/financialHolding/allHoldings/allHoldings";
import CustomActivityIndicator from "../../testApp/components/Common/CustomActivityIndicator";
import FinancialInstitutionHoldingCard from "../../testApp/components/Common/FinancialInstitutionHoldingCard";
import {
  INSTITUTES_NAME_MAP,
  institutes,
} from "../../testApp/data/NomineeArtifactPropsData";
import { INSTITUTE_PROPS_MAP } from "../../testApp/data/NomineeArtifactPropsData2";
import Empty from "../../testApp/components/Common/Empty";
import AssetDeleteModal from "../../testApp/components/Common/AssetDeleteModal";

const ArchivedAssets = () => {
  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    screen: {
      padding: spacing.md,
    },
    sectiontitle: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
    },
    section: {
      paddingVertical: spacing.md,
    },
  });

  const [assetDeleteData, setAssetDeleteData] = useState({
    isVisible: false,
    assetId: "",
  });

  const { data, isLoading, isFetching } =
    useGetArchivedFinancialHoldingsQuery();

  const [unarchiveFinancialHolding] =
    useUnarchiveFinancialHoldingByIdMutation();

  const [permanentlyDeleteFinancialHolding] =
    usePermanentlyDeleteFinancialHoldingMutation();

  const unarchiveButtonCallBack = (financialHoldingId: string) => {
    unarchiveFinancialHolding(financialHoldingId)
      .unwrap()
      .then((res) => {

      })
      .catch((err) => {

        console.error(err);
      });
  };

  const openAssetDeleteModal = (financialHoldingId: string) => {
    setAssetDeleteData({ isVisible: true, assetId: financialHoldingId });
  };

  const permanentDeleteButtonCallBack = () => {
    permanentlyDeleteFinancialHolding(assetDeleteData.assetId)
      .then((res) => {
        setAssetDeleteData({ isVisible: false, assetId: "" });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (isFetching || isLoading) return <CustomActivityIndicator />;

  if (data !== undefined) {
    const filterArtifact = (institute) => {
      return Object.values(data.entities).filter(
        (item) => item.holdingType === institute
      );
    };

    const allArtifactsData = institutes.map((institute) => {
      return {
        artifactsData: filterArtifact(institute),
        cardProps: INSTITUTE_PROPS_MAP[institute],
        institute,
      };
    });

    if (data.ids.length === 0) return <Empty message="No Assets Archived" />;

    return (
      <View style={styles.screen}>
        <FlatList
          data={allArtifactsData}
          renderItem={(m) => {
            if (m.item.artifactsData.length !== 0) {
              return (
                <View>
                  <View style={styles.section}>
                    <Text style={styles.sectiontitle}>
                      {INSTITUTES_NAME_MAP[m.item.institute]}
                    </Text>
                  </View>
                  <FlatList
                    key={m.index}
                    data={m.item.artifactsData}
                    renderItem={({ item, index }) => {
                      return (
                        <FinancialInstitutionHoldingCard
                          key={index}
                          {...INSTITUTE_PROPS_MAP[m.item.institute](item)}
                          unarchiveButtonCallBack={() =>
                            unarchiveButtonCallBack(item._id)
                          }
                          permanentDeleteButtonCallBack={() =>
                            openAssetDeleteModal(item._id)
                          }
                        />
                      );
                    }}
                  />
                </View>
              );
            }
          }}
        />
        <AssetDeleteModal
          permanentlyDeleteButtonCallback={permanentDeleteButtonCallBack}
          cancelButtonCallBack={() => {
            setAssetDeleteData({ isVisible: false, assetId: "" });
          }}
          crossButtonCLick={() => {
            setAssetDeleteData({ isVisible: false, assetId: "" });
          }}
          assetDeleteModalVisible={assetDeleteData.isVisible}
          infoMessage="Delete action can not be reversed"
          infoTitle="Are you sure to delete it permanently ?"
        />
      </View>
    );
  }
};

export default ArchivedAssets;
