import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { getBeneficiariesSelector } from "../../services/willForm/willFormSlice";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useTheme } from "../../theme/ThemeProvider";
import { SCREEN_NAMES } from "../../constants/screenNames";
import WillFormContainer from "../../components/Will/WillFormContainer";
import WillInfoCard from "../../components/Will/WillInfoCard";

const WillBeneficiariesScreen = () => {
  const navigation = useNavigation();

  const beneficiaries = useSelector((state) => getBeneficiariesSelector(state));

  const {
    theme: { spacing, colors },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white100,
    },
    content: {
      flex: 1,
      padding: spacing.lg,
    },
    listContentContainer: {
      flexGrow: 1,
    },
  });

  const prevHandler = () => navigation.goBack();

  const nextHandler = () => {
    navigation.navigate(SCREEN_NAMES.willAssetsScreen);
  };

  const getPressHandler = (initialValues, index) => () =>
    navigation.navigate(SCREEN_NAMES.willBeneficiaryInfoScreen, {
      initialValues,
      index,
    });

  return (
    <View style={styles.container}>
      <WillFormContainer
        prevHandler={prevHandler}
        nextHandler={nextHandler}
        nextDisabled={beneficiaries.length < 1}
      >
        <View style={styles.content}>
          <WillInfoCard
            titleFallbackMessage="Click to add beneficiaries"
            subTitleFallbackMessage="Adding at least one beneficiary is mandatory"
            pressHandler={getPressHandler({}, undefined)}
            hideRightIcon
          />
          <FlatList
            contentContainerStyle={styles.listContentContainer}
            data={beneficiaries}
            renderItem={({ item, index }) => {
              return (
                <WillInfoCard
                  title={item.name}
                  subTitle={item.relationshipWithTestator}
                  pressHandler={getPressHandler(item, index)}
                />
              );
            }}
            keyExtractor={(item, index) => `${item.name}-${index}-beneficiary`}
          />
        </View>
      </WillFormContainer>
    </View>
  );
};

export default WillBeneficiariesScreen;
