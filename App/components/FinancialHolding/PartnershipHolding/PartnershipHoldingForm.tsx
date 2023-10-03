import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import CustomInputGroup from "../../Form/CustomInputGroup";
import { cleanObjectAndTrim } from "../../../utils/manipulators";
import { useTheme } from "../../../theme/ThemeProvider";
import BlueButton from "../../Common/Button/BlueButton";
import { useNavigation } from "@react-navigation/native";
import CustomKeyboardAvoidingScrollView from "../../Common/CustomKeyboardAvoidingScrollView";
import { partnershipHoldingValidator } from "../../../utils/form/validators/partnershipHoldingValidator";

const PartnershipHoldingForm = ({
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
      validationSchema={toFormikValidationSchema(partnershipHoldingValidator)}
      initialValues={{
        nameOfFirm: initialValues?.nameOfFirm || "",
        panNumber: initialValues?.panNumber || "",
        percentageHolding: initialValues?.percentageHolding || "",
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleChange, handleBlur, setFieldValue, validateForm, values }) => {
        return (
          <CustomKeyboardAvoidingScrollView>
            <View style={styles.container}>
              <CustomInputGroup
                name="nameOfFirm"
                placeholder="Enter your Firm name"
                title="Firm Name"
                onChange={handleChange("nameOfFirm")}
                onBlur={handleBlur("nameOfFirm")}
                value={values.nameOfFirm}
                messages={
                  customErrors.nameOfFirm
                    ? [
                        {
                          id: "nameOfFirm",
                          text: customErrors.nameOfFirm,
                        },
                      ]
                    : undefined
                }
              />

              <CustomInputGroup
                textTransformNormal
                name="panNumber"
                placeholder="Enter PAN number"
                title="PAN Number"
                onChange={handleChange("panNumber")}
                onBlur={handleBlur("panNumber")}
                value={values.panNumber}
                messages={
                  customErrors.panNumber
                    ? [
                        {
                          id: "panNumber",
                          text: customErrors.panNumber,
                        },
                      ]
                    : undefined
                }
              />

              <CustomInputGroup
                name="percentageHolding"
                placeholder="Enter your holding in %"
                title="Percentage Holding"
                onChangeText={(value) => {
                  if (value == " " || value == "")
                    setFieldValue("percentageHolding", "");
                  else if (!isNaN(value))
                    setFieldValue("percentageHolding", +value);
                }}
                onBlur={handleBlur("percentageHolding")}
                value={values.percentageHolding}
                messages={
                  customErrors.percentageHolding
                    ? [
                        {
                          id: "percentageHolding",
                          text: customErrors.percentageHolding,
                        },
                      ]
                    : undefined
                }
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

export default PartnershipHoldingForm;
