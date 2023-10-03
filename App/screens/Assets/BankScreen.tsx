import { View, StyleSheet, FlatList } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useGetFinancialHoldingForBankQuery } from "../../redux/api/vault/financialHolding/bank/bankApiSlice";
import CustomActivityIndicator from "../../components/Common/CustomActivityIndicator";
import BlueButton from "../../components/Common/Button/BlueButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Empty from "../../components/Common/Empty";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../constants/screenNames";
import { useSelector } from "react-redux";
import { selectBankById } from "../../redux/api/vault/financialArtifact/bank/bankApiSlice";
import FinancialInstitutionInfoCard from "../../components/Common/FinancialInstitutionInfoCard";
import FinancialInstitutionHoldingCard from "../../components/Common/FinancialInstitutionHoldingCard";
import {
  BANK_ACCOUNT_OWNERSHIP_TO_TITLE_MAP,
  BANK_ACCOUNT_TYPES_TO_TITLE_MAP,
} from "../../constants/financialHoldings/bankHolding";
import { numberWithCommas } from "../../utils/manipulators";
import React, { useState } from "react";
import AssetSharingModal from "../../components/Common/AssetSharingModal";
import NotesModal from "../../components/Common/NotesModal";

const BankScreen = ({ route }) => {
  const navigation = useNavigation();

  const { _id } = route.params;

  const bank = useSelector((state) => selectBankById(state, _id));

  const { data, isLoading, isFetching, error, isError } =
    useGetFinancialHoldingForBankQuery(_id);

  const {
    theme: { spacing, colors },
  } = useTheme();

  const pressHandler = () => {
    navigation.navigate(SCREEN_NAMES.addBankFinancialHoldingScreen, {
      parentId: bank._id,
      parentName: `${bank.name}, ${bank.branchName}`,
    });
  };

  const [assetModalVisible, setassetModalVisible] = useState(false);
  const [notesModalVisible, setNotesModalVisible] = useState(false);

  const [artifactDetails, setArtifactDetails] = useState({
    financialArtifact: {},
    financialArtifactId: "",
    financialArtifactType: "",
  });

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
              updateScreenName={SCREEN_NAMES.updateBankScreen}
              institute={bank}
              type="bank"
              instituteTitle={`${bank.name}, ${bank.branchName}`}
            />
          }
          ListHeaderComponentStyle={styles.listHeader}
          contentContainerStyle={styles.listContentContainer}
          data={
            data !== undefined ? data.ids.map((id) => data.entities[id]) : []
          }
          renderItem={({ item }) => {
            return (
              <FinancialInstitutionHoldingCard
                holdingClass={item?.holdingClass}
                updatedAt={item.updatedAt}
                title={
                  BANK_ACCOUNT_TYPES_TO_TITLE_MAP[item?.holding.accountType]
                }
                tagLabel={
                  BANK_ACCOUNT_OWNERSHIP_TO_TITLE_MAP[item?.holding.ownership]
                }
                content={[
                  { key: "Account Number", value: item?.holding.accountNumber },
                  {
                    key: "Amount ",
                    value: item.holding.amount
                      ? `Rs. ${numberWithCommas(item?.holding.amount)}`
                      : "Not Available",
                  },
                  {
                    key: "Nominee",
                    value: item.holding.nominee || "Not Available",
                  },
                ]}
                editButtonCallBack={() => {
                  navigation.navigate(
                    SCREEN_NAMES.updateBankFinancialHoldingScreen,
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
              />
            );
          }}
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
            key: "Account Type: ",
            value: BANK_ACCOUNT_TYPES_TO_TITLE_MAP[
              artifactDetails.financialArtifact?.holding?.accountType
            ]
              ? BANK_ACCOUNT_TYPES_TO_TITLE_MAP[
                  artifactDetails.financialArtifact?.holding?.accountType
                ]
              : "",
          },
          {
            key: "Account Number: ",
            value: artifactDetails.financialArtifact?.holding?.accountNumber
              ? artifactDetails.financialArtifact?.holding?.accountNumber
              : "",
          },
        ]}
      />
    </View>
  );
};

export default BankScreen;
