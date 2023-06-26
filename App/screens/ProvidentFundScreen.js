import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { useGetFinancialHoldingForProvidentFundQuery } from "../services/financialHolding/financialHoldingSlice";
import CustomActivityIndicator from "../components/Common/CustomActivityIndicator";
import BlueButton from "../components/Common/Button/BlueButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Empty from "../components/Common/Empty";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../constants/screenNames";
import ProvidentFundFinancialHoldingItem from "../components/FinancialHolding/ProvidentFundHolding/ProvidentFundFinancialHoldingItem";

const ProvidentFundScreen = () => {
  const navigation = useNavigation();

  // pass empty object as you dont have filter
  const { data, isLoading, isFetching, isError, error } =
    useGetFinancialHoldingForProvidentFundQuery();

  const {
    theme: { spacing, colors },
  } = useTheme();

  const pressHandler = () => {
    navigation.navigate(SCREEN_NAMES.addProvidentFundFinancialHoldingScreen);
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
          renderItem={({ item }) => (
            <ProvidentFundFinancialHoldingItem financialHolding={item} />
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
    </View>
  );
};

export default ProvidentFundScreen;
