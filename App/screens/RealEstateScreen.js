import { View, StyleSheet, FlatList } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { useGetFinancialHoldingForRealEstateQuery } from "../services/financialHolding/financialHoldingSlice";
import CustomActivityIndicator from "../components/Common/CustomActivityIndicator";
import BlueButton from "../components/Common/Button/BlueButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Empty from "../components/Common/Empty";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SCREEN_NAMES } from "../constants/screenNames";
import FinancialInstitutionHoldingItem from "../components/Common/FinancialInstitutionHoldingCard";
import {
  REAL_ESTATE_OWNERSHIP_STATUS_TO_TITLE_MAP,
  REAL_ESTATE_PROPERTY_AREA_UNIT_TO_TITLE_MAP,
} from "../constants/financialHoldings/realEstateHolding";
import { numberWithCommas } from "../utils/manipulators";
import { useState } from "react";
import AssetsShareRevokeModal from "../components/Common/AssetsShareRevokeModal";

const RealEstateScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const { realEstateType } = route.params;

  const { data, isLoading, isFetching } =
    useGetFinancialHoldingForRealEstateQuery({ realEstateType });

  const {
    theme: { spacing, colors },
  } = useTheme();

  const pressHandler = () => {
    navigation.navigate(SCREEN_NAMES.addRealEstateFinancialHoldingScreen, {
      realEstateType,
    });
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
              title={item.holding.propertyName}
              holdingClass={item.holdingClass}
              tagLabel={
                REAL_ESTATE_OWNERSHIP_STATUS_TO_TITLE_MAP[
                  item.holding.ownershipStatus
                ]
              }
              updatedAt={item.updatedAt}
              content={[
                {
                  key: "Ownership share",
                  value: `${item.holding.ownershipPercentage} %`,
                },
                {
                  key: "Area",
                  value: item.holding.propertyArea
                    ? `${item.holding.propertyArea}${
                        item.holding.propertyAreaUnit
                          ? " " +
                            REAL_ESTATE_PROPERTY_AREA_UNIT_TO_TITLE_MAP[
                              item.holding.propertyAreaUnit
                            ]
                          : ""
                      }`
                    : "Not available",
                },
                {
                  key: "Property Value",
                  value: item.holding.propertyValue
                    ? `Rs. ${numberWithCommas(item.holding.propertyValue)}`
                    : "Not Available",
                },
                {
                  key: "Date of Purchase",
                  value: item.holding.dateOfPurchase
                    ? new Date(item.holding.dateOfPurchase)
                        .toDateString()
                        .replace(/^\w+ /, "")
                    : "Not available",
                },
                { type: "divider" },
                {
                  key: "Address",
                  value: item.holding.address
                    ? `${item.holding.address.street},\n ${item.holding.address.city}, ${item.holding.address.state}, ${item.holding.address.pinCode}`
                    : "Not Available",
                },
                {
                  key: "Description",
                  value: item.holding.decription || "Not Available",
                },
              ]}
              editButtonCallBack={() => {
                navigation.navigate(
                  SCREEN_NAMES.updateRealEstateFinancialHoldingScreen,
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
      <AssetsShareRevokeModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          artifactDetails={artifactDetails}
        />
      <View style={styles.footer}>
        <BlueButton
          outline
          Icon={FontAwesome5}
          iconName="plus"
          title="Add Property"
          onPress={pressHandler}
        />
      </View>
    </View>
  );
};

export default RealEstateScreen;
