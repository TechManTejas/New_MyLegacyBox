import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { useGetFinancialHoldingForBankQuery } from "../services/financialHolding/financialHoldingSlice";
import CustomActivityIndicator from "../components/Common/CustomActivityIndicator";
import BankDetail from "../components/Bank/BankDetail";
import BlueButton from "../components/Button/BlueButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Empty from "../components/Common/Empty";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../constants/screenNames";
import { useSelector } from "react-redux";
import { selectBankById } from "../services/bank/bankSlice";
import BankFinancialHoldingItem from "../components/FinancialHolding/BankHolding/BankFinancialHoldingItem";

const BankScreen = ({ route }) => {
  const navigation = useNavigation();
  const { _id } = route.params;
  const bank = useSelector((state) => selectBankById(state, _id));

  const { data, isLoading, isFetching, isError, error } =
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
      paddingHorizontal: spacing.lg,
    },
  });

  if (isLoading || isFetching) return <CustomActivityIndicator />;

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          ListHeaderComponent={<BankDetail bank={bank} />}
          ListHeaderComponentStyle={styles.listHeader}
          contentContainerStyle={styles.listContentContainer}
          data={data.ids.map((id) => data.entities[id])}
          renderItem={({ item }) => (
            <BankFinancialHoldingItem financialHolding={item} />
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
    </View>
  );
};

export default BankScreen;
