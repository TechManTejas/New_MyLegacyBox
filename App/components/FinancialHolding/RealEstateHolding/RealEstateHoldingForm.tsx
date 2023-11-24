import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { Formik } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";
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
import { realEstateHoldingValidator } from "../../../utils/form/validators/realEstateHoldingValidator";
import {
  REAL_ESTATE_OWNERSHIP_STATUS_MAP,
  REAL_ESTATE_OWNERSHIP_STATUS_TO_TITLE_MAP,
  REAL_ESTATE_PROPERTY_AREA_UNIT_TO_TITLE_MAP,
} from "../../../constants/financialHoldings/realEstateHolding";

const RealEstateHoldingForm = ({
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
    flexGrow3: {
      flexGrow: 3,
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
    halfWidth: {
      width: "50%",
    },
  });

  const [inputDisabled, setInputDisabled] = useState(false);

  const getAddressFromPinCode = async (pincode, setFieldValue) => {
    setInputDisabled(true);
    const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await res.json();
    const addr = data[0]["PostOffice"];
    if (addr) {
      setFieldValue("address.city", addr[0].Region);
      setFieldValue("address.state", addr[0].State);
      setFieldValue("address.country", addr[0].Country);
    }
    setInputDisabled(false);
  };

  return (
    <Formik
      validationSchema={toFormikValidationSchema(realEstateHoldingValidator)}
      initialValues={{
        propertyName: initialValues?.propertyName || "",
        ownershipStatus: initialValues?.ownershipStatus || "",
        realEstateType: defaultBody?.realEstateType,
        propertyValue: initialValues?.propertyValue || "",
        dateOfPurchase: initialValues?.dateOfPurchase
          ? new Date(initialValues?.dateOfPurchase)
          : "",
        propertyArea: initialValues?.propertyArea || "",
        nominee: initialValues?.nominee || "",
        propertyAreaUnit: initialValues?.propertyAreaUnit || "",
        ownershipPercentage: initialValues?.ownershipPercentage || "",
        description: initialValues?.description || "",
        address: {
          city: initialValues?.address?.city || "",
          state: initialValues?.address?.state || "",
          pinCode: initialValues?.address?.pinCode || "",
          street: initialValues?.address?.street || "",
          country: initialValues?.address?.country || "",
        },
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleChange, handleBlur, setFieldValue, validateForm, values }) => {
        return (
          <CustomKeyboardAvoidingScrollView>
            <View style={styles.container}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Real Estate Details</Text>
              </View>

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
                name="propertyName"
                placeholder="Enter the Property Name"
                title="Name"
                onChangeText={handleChange("propertyName")}
                onBlur={handleBlur("propertyName")}
                value={values.propertyName}
                messages={
                  customErrors.propertyName
                    ? [
                        {
                          id: "propertyName",
                          text: customErrors.propertyName,
                        },
                      ]
                    : undefined
                }
                textTransformNormal
              />

              <CustomDropDownInput
                title="Ownership"
                placeholder="Select status of your ownership"
                data={objectToDropDownLabelAndValues(
                  REAL_ESTATE_OWNERSHIP_STATUS_TO_TITLE_MAP
                )}
                onChange={(value) => {
                  setFieldValue("ownershipStatus", value);
                  if (value === REAL_ESTATE_OWNERSHIP_STATUS_MAP.owned)
                    setFieldValue("ownershipPercentage", 100);
                  else setFieldValue("ownershipPercentage", "");
                }}
                value={values.ownershipStatus}
                messages={
                  customErrors.ownershipStatus
                    ? [
                        {
                          id: "ownershipStatus",
                          text: customErrors.ownershipStatus,
                        },
                      ]
                    : undefined
                }
                showSelectedIcon
              />

              <CustomInputGroup
                name="ownershipPercentage"
                placeholder="Enter the ownership %"
                title="Ownership %"
                onChangeText={(value) => {
                  if (value == " " || value == "")
                    setFieldValue("ownershipPercentage", "");
                  else if (!isNaN(value))
                    setFieldValue("ownershipPercentage", +value);
                }}
                onBlur={handleBlur("ownershipPercentage")}
                value={String(values.ownershipPercentage)}
                messages={
                  customErrors.ownershipPercentage
                    ? [
                        {
                          id: "ownershipPercentage",
                          text: customErrors.ownershipPercentage,
                        },
                      ]
                    : undefined
                }
                disabled={
                  values.ownershipStatus ===
                  REAL_ESTATE_OWNERSHIP_STATUS_MAP.owned
                }
                textTransformNormal
              />

              <View style={styles.row}>
                <View style={styles.flexGrow3}>
                  <CustomInputGroup
                    name="propertyArea"
                    placeholder="Enter the Property Area"
                    title="Area"
                    onChangeText={(value) => {
                      if (value == " " || value == "")
                        setFieldValue("propertyArea", "");
                      else if (!isNaN(value))
                        setFieldValue("propertyArea", +value);
                    }}
                    onBlur={handleBlur("propertyArea")}
                    value={String(values.propertyArea)}
                    messages={
                      customErrors.propertyArea
                        ? [
                            {
                              id: "propertyArea",
                              text: customErrors.propertyArea,
                            },
                          ]
                        : undefined
                    }
                    optional
                    textTransformNormal
                  />
                </View>
                <View style={[styles.fullWidth, styles.leftPadded]}>
                  <CustomDropDownInput
                    title="Area Unit"
                    placeholder="Select area unit"
                    data={objectToDropDownLabelAndValues(
                      REAL_ESTATE_PROPERTY_AREA_UNIT_TO_TITLE_MAP
                    )}
                    onChange={handleChange("propertyAreaUnit")}
                    value={values.propertyAreaUnit}
                    messages={
                      customErrors.propertyAreaUnit
                        ? [
                            {
                              id: "propertyAreaUnit",
                              text: customErrors.propertyAreaUnit,
                            },
                          ]
                        : undefined
                    }
                    optional
                    showSelectedIcon
                  />
                </View>
              </View>

              <CustomInputGroup
                name="propertyValue"
                placeholder="Enter the Property value (in Rs.)"
                title="Property value (in Rs.)"
                onChangeText={(value) => {
                  if (value == " " || value == "")
                    setFieldValue("propertyValue", "");
                  else if (!isNaN(value))
                    setFieldValue("propertyValue", +value);
                }}
                onBlur={handleBlur("propertyValue")}
                value={String(values.propertyValue)}
                messages={
                  customErrors.propertyValue
                    ? [
                        {
                          id: "propertyValue",
                          text: customErrors.propertyValue,
                        },
                      ]
                    : undefined
                }
                optional
                textTransformNormal
              />

              <CustomInputGroup
                name="dateOfPurchase"
                placeholder="Enter the Date of Purchase"
                title="Date of purchase"
                pointerEvents="none"
                onFocus={() => {
                  Keyboard.dismiss();
                  setDatePickerOptions({
                    show: true,
                    property: "dateOfPurchase",
                  });
                }}
                onBlur={handleBlur("dateOfPurchase")}
                value={
                  values.dateOfPurchase
                    ? new Date(values.dateOfPurchase).toLocaleDateString(
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
                  customErrors.dateOfPurchase
                    ? [
                        {
                          id: "dateOfPurchase",
                          text: customErrors.dateOfPurchase,
                        },
                      ]
                    : undefined
                }
                optional
                textTransformNormal
              />
              <CustomInputGroup
                name="description"
                placeholder="Enter the Description"
                title="Description"
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                messages={
                  customErrors.description
                    ? [
                        {
                          id: "description",
                          text: customErrors.description,
                        },
                      ]
                    : undefined
                }
                optional
                textTransformNormal
              />

              <View style={[styles.sectionTitleContainer, styles.row]}>
                <Text style={styles.sectionTitle}>Address</Text>
              </View>

              <View style={styles.row}>
                <View style={styles.halfWidth}>
                  <CustomInputGroup
                    disabled
                    loader={inputDisabled}
                    name="address.city"
                    placeholder="Enter City"
                    title="City"
                    onChangeText={handleChange("address.city")}
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
                <View style={[styles.halfWidth, styles.leftPadded]}>
                  <CustomInputGroup
                    disabled
                    loader={inputDisabled}
                    name="address.state"
                    placeholder="Enter state"
                    title="State"
                    onChangeText={handleChange("address.state")}
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
                <View style={styles.halfWidth}>
                  <CustomInputGroup
                    disabled={inputDisabled}
                    loader={inputDisabled}
                    name="address.pinCode"
                    placeholder="Enter PIN code"
                    title="PIN Code"
                    onChangeText={(value) => {
                      if (value == " " || value == "")
                        setFieldValue("address.pinCode", "");
                      else if (!isNaN(value))
                        setFieldValue("address.pinCode", +value);
                    }}
                    onBlur={() => {
                      getAddressFromPinCode(
                        values.address.pinCode,
                        setFieldValue
                      );
                      handleBlur("address.pinCode");
                    }}
                    value={String(values.address.pinCode)}
                    textContentType="postalCode"
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
                <View style={[styles.halfWidth, styles.leftPadded]}>
                  <CustomInputGroup
                    disabled
                    loader={inputDisabled}
                    name="address.country"
                    placeholder="Enter country"
                    title="country"
                    onChangeText={handleChange("address.country")}
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
                placeholder="Enter the address"
                title="Address Line 1"
                onChangeText={handleChange("address.street")}
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
                multiline
                numberOfLines={10}
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

export default RealEstateHoldingForm;
