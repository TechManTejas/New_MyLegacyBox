import { ScrollView, View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import WillInfoCard from "../../components/Common/WillInfoCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addSecondaryDistData,
  getBeneficiariesSelector,
  getSecondaryDistData,
} from "../../redux/form/willFormSlice";
import WillSecondaryCard from "../../components/Will/WillSecondaryCard";
import WillFormContainer from "../../components/Will/WillFormContainer";
import CustomInputGroup from "../../components/Form/CustomInputGroup";
import { useTheme } from "../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";

const WillSecondaryDistributionScreen = () => {
  const {
    theme: { spacing, fontFamily, fontSize, colors },
  } = useTheme();

  const navigation = useNavigation();

  const styles = StyleSheet.create({
    distributionContainer: {
      marginTop: spacing.lg,
    },
    individualCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    left: { width: "70%" },
    right: { width: "30%" },
    errorText: {
      textAlign: "center",
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.red400,
    },
  });

  const beneficiaries = useSelector((state) => getBeneficiariesSelector(state));
  const secondaryDistData = useSelector((state) => getSecondaryDistData(state));

  const [state, setState] = useState(
    beneficiaries.map((item, index) => {
      const individualData = secondaryDistData?.find(
        (item) => item?.id === index
      );

      return {
        id: index,
        beneficiary: item,
        distType:
          individualData?.distType === 2
            ? 2
            : individualData?.distType === 1
            ? 1
            : 0,

        distribution: beneficiaries
          .filter((item2) => item2._id !== item._id)
          .map((item2, index2) => {
            const individualDist = individualData?.distribution?.find(
              (obj) => obj.id === index2
            );

            return {
              id: index2,
              beneficiaries: item2,
              percent: individualDist ? individualDist.percent : "",
            };
          }),
      };
    })
  );

  const [isError, setIsError] = useState(false);

  const changeToType2 = (index: number) => {
    setState(
      state.map((item) => {
        if (item.id === index && item.distType === 0) {
          return { ...item, distType: 2 };
        } else if (item.id === index && item.distType === 1) {
          return { ...item, distType: 2 };
        } else if (item.id === index && item.distType === 2) {
          return { ...item, distType: 0 };
        }
        return item;
      })
    );
  };

  const changeToType1 = (index: number) => {
    setState(
      state.map((item) => {
        if (item.id === index && item.distType === 0) {
          return { ...item, distType: 1 };
        } else if (item.id === index && item.distType === 2) {
          return { ...item, distType: 1 };
        } else if (item.id === index && item.distType === 1) {
          return { ...item, distType: 0 };
        }
        return item;
      })
    );
  };

  const onChangeText = (val: string, index: number, nestedIndex: number) => {
    if (/^\d+$/.test(val) || val === "") {
      setState((prev) => {
        const prevState = [...prev];
        const findToUpdate = prevState.find((obj) => obj.id === index);
        const findToUpdate2 = findToUpdate["distribution"].find(
          (inputElem) => inputElem.id === nestedIndex
        );
        findToUpdate2["percent"] = `${val}`;
        return prevState;
      });
    }
  };

  const dispatch = useDispatch();

  const validateAndSaveData = () => {

    let total = 0;
    let hasType2 = false;

    state.forEach((elem) => {
      if (elem.distType === 2) {
        hasType2 = true;
        total += elem.distribution.reduce((acc, curr) => {
          return acc + Number(curr.percent);
        }, 0);
      }
    });

    if ((total % 100 === 0 && total !== 0 && hasType2) || !hasType2) {
      dispatch(addSecondaryDistData(state));
      navigation.goBack();
    } else {
      setIsError(true);
    }
  };

  return (
    <WillFormContainer Handler={validateAndSaveData}>
      <ScrollView style={{ flex: 1, backgroundColor: "white", marginBottom: 30 }}>
        <WillInfoCard content="A secondary beneficiary clause in a will, often referred to as a 'contingent beneficiary' clause, specifies what should happen to a bequest or property if the primary beneficiary is unable to inherit or predeceases the testator." />

        {state.map((item, index) => {
          return (
            <WillSecondaryCard
              isError={isError}
              changeToType2={() => changeToType2(index)}
              changeToType1={() => changeToType1(index)}
              distType={item.distType}
              beneficiaryName={item.beneficiary.fullName}
              key={index}
              distData={item.distribution}
              distributionCard={
                <View style={styles.distributionContainer}>
                  {item.distribution.map((beneficiary, nestedIndex) => {
                    const dist = state.filter((item) => item?.id === index)[0][
                      "distribution"
                    ];
                    return (
                      <View key={nestedIndex} style={styles.individualCard}>
                        <Text style={styles.left}>
                          {beneficiary?.beneficiaries?.fullName}
                        </Text>
                        <View style={styles.right}>
                          <CustomInputGroup
                            placeholder="Enter %"
                            marginBottom={spacing.xs}
                            onChangeText={(val) =>
                              onChangeText(val, index, nestedIndex)
                            }
                            value={
                              dist.filter(
                                (item2) => item2?.id === nestedIndex
                              )[0]["percent"]
                            }
                          />
                        </View>
                      </View>
                    );
                  })}
                </View>
              }
            />
          );
        })}
      </ScrollView>
    </WillFormContainer>
  );
};

export default WillSecondaryDistributionScreen;
