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
import { privateLimitedCompanyHoldingValidator } from "../../../utils/form/validators/privateLimitedCompanyHoldingValidator";
import {
  PRIVATE_LIMITED_COMPANY_TYPE_MAP,
  PRIVATE_LIMITED_COMPANY_TYPE_MAP_TO_TITLE_MAP,
} from "../../../constants/financialHoldings/privateLimitedHolding";

const PrivateLimitedCompanyHoldingForm = ({
  ctaCaption,
  defaultBody,
  apiCallback,
  isLoading,
  initialValues,
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
      validationSchema={toFormikValidationSchema(
        privateLimitedCompanyHoldingValidator
      )}
      initialValues={{
        nameOfCompany: initialValues?.nameOfCompany || "",
        cinNumber: initialValues?.cinNumber || "",
        natureOfInvestment: initialValues?.natureOfInvestment || "",
        noOfSharesHeld: initialValues?.noOfSharesHeld || "",
        shareCertificateNumber: initialValues?.shareCertificateNumber || "",
        noOfSharesGranted: initialValues?.noOfSharesGranted || "",
        noOfSharesVested: initialValues?.noOfSharesVested || "",
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleChange, handleBlur, setFieldValue, validateForm, values }) => {
        return (
          <CustomKeyboardAvoidingScrollView>
            <View style={styles.container}>
              <CustomInputGroup
                name="nameOfCompany"
                placeholder="Enter the name of the Company"
                title="Company Name"
                onChange={handleChange("nameOfCompany")}
                onBlur={handleBlur("nameOfCompany")}
                value={values.nameOfCompany}
                messages={
                  customErrors.nameOfCompany
                    ? [
                        {
                          id: "nameOfCompany",
                          text: customErrors.nameOfCompany,
                        },
                      ]
                    : undefined
                }
              />

              <CustomInputGroup
                textTransformNormal
                name="cinNumber"
                placeholder="Enter the CIN"
                title="CIN"
                onChange={handleChange("cinNumber")}
                onBlur={handleBlur("cinNumber")}
                value={values.cinNumber}
                messages={
                  customErrors.cinNumber
                    ? [
                        {
                          id: "cinNumber",
                          text: customErrors.cinNumber,
                        },
                      ]
                    : undefined
                }
              />

              <CustomDropDownInput
                textTransformNormal
                title="Nature of Investment"
                placeholder="Select the nature of investment"
                data={objectToDropDownLabelAndValues(
                  PRIVATE_LIMITED_COMPANY_TYPE_MAP_TO_TITLE_MAP
                )}
                onChange={(value) => {
                  setFieldValue("natureOfInvestment", value);
                  setFieldValue("noOfSharesHeld", "");
                  setFieldValue("shareCertificateNumber", "");
                  setFieldValue("noOfSharesGranted", "");
                  setFieldValue("noOfSharesVested", "");
                }}
                value={values.natureOfInvestment}
                messages={
                  customErrors.natureOfInvestment
                    ? [
                        {
                          id: "natureOfInvestment",
                          text: customErrors.natureOfInvestment,
                        },
                      ]
                    : undefined
                }
                showSelectedIcon
              />

              {values.natureOfInvestment ===
                PRIVATE_LIMITED_COMPANY_TYPE_MAP.equity ||
              values.natureOfInvestment ===
                PRIVATE_LIMITED_COMPANY_TYPE_MAP.preference ? (
                <>
                  <CustomInputGroup
                    textTransformNormal
                    name="noOfSharesHeld"
                    placeholder="Enter no of shares held"
                    title="No of Shares held"
                    onChangeText={(value) => {
                      if (value == " " || value == "")
                        setFieldValue("noOfSharesHeld", "");
                      else if (!isNaN(value))
                        setFieldValue("noOfSharesHeld", +value);
                    }}
                    onBlur={handleBlur("noOfSharesHeld")}
                    value={values.noOfSharesHeld}
                    messages={
                      customErrors.noOfSharesHeld
                        ? [
                            {
                              id: "noOfSharesHeld",
                              text: customErrors.noOfSharesHeld,
                            },
                          ]
                        : undefined
                    }
                  />

                  <CustomInputGroup
                    textTransformNormal
                    name="shareCertificateNumber"
                    placeholder="Enter the Share Certificate Number"
                    title="Share Certificate Number"
                    onChange={handleChange("shareCertificateNumber")}
                    onBlur={handleBlur("shareCertificateNumber")}
                    value={values.shareCertificateNumber}
                    messages={
                      customErrors.shareCertificateNumber
                        ? [
                            {
                              id: "shareCertificateNumber",
                              text: customErrors.shareCertificateNumber,
                            },
                          ]
                        : undefined
                    }
                  />
                </>
              ) : null}

              {values.natureOfInvestment ===
              PRIVATE_LIMITED_COMPANY_TYPE_MAP.esop ? (
                <>
                  <CustomInputGroup
                    textTransformNormal
                    name="noOfSharesGranted"
                    placeholder="Enter no of shares granted"
                    title="No of Shares granted"
                    onChangeText={(value) => {
                      if (value == " " || value == "")
                        setFieldValue("noOfSharesGranted", "");
                      else if (!isNaN(value))
                        setFieldValue("noOfSharesGranted", +value);
                    }}
                    onBlur={handleBlur("noOfSharesGranted")}
                    value={values.noOfSharesGranted}
                    messages={
                      customErrors.noOfSharesGranted
                        ? [
                            {
                              id: "noOfSharesGranted",
                              text: customErrors.noOfSharesGranted,
                            },
                          ]
                        : undefined
                    }
                  />

                  <CustomInputGroup
                    textTransformNormal
                    name="noOfSharesVested"
                    placeholder="Enter no of shares vested"
                    title="No of Shares vested"
                    onChangeText={(value) => {
                      if (value == " " || value == "")
                        setFieldValue("noOfSharesVested", "");
                      else if (!isNaN(value))
                        setFieldValue("noOfSharesVested", +value);
                    }}
                    onBlur={handleBlur("noOfSharesVested")}
                    value={values.noOfSharesVested}
                    messages={
                      customErrors.noOfSharesVested
                        ? [
                            {
                              id: "noOfSharesVested",
                              text: customErrors.noOfSharesVested,
                            },
                          ]
                        : undefined
                    }
                  />
                </>
              ) : null}

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

export default PrivateLimitedCompanyHoldingForm;
