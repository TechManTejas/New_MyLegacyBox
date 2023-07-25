import { View, StyleSheet, FlatList } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { useGetFinancialHoldingForProvidentFundQuery } from "../services/financialHolding/financialHoldingSlice";
import CustomActivityIndicator from "../components/Common/CustomActivityIndicator";
import BlueButton from "../components/Common/Button/BlueButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Empty from "../components/Common/Empty";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../constants/screenNames";
import FinancialInstitutionHoldingItem from "../components/Common/FinancialInstitutionHoldingCard";
import { PROVIDENT_FUND_TYPE_TO_TITLE_MAP } from "../constants/financialHoldings/providentFundHolding";
import { numberWithCommas } from "../utils/manipulators";
import { useState } from "react";
import AssetSharingModal from "../components/Common/AssetSharingModal";

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

  const [modalVisible, setModalVisible] = useState(false);
  const [artifactDetails, setArtifactDetails] = useState({
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
          data={ data !== undefined ? data.ids.map((id) => data.entities[id]): []}
          renderItem={({ item }) => (
            <FinancialInstitutionHoldingItem
              title={item.holding.employerName}
              holdingClass={item.holdingClass}
              updatedAt={item.updatedAt}
              tagLabel={PROVIDENT_FUND_TYPE_TO_TITLE_MAP[item.holding.pfType]}
              content={[
                {
                  key: "Nominee",
                  value: item.holding.nominee || "Not Available",
                },
                { key: "UAN", value: item.holding.uan },
                {
                  key: "Amount",
                  value: item.holding.amount
                    ? `Rs. ${numberWithCommas(item.holding.amount)}`
                    : "Not available",
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
                setModalVisible(true);
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
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        artifactDetails={artifactDetails}
        setArtifactDetails={setArtifactDetails}
      />
    </View>
  );
};

export default ProvidentFundScreen;
