import { View, StyleSheet, FlatList } from "react-native";
import { useTheme } from "../../../../../testApp/theme/ThemeProvider";
import { useGetFinancialHoldingForCashQuery } from "../../../../../testApp/redux/api/vault/financialHolding/cash/cashApiSlice";
import CustomActivityIndicator from "../../../../../testApp/components/Common/CustomActivityIndicator";
import BlueButton from "../../../../../testApp/components/Common/Button/BlueButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Empty from "../../../../../testApp/components/Common/Empty";
import FinancialInstitutionHoldingItem from "../../../../../testApp/components/Common/FinancialInstitutionHoldingCard";
import React, { useState } from "react";
import AssetSharingModal from "../../../../../testApp/components/Common/AssetSharingModal";
import NotesModal from "../../../../../testApp/components/Common/NotesModal";
import {
  useArchiveFinancialHoldingByIdMutation,
  usePermanentlyDeleteFinancialHoldingMutation,
} from "../../../../../testApp/redux/api/vault/financialHolding/allHoldings/allHoldings";
import AssetDeleteModal from "../../../../../testApp/components/Common/AssetDeleteModal";
import { HOLDINGS_PROPS_MAP } from "../../../../../testApp/data/AllHoldingsPropsData";
import { router } from "expo-router";

const CashScreen = () => {
  const { data, isLoading, isFetching } = useGetFinancialHoldingForCashQuery();

  const [permanentlyDeleteFinancialHolding] =
    usePermanentlyDeleteFinancialHoldingMutation();

  const {
    theme: { spacing, colors },
  } = useTheme();

  const pressHandler = () => {
    router.push("/home/cash/addcashholding");
  };

  const [assetModalVisible, setassetModalVisible] = useState(false);
  const [notesModalVisible, setNotesModalVisible] = useState(false);

  const [artifactDetails, setArtifactDetails] = useState({
    financialArtifact: {},
    financialArtifactId: "",
    financialArtifactType: "",
  });

  const [assetToDelete, setAssetToDelete] = useState({
    isVisible: false,
    assedId: "",
  });

  const closeAssetDeleteModal = () => {
    setAssetToDelete({ isVisible: false, assedId: "" });
  };

  const [archiveFinancialHoldingByIdMutation] =
    useArchiveFinancialHoldingByIdMutation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white100,
    },
    listContainer: {
      flex: 1,
      paddingTop: spacing.lg,
    },
    listHeader: {
      paddingTop: spacing.lg,
    },
    listContentContainer: {
      flexGrow: 1,
      paddingHorizontal: spacing.lg,
    },
    footer: {
      paddingVertical: spacing.md,
      paddingBottom: spacing.lg,
      paddingHorizontal: spacing.lg,
    },
  });

  if (isLoading || isFetching) return <CustomActivityIndicator />;

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          contentContainerStyle={styles.listContentContainer}
          data={
            data !== undefined ? data.ids.map((id) => data.entities[id]) : []
          }
          renderItem={({ item }) => (
            <FinancialInstitutionHoldingItem
              {...HOLDINGS_PROPS_MAP.CASH(item)}
              editButtonCallBack={() => {
                router.push({
                  pathname: "/home/cash/updatecashholding",
                  params: {
                    _id: item._id,
                    financialHolding: item,
                  },
                });
              }}
              shareButtonCallBack={() => {
                setArtifactDetails({
                  financialArtifactId: item._id,
                  financialArtifactType: item.holdingType,
                });
                setassetModalVisible(true);
              }}
              notesButtonCallBack={() => {
                setArtifactDetails({
                  financialArtifact: item,
                  financialArtifactId: item._id,
                  financialArtifactType: item.holdingType,
                });
                setNotesModalVisible(true);
              }}
              deleteButtonCallBack={() => {
                setAssetToDelete({
                  isVisible: true,
                  assedId: item._id,
                });
              }}
            />
          )}
          keyExtractor={({ _id }) => _id}
          ListEmptyComponent={() => <Empty message="No holdings available" />}
        />
      </View>
      <View style={styles.footer}>
        <BlueButton
          outline
          Icon={FontAwesome5}
          iconName="plus"
          title="Add Holding"
          onPress={pressHandler}
        />
      </View>
      <AssetSharingModal
        modalVisible={assetModalVisible}
        setModalVisible={setassetModalVisible}
        artifactDetails={artifactDetails}
        setArtifactDetails={setArtifactDetails}
      />
      <NotesModal
        modalVisible={notesModalVisible}
        setModalVisible={setNotesModalVisible}
        artifactDetails={artifactDetails}
        setArtifactDetails={setArtifactDetails}
      />
      <AssetDeleteModal
        crossButtonCLick={closeAssetDeleteModal}
        assetDeleteModalVisible={assetToDelete.isVisible}
        archiveButtonCallback={() => {
          archiveFinancialHoldingByIdMutation(assetToDelete.assedId).then(
            () => {
              setAssetToDelete({ isVisible: false, assedId: "" });
            }
          );
        }}
        deleteButtonCallback={() => {
          permanentlyDeleteFinancialHolding(assetToDelete.assedId)
            .then(() => {
              setAssetToDelete({ isVisible: false, assedId: "" });
            })
            .catch((err) => {
              console.error(err);
            });
        }}
      />
    </View>
  );
};

export default CashScreen;
