import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { cleanObjectAndTrim } from "../../utils/manipulators";
import CustomInputGroup from "../Form/CustomInputGroup";
import { useTheme } from "../../theme/ThemeProvider";
import BlueButton from "../Common/Button/BlueButton";
import { useNavigation } from "@react-navigation/native";
import CustomKeyboardAvoidingScrollView from "../Common/CustomKeyboardAvoidingScrollView";
import { postalValidator } from "../../utils/form/validators/postalValidator";

const PostalForm = ({ ctaCaption, defaultBody, apiCallback, isLoading, initialValues }) => {
  const navigation = useNavigation();
  const [customErrors, setCustomErrors] = useState({});
  const [globalErrorMessage, setGlobalErrorMessage] = useState("");

  const {
    theme: { colors, spacing, fontSize, fontFamily },
  } = useTheme();

  const customErrorWithValidation = useCallback(({ values, errors }) => {
    let customErrors;
    let isValid;
    const isAddressValueFilled = values.address
      ? Object.values(values.address).some((v) => Boolean(v))
      : false;

    if (!isAddressValueFilled) {
      const { address, ...rest } = errors;
      customErrors = { ...rest };

      isValid = !Boolean(Object.keys(rest).length);
    } else {
      customErrors = { ...errors };
      isValid = !Boolean(Object.keys(customErrors).length);
    }

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
      await apiCallback({ ...cleanedValues, ...defaultBody }).unwrap();
      navigation.goBack();
    } catch (error) {
      setGlobalErrorMessage(error?.data?.error?.message || error.message);
    }
  }, []);

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      backgroundColor: colors.white100,
    },
    sectionTitleContainer: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black200,
      marginBottom: spacing.md,
    },
    row: {
      flexDirection: "row",
      alignItems: "baseline",
    },
    fullWidth: {
      flexGrow: 1,
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
    leftPadded: {
      paddingLeft: spacing.sm,
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
      validationSchema={toFormikValidationSchema(postalValidator)}
      initialValues={{
        ifsc: initialValues?.ifsc || "",
        customerId: initialValues?.customerId || "",
        branchName: initialValues?.branchName || "",
        poc: initialValues?.poc || "",
        pocNumber: initialValues?.pocNumber || "",
        address: {
          city: initialValues?.address?.city || "",
          state: initialValues?.address?.state || "",
          pinCode: initialValues?.address?.pinCode || undefined,
          street: initialValues?.address?.street || "",
          country: initialValues?.address?.country || "",
        },
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleChange, setFieldValue, handleBlur, validateForm, values }) => {
        return (
          <CustomKeyboardAvoidingScrollView keyboardVerticalOffset={100}>
            <View style={styles.container}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Postal Details</Text>
              </View>

              <CustomInputGroup
                name="branchName"
                placeholder="Enter your Branch Name"
                title="Branch Name"
                onChange={handleChange("branchName")}
                onBlur={handleBlur("branchName")}
                value={values.branchName}
                messages={
                  customErrors.branchName
                    ? [{ id: "branchName", text: customErrors.branchName }]
                    : undefined
                }
              />

              <CustomInputGroup
                name="ifsc"
                placeholder="Enter your IFSC"
                title="IFSC code"
                onChange={handleChange("ifsc")}
                onBlur={handleBlur("ifsc")}
                value={values.ifsc}
                messages={
                  customErrors.ifsc
                    ? [{ id: "ifsc", text: customErrors.ifsc }]
                    : undefined
                }
                optional
                textTransformNormal
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
                    ? [{ id: "customerId", text: customErrors.customerId }]
                    : undefined
                }
                optional
              />

              <CustomInputGroup
                name="poc"
                placeholder="Point of contact name"
                title="Point of contact"
                onChange={handleChange("poc")}
                onBlur={handleBlur("poc")}
                value={values.poc}
                messages={
                  customErrors.poc
                    ? [{ id: "poc", text: customErrors.poc }]
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
                textContentType="telephoneNumber"
                messages={
                  customErrors.pocNumber
                    ? [{ id: "pocNumber", text: customErrors.pocNumber }]
                    : undefined
                }
                optional
                textTransformNormal
              />
              <View style={[styles.sectionTitleContainer, styles.row]}>
                <Text style={styles.sectionTitle}>Address</Text>
                <Text style={[styles.sectionSubTitle, styles.leftPadded]}>
                  optional
                </Text>
              </View>
              <View style={styles.row}>
                <View style={styles.fullWidth}>
                  <CustomInputGroup
                    name="address.city"
                    placeholder="Enter City"
                    title="City"
                    onChange={handleChange("address.city")}
                    onBlur={handleBlur("address.city")}
                    value={values.address.city}
                    textContentType="addressCity"
                    messages={
                      customErrors.address?.city
                        ? [
                            {
                              id: "address.city",
                              text: customErrors.address?.city,
                            },
                          ]
                        : undefined
                    }
                  />
                </View>
                <View style={[styles.fullWidth, styles.leftPadded]}>
                  <CustomInputGroup
                    name="address.state"
                    placeholder="Enter state"
                    title="State"
                    onChange={handleChange("address.state")}
                    onBlur={handleBlur("address.state")}
                    value={values.address.state}
                    textContentType="addressState"
                    messages={
                      customErrors.address?.state
                        ? [
                            {
                              id: "address.state",
                              text: customErrors.address?.state,
                            },
                          ]
                        : undefined
                    }
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.fullWidth}>
                  <CustomInputGroup
                    name="address.pinCode"
                    placeholder="Enter PIN code"
                    title="PIN Code"
                    onChangeText={(value) => {
                      if (value==" " || value=="") setFieldValue("address.pinCode", "")
                      else if (!isNaN(value)) setFieldValue("address.pinCode", + value)
                    }}
                    onBlur={handleBlur("address.pinCode")}
                    value={values.address.pinCode}
                    textContentType="number"
                    messages={
                      customErrors.address?.pinCode
                        ? [
                            {
                              id: "address.pinCode",
                              text: customErrors.address?.pinCode,
                            },
                          ]
                        : undefined
                    }
                    textTransformNormal
                  />
                </View>
                <View style={[styles.fullWidth, styles.leftPadded]}>
                  <CustomInputGroup
                    name="address.country"
                    placeholder="Enter country"
                    title="country"
                    onChange={handleChange("address.country")}
                    onBlur={handleBlur("address.country")}
                    value={values.address.country}
                    textContentType="countryName"
                    messages={
                      customErrors.address?.country
                        ? [
                            {
                              id: "address.country",
                              text: customErrors.address?.country,
                            },
                          ]
                        : undefined
                    }
                    optional
                  />
                </View>
              </View>
              <CustomInputGroup
                name="address.street"
                placeholder="Enter street"
                title="Street"
                onChange={handleChange("address.street")}
                onBlur={handleBlur("address.street")}
                value={values.address.street}
                textContentType="fullStreetAddress"
                messages={
                  customErrors.address?.street
                    ? [
                        {
                          id: "address.street",
                          text: customErrors.address?.street,
                        },
                      ]
                    : undefined
                }
                textTransformNormal
              />
              <BlueButton
                disabled={isLoading}
                title={ctaCaption}
                onPress={() => onSubmit({ values, validateForm })}
                isLoading={isLoading}
              />
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

export default PostalForm;
