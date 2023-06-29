import { View, StyleSheet, FlatList } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { useGetFinancialHoldingForCashQuery } from "../services/financialHolding/financialHoldingSlice";
import CustomActivityIndicator from "../components/Common/CustomActivityIndicator";
import BlueButton from "../components/Common/Button/BlueButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Empty from "../components/Common/Empty";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../constants/screenNames";
import FinancialInstitutionHoldingItem from "../components/Common/FinancialInstitutionHoldingCard";
import { CASH_TYPE_TO_TITLE_MAP } from "../constants/financialHoldings/cashHolding";
import { numberWithCommas } from "../utils/manipulators";

const CashScreen = () => {
  
  const navigation = useNavigation();

  const { data, isLoading, isFetching } = useGetFinancialHoldingForCashQuery();

  const { theme: { spacing, colors } } = useTheme();

  const pressHandler = () => {
    navigation.navigate(SCREEN_NAMES.addCashFinancialHoldingScreen);
  };

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
          renderItem={({ item }) =>
            <FinancialInstitutionHoldingItem
              holdingClass={item.holdingClass}
              updatedAt={item.updatedAt}
              title={item.holding.nameOfParty}
              tagLabel={CASH_TYPE_TO_TITLE_MAP[item.holding.cashType]}
              content={[
                { key: "Phone Number", value: item.holding.phoneNumberOfParty },
                { key: "Date of Transaction", value: new Date(item.holding.dateOfTransaction).toDateString().replace(/^\w+ /, '') },
                { key: "Amount", value: item.holding.amount ? `Rs. ${ numberWithCommas(item.holding.amount)}` : "Not Available" },
                { key: "Address", value: item.holding.address ? 
                  `${item.holding.address.street},\n ${item.holding.address.city}, ${item.holding.address.state}, ${item.holding.address.pinCode}` : "Not Available"
                },
              ]}
              onPress={() => {
                navigation.navigate(SCREEN_NAMES.updateCashFinancialHoldingScreen, { 
                  _id: item._id, 
                  financialHolding: item 
                })
              }}
            />
          }
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
    </View>
  );
};

export default CashScreen;
