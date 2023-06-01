import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { useGetFinancialHoldingForInsuranceQuery } from "../services/financialHolding/financialHoldingSlice";
import CustomActivityIndicator from "../components/Common/CustomActivityIndicator";
import BlueButton from "../components/Common/Button/BlueButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Empty from "../components/Common/Empty";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../constants/screenNames";
import { useSelector } from "react-redux";
import { selectInsuranceById } from "../services/insurance/insuranceSlice";
import InsuranceDetail from "../components/Insurance/InsuranceDetail";
import InsuranceFinancialHoldingItem from "../components/FinancialHolding/InsuranceHolding/InsuranceFinancialHoldingItem";

const InsuranceScreen = ({ route }) => {
  const navigation = useNavigation();
  const { _id } = route.params;
  const insurance = useSelector((state) => selectInsuranceById(state, _id));

  const { data, isLoading, isFetching, isError, error } =
    useGetFinancialHoldingForInsuranceQuery(_id);

  const {
    theme: { spacing, colors },
  } = useTheme();

  const pressHandler = () => {
    navigation.navigate(SCREEN_NAMES.addInsuranceFinancialHoldingScreen, {
      parentId: insurance._id,
      parentName: `${insurance.companyName}`,
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

  if (isLoading || isFetching) return <CustomActivityIndicator />;

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          ListHeaderComponent={<InsuranceDetail insurance={insurance} />}
          ListHeaderComponentStyle={styles.listHeader}
          contentContainerStyle={styles.listContentContainer}
          data={data.ids.map((id) => data.entities[id])}
          renderItem={({ item }) => (
            <InsuranceFinancialHoldingItem financialHolding={item} />
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

export default InsuranceScreen;
