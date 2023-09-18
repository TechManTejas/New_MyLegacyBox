import { View, StyleSheet, FlatList } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { useGetFinancialHoldingForPostalQuery } from "../services/financialHolding/financialHoldingSlice";
import CustomActivityIndicator from "../components/Common/CustomActivityIndicator";
import BlueButton from "../components/Common/Button/BlueButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Empty from "../components/Common/Empty";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../constants/screenNames";
import { useSelector } from "react-redux";
import { selectPostalById } from "../services/postal/postalSlice";
import FinancialInstitutionInfoCard from "../components/Common/FinancialInstitutionInfoCard";
import FinancialInstitutionHoldingCard from "../components/Common/FinancialInstitutionHoldingCard";
import {
  POSTAL_ACCOUNT_OWNERSHIP_TO_TITLE_MAP,
  POSTAL_ACCOUNT_TYPES_TO_TITLE_MAP,
} from "../constants/financialHoldings/postalHolding";
import { numberWithCommas } from "../utils/manipulators";
import { useState } from "react";
import AssetSharingModal from "../components/Common/AssetSharingModal";
import NotesModal from "../components/Common/NotesModal";

const PostalScreen = ({ route }) => {
  const navigation = useNavigation();
  const { _id } = route.params;
  const postal = useSelector((state) => selectPostalById(state, _id));

  const { data, isLoading, isFetching } =
    useGetFinancialHoldingForPostalQuery(_id);

  const {
    theme: { spacing, colors },
  } = useTheme();

  const pressHandler = () => {
    navigation.navigate(SCREEN_NAMES.addPostalFinancialHoldingScreen, {
      parentId: postal._id,
      parentName: postal.branchName,
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
              updateScreenName={SCREEN_NAMES.updatePostalScreen}
              institute={postal}
              type="postal"
              instituteTitle={postal.branchName}
            />
          }
          ListHeaderComponentStyle={styles.listHeader}
          contentContainerStyle={styles.listContentContainer}
          data={
            data !== undefined ? data.ids.map((id) => data.entities[id]) : []
          }
          renderItem={({ item }) => (
            <FinancialInstitutionHoldingCard
              updatedAt={item.updatedAt}
              holdingClass={item.holdingClass}
              title={
                POSTAL_ACCOUNT_TYPES_TO_TITLE_MAP[item.holding.accountType]
              }
              tagLabel={
                POSTAL_ACCOUNT_OWNERSHIP_TO_TITLE_MAP[item.holding.ownership]
              }
              content={[
                { key: "Account Number", value: item.holding.accountNumber },
                {
                  key: "Amount ",
                  value: item.holding.amount
                    ? `Rs. ${numberWithCommas(item.holding.amount)}`
                    : "Not Available",
                },
                {
                  key: "Nominee",
                  value: item.holding.nominee || "Not Available",
                },
              ]}
              editButtonCallBack={() => {
                navigation.navigate(
                  SCREEN_NAMES.updatePostalFinancialHoldingScreen,
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
            key: "Account Type: ",
            value:
              POSTAL_ACCOUNT_TYPES_TO_TITLE_MAP[
                artifactDetails.financialArtifact?.holding?.accountType
              ] ?? "",
          },
          {
            key: "Account Number: ",
            value:
              artifactDetails.financialArtifact?.holding?.accountNumber ?? "",
          },
        ]}
      />
    </View>
  );
};

export default PostalScreen;
