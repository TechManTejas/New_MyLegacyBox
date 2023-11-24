import { View, StyleSheet, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import CustomKeyboardAvoidingScrollView from "../../components/Common/CustomKeyboardAvoidingScrollView";
import CustomInputGroup from "../../components/Form/CustomInputGroup";
import BlueButton from "../../components/Common/Button/BlueButton";
import { useNavigation } from "@react-navigation/native";
import WillInfoCard from "../../components/Common/WillInfoCard";
import {
  addResidualDistData,
  getBeneficiariesSelector,
  getResidualDistData,
} from "../../redux/form/willFormSlice";
import { useSelector, useDispatch } from "react-redux";
import WillFormContainer from "../../components/Will/WillFormContainer";

const WillResidualDistributionScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {
    theme: { colors, spacing, fontSize, fontFamily },
  } = useTheme();

  const styles = StyleSheet.create({
    formikContainer: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      backgroundColor: colors.white100,
    },
    container: {
      flex: 1,
      backgroundColor: colors.white100,
    },
    formContainer: {
      flexGrow: 1,
      marginBottom: spacing.xxxl,
    },
    footer: {
      position: "absolute",
      bottom: 0,
      backgroundColor: colors.white100,
      flexDirection: "column",
      paddingVertical: spacing.md,
      paddingBottom: spacing.lg,
      paddingHorizontal: spacing.lg,
      width: "100%",
    },
    errorText: {
      textAlign: "center",
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.red400,
    },

    left: { width: "70%",},
    right: { width: "30%",},
    individualCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.sm,
    },
  });

  const beneficiaries = useSelector((state) => getBeneficiariesSelector(state));
  const residualDistData = useSelector((state) => getResidualDistData(state));

  const [state, setState] = useState(
    beneficiaries.map((item, index) => {
      const existingData = residualDistData.find((data) => data.id === index);
      return {
        id: index,
        beneficiary: item,
        percent: existingData ? existingData.percent : "0",
      };
    })
  );

  const [isError, setIsError] = useState(false);

  const updateValues = (val: string, id: number) => {
    if (/^\d+$/.test(val) || val === "") {
      setState((prev) => {
        const prevState = [...prev];
        const findToUpdate = prevState.find((obj) => obj.id === id);
        findToUpdate["percent"] = `${Number(val)}`;
        return prevState;
      });
    }
  };

  const validateAndSave = () => {
    const totalPercentage = state.reduce(
      (acc, curr) => acc + Number(curr?.percent ?? 0),
      0
    );

    if (totalPercentage === 100 || totalPercentage === 99.99) {
      dispatch(addResidualDistData(state));
      navigation.goBack();
    } else {
      setIsError(true);
    }
  };

  return (
    <WillFormContainer
      Handler={validateAndSave}
      nextDisabled={state.some((obj) => obj.percent === "")}
    >
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <WillInfoCard content="It is essential to specify 'Residuary clause' in a Will, which refers to any other property not specifically included in a Will or which is not in existence at the time of execution of a Will. Residuary clause clarifies the mannerism in which any such assets are to be bequeathed. " />

          {isError && (
            <View>
              <Text style={styles.errorText}>
                Sum of all the distribution should be 100 or 99.99
              </Text>
            </View>
          )}

          <View style={styles.formikContainer}>
            {beneficiaries.map((item, index) => {
              return (
                <View style={styles.individualCard} key={index}>
                  <Text style={styles.left}>{item.fullName}</Text>
                  <View style={styles.right}>
                    <CustomInputGroup
                    marginBottom={spacing.xs}
                      placeholder="Enter %"
                      // title={`${item.fullName}'s Distribution`}
                      value={
                        state.filter((item) => item.id === index)[0]["percent"]
                      }
                      onChangeText={(val) => updateValues(val, index)}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </WillFormContainer>
  );
};

export default WillResidualDistributionScreen;
