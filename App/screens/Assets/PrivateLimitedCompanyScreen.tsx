import { View, StyleSheet, FlatList } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import CustomActivityIndicator from "../../components/Common/CustomActivityIndicator";
import BlueButton from "../../components/Common/Button/BlueButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Empty from "../../components/Common/Empty";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../constants/screenNames";
import FinancialInstitutionHoldingItem from "../../components/Common/FinancialInstitutionHoldingCard";
import React, { useState } from "react";
import AssetSharingModal from "../../components/Common/AssetSharingModal";
import NotesModal from "../../components/Common/NotesModal";
import { useGetFinancialHoldingForPrivateLimitedCompanyQuery } from "../../redux/api/vault/financialHolding/privateLimitedCompany/privateLimitedCompanyApiSlice";
import {
  PRIVATE_LIMITED_COMPANY_TYPE_MAP,
  PRIVATE_LIMITED_COMPANY_TYPE_MAP_TO_TITLE_MAP,
} from "../../constants/financialHoldings/privateLimitedHolding";
import { useDeleteFinancialHoldingByIdMutation } from "../../redux/api/vault/financialHolding/allHoldings/allHoldings";
import AssetDeleteModal from "../../components/Common/AssetDeleteModal";

const PrivateLimitedCompanyScreen = () => {
  const navigation = useNavigation();

  const { data, isLoading, isFetching } =
    useGetFinancialHoldingForPrivateLimitedCompanyQuery();

  const {
    theme: { spacing, colors },
  } = useTheme();

  const pressHandler = () => {
    navigation.navigate(
      SCREEN_NAMES.addPrivateLimitedCompanyFinancialHoldingScreen
    );
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

  const [deleteFinancialHoldingByIdMutation] =
    useDeleteFinancialHoldingByIdMutation();

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
              widthKey={45}
              title={item.holding.nameOfCompany}
              updatedAt={item.updatedAt}
              holdingClass={item.holdingClass}
              tagLabel={
                PRIVATE_LIMITED_COMPANY_TYPE_MAP_TO_TITLE_MAP[
                  item.holding.natureOfInvestment
                ]
              }
              content={[
                { key: "CIN Number", value: item.holding.cinNumber },
                ...(item.holding.natureOfInvestment ===
                  PRIVATE_LIMITED_COMPANY_TYPE_MAP.equity ||
                item.holding.natureOfInvestment ===
                  PRIVATE_LIMITED_COMPANY_TYPE_MAP.preference
                  ? [
                      {
                        key: "No of Shares held",
                        value: item.holding.noOfSharesHeld,
                      },
                      {
                        key: "Share Certificate Number",
                        value: item.holding.shareCertificateNumber,
                      },
                    ]
                  : [
                      {
                        key: "No of Shares granted",
                        value: item.holding.noOfSharesGranted,
                      },
                      {
                        key: "No of Shares vested",
                        value: item.holding.noOfSharesVested,
                      },
                    ]),
              ]}
              editButtonCallBack={() => {
                navigation.navigate(
                  SCREEN_NAMES.updatePrivateLimitedCompanyFinancialHoldingScreen,
                  {
                    _id: item._id,
                    financialHolding: item,
                  }
                );
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
        params={[
          {
            key: "Company Name: ",
            value: artifactDetails?.financialArtifact?.holding?.nameOfCompany
              ? artifactDetails?.financialArtifact?.holding?.nameOfCompany
              : "",
          },
          {
            key: "CIN Number: ",
            value: artifactDetails?.financialArtifact?.holding?.cinNumber
              ? artifactDetails?.financialArtifact?.holding?.cinNumber
              : "",
          },
        ]}
      />
      <AssetDeleteModal
        crossButtonCLick={closeAssetDeleteModal}
        assetDeleteModalVisible={assetToDelete.isVisible}
        archiveButtonCallback={() => {
          deleteFinancialHoldingByIdMutation(assetToDelete.assedId).then(() => {
            setAssetToDelete({ isVisible: false, assedId: "" });
          });
        }}
        deleteButtonCallback={() => {
          console.log("delete button clicked");
        }}
      />
    </View>
  );
};

export default PrivateLimitedCompanyScreen;
