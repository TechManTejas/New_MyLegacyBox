import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { financialHoldingBodyValidator } from "../../utils/formValidators";
import CustomInputGroup from "../Form/CustomInputGroup";
import { useTheme } from "../../theme/ThemeProvider";
import BlueButton from "../Button/BlueButton";
import { cleanObject } from "../../utils/objectManipulation";
import { useNavigation } from "@react-navigation/native";
import CustomDropDownInput from "../Common/CustomDropDownInput";
import { financialHoldingTypeForDropDown } from "../../utils/financialHolding";
import CustomKeyboardAvoidingScrollView from "../Common/CustomKeyboardAvoidingScrollView";

const HoldingForm = ({
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

    const cleanedValues = cleanObject({ ...values });

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
      validationSchema={toFormikValidationSchema(financialHoldingBodyValidator)}
      initialValues={{
        holdingType: initialValues?.holdingType || "",
        holdingNumber: initialValues?.holdingNumber || "",
        amount: initialValues?.amount || undefined,
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleChange, handleBlur, setFieldValue, validateForm, values }) => {
        return (
          <CustomKeyboardAvoidingScrollView>
            <View style={styles.container}>
              <CustomDropDownInput
                title="Account Type"
                placeholder="Select type of account"
                data={financialHoldingTypeForDropDown}
                onChange={handleChange("holdingType")}
                value={values.holdingType}
                messages={
                  customErrors.holdingType
                    ? [
                        {
                          id: "holdingType",
                          text: customErrors.holdingType,
                        },
                      ]
                    : undefined
                }
                showSelectedIcon
              />
              <CustomInputGroup
                name="holdingNumber"
                placeholder="Enter your Account / Holding Number"
                title="Account Number"
                onChange={handleChange("holdingNumber")}
                onBlur={handleBlur("holdingNumber")}
                value={values.holdingNumber}
                messages={
                  customErrors.holdingNumber
                    ? [
                        {
                          id: "holdingNumber",
                          text: customErrors.holdingNumber,
                        },
                      ]
                    : undefined
                }
              />
              <CustomInputGroup
                name="amount"
                placeholder="Enter the Balance"
                title="Balance (in Rs)"
                onChange={(value) => {
                  setFieldValue("amount", +value);
                }}
                onBlur={handleBlur("holdingNumber")}
                value={values.amount}
                messages={
                  customErrors.amount
                    ? [
                        {
                          id: "amount",
                          text: customErrors.amount,
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

export default HoldingForm;
