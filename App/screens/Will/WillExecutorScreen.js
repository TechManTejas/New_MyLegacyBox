import { View, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { useSelector } from "react-redux";
import {
  getExecutorsSelector,
  getWitnessesSelector,
} from "../../services/willForm/willFormSlice";
import WillFormContainer from "../../components/Will/WillFormContainer";
import { useNavigation } from "@react-navigation/native";
import WillInfoCard from "../../components/Will/WillInfoCard";
import { SCREEN_NAMES } from "../../constants/screenNames";

const WillExecutorScreen = () => {
  const navigation = useNavigation();

  const executors = useSelector((state) => getExecutorsSelector(state));

  const firstInitialValues = executors[0] ? executors[0] : {};
  const secondInitialValues = executors[1] ? executors[1] : {};

  const {
    theme: { spacing, colors },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white100,
    },
    content: {
      padding: spacing.lg,
    },
  });

  const prevHandler = () => navigation.goBack();

  const nextHandler = () =>
    navigation.navigate(SCREEN_NAMES.willDeclarationScreen);

  const getPressHandler = (initialValues, index) => () =>
    navigation.navigate(SCREEN_NAMES.willExecutorInfoScreen, {
      initialValues,
      index,
    });

  return (
    <View style={styles.container}>
      <WillFormContainer prevHandler={prevHandler} nextHandler={nextHandler}>
        <View style={styles.content}>
          <WillInfoCard
            title={firstInitialValues.name}
            subTitle={firstInitialValues.relationshipWithTestator}
            titleFallbackMessage={"Add primary executor"}
            subTitleFallbackMessage={"It is optional to add an executor"}
            pressHandler={getPressHandler(firstInitialValues, 0)}
          />
          <WillInfoCard
            title={secondInitialValues.name}
            subTitle={secondInitialValues.relationshipWithTestator}
            titleFallbackMessage={"Add secondary executor"}
            subTitleFallbackMessage={"It is optional to add an executor"}
            pressHandler={getPressHandler(secondInitialValues, 1)}
          />
        </View>
      </WillFormContainer>
    </View>
  );
};

export default WillExecutorScreen;
