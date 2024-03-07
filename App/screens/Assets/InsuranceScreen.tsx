import { View, StyleSheet, FlatList } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useGetFinancialHoldingForInsuranceQuery } from "../../redux/api/vault/financialHolding/insurance/insuranceApiSlice";
import CustomActivityIndicator from "../../components/Common/CustomActivityIndicator";
import BlueButton from "../../components/Common/Button/BlueButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Empty from "../../components/Common/Empty";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../constants/screenNames";
import { useSelector } from "react-redux";
import { selectInsuranceById } from "../../redux/api/vault/financialArtifact/insurance/insuranceApiSlice";
import FinancialInstitutionInfoCard from "../../components/Common/FinancialInstitutionInfoCard";
import FinancialInstitutionHoldingCard from "../../components/Common/FinancialInstitutionHoldingCard";
import { POLICY_TYPE_TO_TITLE_MAP } from "../../constants/financialHoldings/insuranceHolding";
import React, { useState } from "react";
import AssetSharingModal from "../../components/Common/AssetSharingModal";
import NotesModal from "../../components/Common/NotesModal";
import {
  useArchiveFinancialHoldingByIdMutation,
  usePermanentlyDeleteFinancialHoldingMutation,
} from "../../redux/api/vault/financialHolding/allHoldings/allHoldings";
import AssetDeleteModal from "../../components/Common/AssetDeleteModal";
import { HOLDINGS_PROPS_MAP } from "../../data/AllHoldingsPropsData";

const InsuranceScreen = ({ route }) => {
  const navigation = useNavigation();
  const { _id } = route.params;
  const insurance = useSelector((state) => selectInsuranceById(state, _id));

  const { data, isLoading, isFetching } =
    useGetFinancialHoldingForInsuranceQuery(_id);

  const [permanentlyDeleteFinancialHolding] =
    usePermanentlyDeleteFinancialHoldingMutation();

  const {
    theme: { spacing, colors },
  } = useTheme();

  const pressHandler = () => {
    navigation.navigate(SCREEN_NAMES.addInsuranceFinancialHoldingScreen, {
      parentId: insurance._id,
      parentName: insurance.companyName,
    });
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
          ListHeaderComponent={
            <FinancialInstitutionInfoCard
              updateScreenName={SCREEN_NAMES.updateinsuranceScreen}
              institute={insurance}
              type="insurance"
              instituteTitle={insurance.companyName}
            />
          }
          ListHeaderComponentStyle={styles.listHeader}
          contentContainerStyle={styles.listContentContainer}
          data={
            data !== undefined ? data.ids.map((id) => data.entities[id]) : []
          }
          renderItem={({ item }) => (
            <FinancialInstitutionHoldingCard
              {...HOLDINGS_PROPS_MAP.INSURANCE(item)}
              editButtonCallBack={() => {
                navigation.navigate(
                  SCREEN_NAMES.updateInsuranceFinancialHoldingScreen,
                  {
                    _id: item._id,
                    parentId: item.parentId,
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
          title="Add Policy"
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
            key: "Policy Name: ",
            value: POLICY_TYPE_TO_TITLE_MAP[
              artifactDetails.financialArtifact?.holding?.policyType
            ]
              ? POLICY_TYPE_TO_TITLE_MAP[
                  artifactDetails.financialArtifact?.holding?.policyType
                ]
              : "",
          },
          {
            key: "Policy Number: ",
            value: artifactDetails.financialArtifact?.holding?.policyNumber
              ? artifactDetails.financialArtifact?.holding?.policyNumber
              : "",
          },
        ]}
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

export default InsuranceScreen;
