import { View, StyleSheet, FlatList } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { useGetFinancialHoldingForDematQuery } from "../services/financialHolding/financialHoldingSlice";
import CustomActivityIndicator from "../components/Common/CustomActivityIndicator";
import BlueButton from "../components/Common/Button/BlueButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Empty from "../components/Common/Empty";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../constants/screenNames";
import FinancialInstitutionHoldingItem from "../components/Common/FinancialInstitutionHoldingCard";
import { DEMAT_TYPE_MAP_TO_TITLE_MAP } from "../constants/financialHoldings/dematHolding";
import { numberWithCommas } from "../utils/manipulators";
import { useState } from "react";
import AssetSharingModal from "../components/Common/AssetSharingModal";

const DematScreen = () => {
  const navigation = useNavigation();

  const { data, isLoading, isFetching } = useGetFinancialHoldingForDematQuery();

  const {
    theme: { spacing, colors },
  } = useTheme();

  const pressHandler = () => {
    navigation.navigate(SCREEN_NAMES.addDematFinancialHoldingScreen);
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
          data={data.ids.map((id) => data.entities[id])}
          renderItem={({ item }) => (
            <FinancialInstitutionHoldingItem
              title={item.holding.broker}
              updatedAt={item.updatedAt}
              holdingClass={item.holdingClass}
              tagLabel={DEMAT_TYPE_MAP_TO_TITLE_MAP[item.holding.dematType]}
              content={[
                {
                  key: "Nominee",
                  value: item.holding.nominee || "Not Available",
                },
                { key: "Customer ID", value: item.holding.customerId },
                { type: "divider" },
                {
                  key: "Relationship Manager",
                  value: item.holding.poc || "Not available",
                },
                {
                  key: "Relationship Manager's Contact",
                  value: item.holding.pocNumber || "Not available",
                },
                { type: "divider" },
                {
                  key: "Invested Amount",
                  value: item.holding.investedAmount
                    ? `Rs. ${numberWithCommas(item.holding.investedAmount)}`
                    : "Not available",
                },
              ]}
              editButtonCallBack={() => {
                navigation.navigate(
                  SCREEN_NAMES.updateDematFinancialHoldingScreen,
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
          title="Add Holding"
          onPress={pressHandler}
        />
      </View>
      <AssetSharingModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        artifactDetails={artifactDetails}
      />
    </View>
  );
};

export default DematScreen;
