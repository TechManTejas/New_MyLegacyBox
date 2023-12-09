import { View, StyleSheet, FlatList } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useGetFinancialHoldingForProvidentFundQuery } from "../../redux/api/vault/financialHolding/providentFundApiSlice/providentFundApiSlice";
import CustomActivityIndicator from "../../components/Common/CustomActivityIndicator";
import BlueButton from "../../components/Common/Button/BlueButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Empty from "../../components/Common/Empty";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../constants/screenNames";
import FinancialInstitutionHoldingItem from "../../components/Common/FinancialInstitutionHoldingCard";
import { PROVIDENT_FUND_TYPE_TO_TITLE_MAP } from "../../constants/financialHoldings/providentFundHolding";
import { numberWithCommas } from "../../utils/manipulators";
import React, { useState } from "react";
import AssetSharingModal from "../../components/Common/AssetSharingModal";
import NotesModal from "../../components/Common/NotesModal";
import { useDeleteFinancialHoldingByIdMutation } from "../../redux/api/vault/financialHolding/allHoldings/allHoldings";
import AssetDeleteModal from "../../components/Common/AssetDeleteModal";

const ProvidentFundScreen = () => {
  const navigation = useNavigation();

  const { data, isLoading, isFetching } =
    useGetFinancialHoldingForProvidentFundQuery();

  const {
    theme: { spacing, colors },
  } = useTheme();

  const pressHandler = () => {
    navigation.navigate(SCREEN_NAMES.addProvidentFundFinancialHoldingScreen);
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
              title={item.holding.employerName}
              holdingClass={item.holdingClass}
              updatedAt={item.updatedAt}
              tagLabel={PROVIDENT_FUND_TYPE_TO_TITLE_MAP[item.holding.pfType]}
              content={[
                { key: "UAN", value: item.holding.uan },
                {
                  key: "Amount",
                  value: item.holding.amount
                    ? `Rs. ${numberWithCommas(item.holding.amount)}`
                    : "Not available",
                },
                {
                  key: "Nominee",
                  value: item.holding.nominee || "Not Available",
                },
              ]}
              editButtonCallBack={() => {
                navigation.navigate(
                  SCREEN_NAMES.updateProvidentFundFinancialHoldingScreen,
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
          title="Add Account"
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
            key: "Employer Name: ",
            value: artifactDetails.financialArtifact?.holding?.employerName
              ? artifactDetails.financialArtifact?.holding?.employerName
              : "",
          },
          {
            key: "Type: ",
            value: PROVIDENT_FUND_TYPE_TO_TITLE_MAP[
              artifactDetails.financialArtifact?.holding?.pfType
            ]
              ? PROVIDENT_FUND_TYPE_TO_TITLE_MAP[
                  artifactDetails.financialArtifact?.holding?.pfType
                ]
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

export default ProvidentFundScreen;
