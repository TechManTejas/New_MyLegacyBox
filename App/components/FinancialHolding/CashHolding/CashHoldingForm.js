import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import DateTimePicker from "@react-native-community/datetimepicker";
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
import { cashHoldingValidator } from "../../../utils/form/validators/cashHoldingValidator";
import { CASH_TYPE_TO_TITLE_MAP } from "../../../constants/financialHoldings/cashHolding";

const CashHoldingForm = ({ ctaCaption, defaultBody, apiCallback, isLoading, initialValues }) => {
  const [customErrors, setCustomErrors] = useState({});
  const [globalErrorMessage, setGlobalErrorMessage] = useState("");
  const navigation = useNavigation();
  const [datePickerOptions, setDatePickerOptions] = useState({
    show: false,
    property: "",
  });

  const { theme: { colors, spacing, fontSize, fontFamily }} = useTheme();

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
      validationSchema={toFormikValidationSchema(cashHoldingValidator)}
      initialValues={{
        cashType: initialValues?.cashType || "",
        dateOfTransaction: initialValues?.dateOfTransaction
          ? new Date(initialValues?.dateOfTransaction)
          : undefined,
        nameOfParty: initialValues?.nameOfParty || "",
        phoneNumberOfParty: initialValues?.phoneNumberOfParty || "",
        amount: initialValues?.amount || undefined,
        address: {
          city: initialValues?.address?.city || "",
          state: initialValues?.address?.state || "",
          pinCode: initialValues?.address?.pinCode || undefined,
          contact: initialValues?.address?.contact || "",
          street: initialValues?.address?.street || "",
          country: initialValues?.address?.country || "",
          landmark: initialValues?.address?.landmark || "",
          building: initialValues?.address?.building || "",
        },
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleChange, handleBlur, setFieldValue, validateForm, values }) => {
        return (
          <CustomKeyboardAvoidingScrollView>
            <View style={styles.container}>
              {datePickerOptions.show ? (
                <DateTimePicker
                  value={
                    values[datePickerOptions.property]
                      ? values[datePickerOptions.property]
                      : new Date()
                  }
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    if (event.type === "set")
                      setFieldValue(datePickerOptions.property, selectedDate);

                    setDatePickerOptions((datePickerOptions) => ({
                      show: false,
                      property: datePickerOptions.property,
                    }));
                  }}
                />
              ) : null}
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Cash Details</Text>
              </View>
              <CustomInputGroup
                name="nameOfParty"
                placeholder="Enter your Name of the Party"
                title="Name of Party"
                onChange={handleChange("nameOfParty")}
                onBlur={handleBlur("nameOfParty")}
                value={values.nameOfParty}
                messages={
                  customErrors.nameOfParty
                    ? [
                        {
                          id: "nameOfParty",
                          text: customErrors.nameOfParty,
                        },
                      ]
                    : undefined
                }
                textTransformNormal
              />

              <CustomInputGroup
                name="phoneNumberOfParty"
                placeholder="Enter your Phone number of Party"
                title="Phone number of Party"
                onChange={handleChange("phoneNumberOfParty")}
                onBlur={handleBlur("phoneNumberOfParty")}
                value={values.phoneNumberOfParty}
                messages={
                  customErrors.phoneNumberOfParty
                    ? [
                        {
                          id: "phoneNumberOfParty",
                          text: customErrors.phoneNumberOfParty,
                        },
                      ]
                    : undefined
                }
                textTransformNormal
              />
              <CustomDropDownInput
                title="Cash Type"
                placeholder="Select type of cash"
                data={objectToDropDownLabelAndValues(CASH_TYPE_TO_TITLE_MAP)}
                onChange={handleChange("cashType")}
                value={values.cashType}
                messages={
                  customErrors.cashType
                    ? [
                        {
                          id: "cashType",
                          text: customErrors.cashType,
                        },
                      ]
                    : undefined
                }
                showSelectedIcon
              />

              <CustomInputGroup
                name="dateOfTransaction"
                placeholder="Enter the Date of Transaction"
                title="Date of transaction"
                pointerEvents="none"
                onFocus={() => {
                  Keyboard.dismiss();
                  setDatePickerOptions({
                    show: true,
                    property: "dateOfTransaction",
                  });
                }}
                onBlur={handleBlur("dateOfTransaction")}
                value={
                  values.dateOfTransaction
                    ? new Date(values.dateOfTransaction).toLocaleDateString(
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
                  customErrors.dateOfTransaction
                    ? [
                        {
                          id: "dateOfTransaction",
                          text: customErrors.dateOfTransaction,
                        },
                      ]
                    : undefined
                }
                textTransformNormal
              />

              <CustomInputGroup
                name="amount"
                placeholder="Enter the Amount"
                title="Amount (in Rs)"
                onChange={(value) => {
                  if (value==" " || value=="") setFieldValue("amount", "")
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
                      if (value==" " || value=="") return
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

export default CashHoldingForm;
