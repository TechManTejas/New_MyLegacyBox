import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import CustomInputGroup from "../../Form/CustomInputGroup";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  cleanObjectAndTrim,
  objectToDropDownLabelAndValues,
} from "../../../utils/manipulators";
import { useTheme } from "../../../theme/ThemeProvider";
import BlueButton from "../../Common/Button/BlueButton";
import { useNavigation } from "@react-navigation/native";
import CustomDropDownInput from "../../Common/CustomDropDownInput";
import CustomKeyboardAvoidingScrollView from "../../Common/CustomKeyboardAvoidingScrollView";

import {
  POLICY_BENEFICIERY_TO_TITLE_MAP,
  POLICY_PREMIUM_FREQUENCY_TO_TITLE_MAP,
  POLICY_TYPE_TO_TITLE_MAP,
} from "../../../constants/financialHoldings/insuranceHolding";
import { insuranceHoldingValidator } from "../../../utils/form/validators/insuranceHoldingValidator";

const InsuranceHoldingForm = ({
  ctaCaption,
  defaultBody,
  apiCallback,
  isLoading,
  initialValues,
}) => {
  const [customErrors, setCustomErrors] = useState({});
  const [globalErrorMessage, setGlobalErrorMessage] = useState("");
  const navigation = useNavigation();
  const [datePickerOptions, setDatePickerOptions] = useState({
    show: false,
    property: "",
  });

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
      validationSchema={toFormikValidationSchema(insuranceHoldingValidator)}
      initialValues={{
        policyName: initialValues?.policyName || "",
        policyNumber: initialValues?.policyNumber || "",
        policyType: initialValues?.policyType || "",
        beneficiary: initialValues?.beneficiary || "",
        homeBranch: initialValues?.homeBranch || "",
        premiumFrequency: initialValues?.premiumFrequency || "",
        policyAmount: initialValues?.policyAmount || undefined,
        premiumAmount: initialValues?.premiumAmount || undefined,
        nominee: initialValues?.nominee || undefined,
        dateOfPremium: initialValues?.dateOfPremium
          ? new Date(initialValues?.dateOfPremium)
          : undefined,
        dateOfMaturity: initialValues?.dateOfMaturity
          ? new Date(initialValues?.dateOfMaturity)
          : undefined,
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleChange, handleBlur, setFieldValue, validateForm, values }) => {
        return (
          <CustomKeyboardAvoidingScrollView>
            <View style={styles.container}>
              {datePickerOptions.show && (
                <DateTimePicker
                  value={
                    values[datePickerOptions.property]
                      ? values[datePickerOptions.property]
                      : new Date()
                  }
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setDatePickerOptions({
                      show: false,
                      property: datePickerOptions.property,
                    });
                    if (event.type === "set") {
                      setFieldValue(datePickerOptions.property, selectedDate);
                      return;
                    }
                  }}
                />
              )}

              <CustomInputGroup
                name="policyName"
                placeholder="Enter your Policy Name"
                title="Policy Name"
                onChange={handleChange("policyName")}
                onBlur={handleBlur("policyName")}
                value={values.policyName}
                messages={
                  customErrors.policyName
                    ? [{ id: "policyName", text: customErrors.policyName }]
                    : undefined
                }
                optional
              />

              <CustomInputGroup
                name="homeBranch"
                placeholder="Enter your Home branch"
                title="Home Branch"
                onChange={handleChange("homeBranch")}
                onBlur={handleBlur("homeBranch")}
                value={values.homeBranch}
                messages={
                  customErrors.homeBranch
                    ? [{ id: "homeBranch", text: customErrors.homeBranch }]
                    : undefined
                }
                optional
              />

              <CustomInputGroup
                name="policyNumber"
                placeholder="Enter your Policy Number"
                title="Policy Number"
                onChange={handleChange("policyNumber")}
                onBlur={handleBlur("policyNumber")}
                value={values.policyNumber}
                messages={
                  customErrors.policyNumber
                    ? [{ id: "policyNumber", text: customErrors.policyNumber }]
                    : undefined
                }
              />
              <CustomDropDownInput
                title="Policy Type"
                placeholder="Select type of policy"
                data={objectToDropDownLabelAndValues(POLICY_TYPE_TO_TITLE_MAP)}
                onChange={handleChange("policyType")}
                value={values.policyType}
                messages={
                  customErrors.policyType
                    ? [
                        {
                          id: "policyType",
                          text: customErrors.policyType,
                        },
                      ]
                    : undefined
                }
                showSelectedIcon
              />
              <CustomDropDownInput
                title="Beneficiary"
                placeholder="Select beneficiary"
                data={objectToDropDownLabelAndValues(
                  POLICY_BENEFICIERY_TO_TITLE_MAP
                )}
                onChange={handleChange("beneficiary")}
                value={values.beneficiary}
                messages={
                  customErrors.beneficiary
                    ? [
                        {
                          id: "beneficiary",
                          text: customErrors.beneficiary,
                        },
                      ]
                    : undefined
                }
                showSelectedIcon
              />

              <CustomDropDownInput
                title="Premium Frequency"
                placeholder="Select Premium frequency"
                data={objectToDropDownLabelAndValues(
                  POLICY_PREMIUM_FREQUENCY_TO_TITLE_MAP
                )}
                onChange={handleChange("premiumFrequency")}
                value={values.premiumFrequency}
                messages={
                  customErrors.premiumFrequency
                    ? [
                        {
                          id: "premiumFrequency",
                          text: customErrors.premiumFrequency,
                        },
                      ]
                    : undefined
                }
                showSelectedIcon
              />

              <View style={styles.row}>
                <View style={styles.fullWidth}>
                  <CustomInputGroup
                    name="dateOfPremium"
                    placeholder="Enter the Date of Premium"
                    title="Date of premium"
                    pointerEvents="none"
                    onFocus={() => {
                      Keyboard.dismiss();
                      setDatePickerOptions({
                        show: true,
                        property: "dateOfPremium",
                      });
                    }}
                    onBlur={handleBlur("dateOfPremium")}
                    value={
                      values.dateOfPremium
                        ? new Date(values.dateOfPremium).toLocaleDateString(
                            "en-us",
                            {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                            }
                          )
                        : ""
                    }
                    messages={
                      customErrors.dateOfPremium
                        ? [
                            {
                              id: "dateOfPremium",
                              text: customErrors.dateOfPremium,
                            },
                          ]
                        : undefined
                    }
                    textTransformNormal
                  />
                </View>
                <View style={[styles.fullWidth, styles.leftPadded]}>
                  <CustomInputGroup
                    name="dateOfMaturity"
                    placeholder="Enter the Date of Maturity"
                    title="Date of maturity"
                    onFocus={() => {
                      Keyboard.dismiss();
                      setDatePickerOptions({
                        show: true,
                        property: "dateOfMaturity",
                      });
                    }}
                    onBlur={handleBlur("dateOfMaturity")}
                    value={
                      values.dateOfMaturity
                        ? new Date(values.dateOfMaturity).toLocaleDateString(
                            "en-us",
                            {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                            }
                          )
                        : ""
                    }
                    messages={
                      customErrors.dateOfMaturity
                        ? [
                            {
                              id: "dateOfMaturity",
                              text: customErrors.dateOfMaturity,
                            },
                          ]
                        : undefined
                    }
                    textTransformNormal
                  />
                </View>
              </View>

              <CustomInputGroup
                name="nominee"
                placeholder="Enter Nominee"
                title="Nominee"
                optional
                onChange={handleChange("nominee")}
                onBlur={handleBlur("nominee")}
                value={values.nominee}
                messages={
                  customErrors.nominee
                    ? [
                        {
                          id: "nominee",
                          text: customErrors.nominee,
                        },
                      ]
                    : undefined
                }
              />

              <CustomInputGroup
                name="policyAmount"
                placeholder="Enter the Policy Amount"
                title="Policy Amount (in Rs)"
                onChange={(value) => {
                  if (value == " " || value == "")
                    setFieldValue("policyAmount", "");
                  else if (!isNaN(value)) setFieldValue("policyAmount", +value);
                }}
                onBlur={handleBlur("policyAmount")}
                value={values.policyAmount}
                messages={
                  customErrors.policyAmount
                    ? [
                        {
                          id: "policyAmount",
                          text: customErrors.policyAmount,
                        },
                      ]
                    : undefined
                }
                optional
                textTransformNormal
              />

              <CustomInputGroup
                name="premiumAmount"
                placeholder="Enter the Premium Amount"
                title="Premium Amount (in Rs)"
                onChange={(value) => {
                  if (value == " " || value == "")
                    setFieldValue("premiumAmount", "");
                  else if (!isNaN(value))
                    setFieldValue("premiumAmount", +value);
                }}
                onBlur={handleBlur("premiumAmount")}
                value={values.premiumAmount}
                messages={
                  customErrors.premiumAmount
                    ? [
                        {
                          id: "premiumAmount",
                          text: customErrors.premiumAmount,
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

export default InsuranceHoldingForm;
