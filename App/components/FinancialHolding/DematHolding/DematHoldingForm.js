import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import CustomInputGroup from "../../Form/CustomInputGroup";
import {
  cleanObjectAndTrim,
  objectToDropDownLabelAndValues,
} from "../../../utils/manipulators";
import { useTheme } from "../../../theme/ThemeProvider";
import BlueButton from "../../Common/Button/BlueButton";
import { useNavigation } from "@react-navigation/native";
import CustomDropDownInput from "../../Common/CustomDropDownInput";
import CustomKeyboardAvoidingScrollView from "../../Common/CustomKeyboardAvoidingScrollView";
import { dematHoldingValidator } from "../../../utils/form/validators/dematHoldingValidator";
import { DEMAT_TYPE_MAP_TO_TITLE_MAP } from "../../../constants/financialHoldings/dematHolding";

const DematHoldingForm = ({
  ctaCaption,
  defaultBody,
  apiCallback,
  isLoading,
  initialValues,
  // parentId in default for add
}) => {
  const [customErrors, setCustomErrors] = useState({});
  const [globalErrorMessage, setGlobalErrorMessage] = useState("");
  const navigation = useNavigation();

  const {
    theme: { colors, spacing, fontSize, fontFamily },
  } = useTheme();

  const customErrorWithValidation = useCallback(({ values, errors }) => {
    let customErrors;
    let isValid;

    customErrors = { ...errors };
    isValid = !Boolean(Object.keys(customErrors).length);

    setCustomErrors(customErrors);

    if (Object.keys(customErrors).length) {
      setGlobalErrorMessage("Invalid / Missing entries found");
    }

    return isValid;
  }, []);

  const onSubmit = useCallback(async ({ values, validateForm }) => {
    let validationErrors;

    setGlobalErrorMessage("");

    try {
      validationErrors = await validateForm(values);
    } catch (error) {
      setGlobalErrorMessage(error.message);
    }

    const isValid = customErrorWithValidation({
      values,
      errors: validationErrors,
    });

    if (!isValid || isLoading) return;

    const cleanedValues = cleanObjectAndTrim({ ...values });

    try {
      await apiCallback({
        ...cleanedValues,
        ...defaultBody,
      }).unwrap();
      navigation.goBack();
    } catch (error) {
      setGlobalErrorMessage(error?.data?.error?.message || error.message);
    }
  }, []);
  const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
    },
    container: {
      flexGrow: 1,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      backgroundColor: colors.white100,
    },
    row: {
      flexDirection: "row",
      alignItems: "baseline",
    },
    fullWidth: {
      flexGrow: 1,
    },
    leftPadded: {
      paddingLeft: spacing.sm,
    },
    buttonContainer: {
      marginTop: "auto",
    },
    sectionTitleContainer: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black200,
      marginBottom: spacing.md,
    },
    sectionTitle: {
      fontFamily: fontFamily.semiBold,
      lineHeight: fontSize.xl,
      paddingBottom: spacing.xs,
      color: colors.black500,
    },
    sectionSubTitle: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.sm,
      lineHeight: fontSize.md,
      color: colors.black300,
    },
    errorMessage: {
      marginTop: spacing.sm,
      marginHorizontal: spacing.xxs,
      fontSize: fontSize.sm,
      fontFamily: fontFamily.regular,
      color: colors.red,
      textAlign: "center",
    },
  });

  return (
    <Formik
      validationSchema={toFormikValidationSchema(dematHoldingValidator)}
      initialValues={{
        broker: initialValues?.broker || "",
        customerId: initialValues?.customerId || "",
        dematType: initialValues?.dematType || "",
        poc: initialValues?.poc || "",
        pocNumber: initialValues?.pocNumber || "",
        investedAmount: initialValues?.investedAmount || undefined,
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleChange, handleBlur, setFieldValue, validateForm, values }) => {
        return (
          <CustomKeyboardAvoidingScrollView>
            <View style={styles.container}>
              <CustomInputGroup
                name="broker"
                placeholder="Enter your Broker name"
                title="Broker"
                onChange={handleChange("broker")}
                onBlur={handleBlur("broker")}
                value={values.broker}
                messages={
                  customErrors.broker
                    ? [
                        {
                          id: "broker",
                          text: customErrors.broker,
                        },
                      ]
                    : undefined
                }
              />

              <CustomDropDownInput
                title="Type"
                placeholder="Select demat type"
                data={objectToDropDownLabelAndValues(
                  DEMAT_TYPE_MAP_TO_TITLE_MAP
                )}
                onChange={handleChange("dematType")}
                value={values.dematType}
                messages={
                  customErrors.dematType
                    ? [
                        {
                          id: "dematType",
                          text: customErrors.dematType,
                        },
                      ]
                    : undefined
                }
                showSelectedIcon
              />

              <CustomInputGroup
                name="customerId"
                placeholder="Enter your Customer ID"
                title="Customer ID"
                onChange={handleChange("customerId")}
                onBlur={handleBlur("customerId")}
                value={values.customerId}
                messages={
                  customErrors.customerId
                    ? [
                        {
                          id: "customerId",
                          text: customErrors.customerId,
                        },
                      ]
                    : undefined
                }
              />

              <CustomInputGroup
                name="poc"
                placeholder="Enter Point of contact name"
                title="Point of contact"
                onChange={handleChange("poc")}
                onBlur={handleBlur("poc")}
                value={values.poc}
                messages={
                  customErrors.poc
                    ? [
                        {
                          id: "poc",
                          text: customErrors.poc,
                        },
                      ]
                    : undefined
                }
                optional
                textTransformNormal
              />

              <CustomInputGroup
                name="pocNumber"
                placeholder="Phone number of point of contact"
                title="Point of contact's number"
                onChange={handleChange("pocNumber")}
                onBlur={handleBlur("pocNumber")}
                value={values.pocNumber}
                messages={
                  customErrors.pocNumber
                    ? [
                        {
                          id: "pocNumber",
                          text: customErrors.pocNumber,
                        },
                      ]
                    : undefined
                }
                optional
                textTransformNormal
              />

              <CustomInputGroup
                name="investedAmount"
                placeholder="Enter the Invested Amount"
                title="Invested Amount (in Rs)"
                onChange={(value) => {
                  setFieldValue("investedAmount", +value);
                }}
                onBlur={handleBlur("investedAmount")}
                value={values.investedAmount}
                messages={
                  customErrors.investedAmount
                    ? [
                        {
                          id: "investedAmount",
                          text: customErrors.investedAmount,
                        },
                      ]
                    : undefined
                }
                optional
                textTransformNormal
              />

              <View style={styles.buttonContainer}>
                <BlueButton
                  disabled={isLoading}
                  title={ctaCaption}
                  onPress={() => onSubmit({ values, validateForm })}
                  isLoading={isLoading}
                />
              </View>
              {globalErrorMessage ? (
                <Text style={styles.errorMessage}>{globalErrorMessage}</Text>
              ) : null}
            </View>
          </CustomKeyboardAvoidingScrollView>
        );
      }}
    </Formik>
  );
};

export default DematHoldingForm;
