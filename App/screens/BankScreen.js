import { View, StyleSheet, FlatList } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { useGetFinancialHoldingForBankQuery } from "../services/financialHolding/financialHoldingSlice";
import CustomActivityIndicator from "../components/Common/CustomActivityIndicator";
import BankDetail from "../components/Bank/BankDetail";
import BlueButton from "../components/Common/Button/BlueButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Empty from "../components/Common/Empty";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../constants/screenNames";
import { useSelector } from "react-redux";
import { selectBankById } from "../services/bank/bankSlice";
import BankFinancialHoldingItem from "../components/FinancialHolding/BankHolding/BankFinancialHoldingItem";
import FinancialInstitutionInfoCard from "../components/Common/FinancialInstitutionInfoCard";
import FinancialInstitutionHoldingItem from "../components/Common/FinancialInstitutionHoldingCard";
import {
  BANK_ACCOUNT_OWNERSHIP_TO_TITLE_MAP,
  BANK_ACCOUNT_TYPES_TO_TITLE_MAP,
} from "../constants/financialHoldings/bankHolding";
import { numberWithCommas } from "../utils/manipulators";

const BankScreen = ({ route }) => {

  const navigation = useNavigation();
  const { _id } = route.params;

  const bank = useSelector((state) => selectBankById(state, _id));

  const { data, isLoading, isFetching } = useGetFinancialHoldingForBankQuery(_id);

  const { theme: { spacing, colors } } = useTheme();

  const pressHandler = () => {
    navigation.navigate(SCREEN_NAMES.addBankFinancialHoldingScreen, {
      parentId: bank._id,
      parentName: `${bank.name}, ${bank.branchName}`,
    });
  };

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

  if (isLoading || isFetching) return <CustomActivityIndicator />

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
          // ListHeaderComponent={<BankDetail bank={bank} />}
          ListHeaderComponentStyle={styles.listHeader}
          contentContainerStyle={styles.listContentContainer}
          data={data.ids.map((id) => data.entities[id])}
          // renderItem={({ item }) => (
          //   <BankFinancialHoldingItem financialHolding={item} />
          // )}
          renderItem={({ item }) => 
            <FinancialInstitutionHoldingItem  
              holdingClass={item.holdingClass}
              title={BANK_ACCOUNT_TYPES_TO_TITLE_MAP[item.holding.accountType]}
              tagLabel={BANK_ACCOUNT_OWNERSHIP_TO_TITLE_MAP[item.holding.ownership]}
              content={[
                { key: "Account Number", value: item.holding.accountNumber },
                { key: "Amount ", value: `Rs. ${numberWithCommas(item.holding.amount)}` },
              ]}
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
          title="Add Account"
          onPress={pressHandler}
        />
      </View>
    </View>
  );
};

export default BankScreen;
