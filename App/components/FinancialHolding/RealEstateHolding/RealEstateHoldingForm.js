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
import BlueButton from "../../Button/BlueButton";
import { useNavigation } from "@react-navigation/native";
import CustomDropDownInput from "../../Common/CustomDropDownInput";
import CustomKeyboardAvoidingScrollView from "../../Common/CustomKeyboardAvoidingScrollView";
import { realEstateHoldingValidator } from "../../../utils/form/validators/realEstateHoldingValidator";
import {
  REAL_ESTATE_OWNERSHIP_STATUS_TO_TITLE_MAP,
  REAL_ESTATE_PROPERTY_AREA_UNIT_TO_TITLE_MAP,
} from "../../../constants/financialHoldings/realEstateHolding";

const RealEstateHoldingForm = ({
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
  });

  return (
    <Formik
      validationSchema={toFormikValidationSchema(realEstateHoldingValidator)}
      initialValues={{
        realEstateType: defaultBody?.realEstateType,
        ownershipStatus: initialValues?.ownershipStatus || "",
        propertyArea: initialValues?.propertyArea || undefined,
        propertyAreaUnit: initialValues?.propertyAreaUnit || "",
        ownershipPercentage: initialValues?.ownershipPercentage || undefined,
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
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Real Estate Details</Text>
              </View>
              <CustomDropDownInput
                title="Ownership"
                placeholder="Select status of your ownership"
                data={objectToDropDownLabelAndValues(
                  REAL_ESTATE_OWNERSHIP_STATUS_TO_TITLE_MAP
                )}
                onChange={handleChange("ownershipStatus")}
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

              <View style={styles.row}>
                <View style={styles.flexGrow3}>
                  <CustomInputGroup
                    name="propertyArea"
                    placeholder="Enter the Property Area"
                    title="Area"
                    onChange={(value) => {
                      setFieldValue("propertyArea", +value);
                    }}
                    onBlur={handleBlur("propertyArea")}
                    value={values.propertyArea}
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
                name="ownershipPercentage"
                placeholder="Enter the ownership %"
                title="Ownership %"
                onChange={(value) => {
                  setFieldValue("ownershipPercentage", +value);
                }}
                onBlur={handleBlur("ownershipPercentage")}
                value={values.ownershipPercentage}
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
                textTransformNormal
              />

              <View style={[styles.sectionTitleContainer, styles.row]}>
                <Text style={styles.sectionTitle}>Address</Text>
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
                      setFieldValue("address.pinCode", +value);
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
                name="address.contact"
                placeholder="Enter contact"
                title="Contact"
                onChange={handleChange("address.contact")}
                onBlur={handleBlur("address.contact")}
                value={values.address.contact}
                textContentType="telephoneNumber"
                messages={
                  customErrors.address?.contact
                    ? [
                        {
                          id: "address.contact",
                          text: customErrors.address?.contact,
                        },
                      ]
                    : undefined
                }
                optional
                textTransformNormal
              />
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

              <CustomInputGroup
                name="address.landmark"
                placeholder="Enter landmark"
                title="Landmark"
                onChange={handleChange("address.landmark")}
                onBlur={handleBlur("address.landmark")}
                value={values.address.landmark}
                messages={
                  customErrors.address?.landmark
                    ? [
                        {
                          id: "address.landmark",
                          text: customErrors.address?.landmark,
                        },
                      ]
                    : undefined
                }
                optional
              />
              <CustomInputGroup
                name="address.building"
                placeholder="Enter Building"
                title="Building"
                onChange={handleChange("address.building")}
                onBlur={handleBlur("address.building")}
                value={values.address.building}
                messages={
                  customErrors.address?.building
                    ? [
                        {
                          id: "address.building",
                          text: customErrors.address?.building,
                        },
                      ]
                    : undefined
                }
                optional
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
