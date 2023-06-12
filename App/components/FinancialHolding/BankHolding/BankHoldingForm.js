import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import CustomInputGroup from "../../Form/CustomInputGroup";
import {
  cleanObjectAndTrim,
  objectToDropDownLabelAndValues,
} from "../../../utils/manipulators";
import { bankHoldingValidator } from "../../../utils/form/validators/bankHoldingValidator";
import { useTheme } from "../../../theme/ThemeProvider";
import BlueButton from "../../Common/Button/BlueButton";
import { useNavigation } from "@react-navigation/native";
import CustomDropDownInput from "../../Common/CustomDropDownInput";
import CustomKeyboardAvoidingScrollView from "../../Common/CustomKeyboardAvoidingScrollView";
import {
  BANK_ACCOUNT_TYPES_TO_TITLE_MAP,
  BANK_ACCOUNT_OWNERSHIP_TO_TITLE_MAP,
  BANK_ACCOUNT_TYPES_MAP,
} from "../../../constants/financialHoldings/bankHolding";

const BankHoldingForm = ({
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
      validationSchema={toFormikValidationSchema(bankHoldingValidator)}
      initialValues={{
        accountType: initialValues?.accountType || "",
        accountNumber: initialValues?.accountNumber || "",
        ownership: initialValues?.ownership || "",
        amount: initialValues?.amount || undefined,
        pranNumber: initialValues?.pranNumber || "",
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
                data={objectToDropDownLabelAndValues(
                  BANK_ACCOUNT_TYPES_TO_TITLE_MAP
                )}
                onChange={(value) => {
                  setFieldValue("accountType", value);

                  if (value !== BANK_ACCOUNT_TYPES_MAP.npsAccount) {
                    setFieldValue("pranNumber", "");
                  }
                }}
                value={values.accountType}
                messages={
                  customErrors.accountType
                    ? [
                        {
                          id: "accountType",
                          text: customErrors.accountType,
                        },
                      ]
                    : undefined
                }
                showSelectedIcon
              />
              {values.accountType === BANK_ACCOUNT_TYPES_MAP.npsAccount ? (
                <CustomInputGroup
                  name="pranNumber"
                  placeholder="Enter your PRAN Number"
                  title="PRAN Number"
                  onChange={handleChange("pranNumber")}
                  onBlur={handleBlur("pranNumber")}
                  value={values.pranNumber}
                  messages={
                    customErrors.pranNumber
                      ? [
                          {
                            id: "pranNumber",
                            text: customErrors.pranNumber,
                          },
                        ]
                      : undefined
                  }
                />
              ) : null}
              <CustomDropDownInput
                title="Ownership"
                placeholder="Select type of ownership"
                data={objectToDropDownLabelAndValues(
                  BANK_ACCOUNT_OWNERSHIP_TO_TITLE_MAP
                )}
                onChange={handleChange("ownership")}
                value={values.ownership}
                messages={
                  customErrors.ownership
                    ? [
                        {
                          id: "ownership",
                          text: customErrors.ownership,
                        },
                      ]
                    : undefined
                }
                showSelectedIcon
              />
              <CustomInputGroup
                name="accountNumber"
                placeholder="Enter your Account Number"
                title="Account Number"
                onChange={handleChange("accountNumber")}
                onBlur={handleBlur("accountNumber")}
                value={values.accountNumber}
                messages={
                  customErrors.accountNumber
                    ? [
                        {
                          id: "accountNumber",
                          text: customErrors.accountNumber,
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
                  if (value==" " || value=="") setFieldValue("amount")
                  else if (!isNaN(value)) setFieldValue("amount", + value)
                }}
                onBlur={handleBlur("amount")}
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

export default BankHoldingForm;
