import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  cleanObjectAndTrim,
  objectToDropDownLabelAndValues,
} from "../../utils/manipulators";
import CustomInputGroup from "../Form/CustomInputGroup";
import { useTheme } from "../../theme/ThemeProvider";
import BlueButton from "../Common/Button/BlueButton";
import { useNavigation } from "@react-navigation/native";
import CustomKeyboardAvoidingScrollView from "../Common/CustomKeyboardAvoidingScrollView";
import { nomineeValidator } from "../../utils/form/validators";
import CustomDropDownInput from "../Common/CustomDropDownInput";
import {
  NOMINEE_GENDER_TO_TITLE_MAP,
  NOMINEE_RELATIONSHIP_TO_TITLE_MAP,
} from "../../constants/nominee";

const NomineeForm = ({
  ctaCaption,
  defaultBody,
  apiCallback,
  isLoading,
  initialValues,
}) => {
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
      console.log(error);
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
      validationSchema={toFormikValidationSchema(nomineeValidator)}
      initialValues={{
        fullName: initialValues?.fullName || "",
        gender: initialValues?.gender || "",
        relationship: initialValues?.relationship || "",
        phoneNumber: initialValues?.phoneNumber || "",
        email: initialValues?.email || "",
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
      {({ handleChange, setFieldValue, handleBlur, validateForm, values }) => {
        return (
          <CustomKeyboardAvoidingScrollView keyboardVerticalOffset={100}>
            <View style={styles.container}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Nominee Details</Text>
              </View>
              <CustomInputGroup
                name="fullName"
                placeholder="Enter nominee's full name"
                title="Full Name"
                onChange={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                value={values.fullName}
                messages={
                  customErrors.fullName
                    ? [{ id: "fullName", text: customErrors.fullName }]
                    : undefined
                }
              />

              <CustomDropDownInput
                title="Gender"
                placeholder="Select nominee's gender"
                data={objectToDropDownLabelAndValues(
                  NOMINEE_GENDER_TO_TITLE_MAP
                )}
                onChange={handleChange("gender")}
                value={values.gender}
                messages={
                  customErrors.gender
                    ? [
                        {
                          id: "gender",
                          text: customErrors.gender,
                        },
                      ]
                    : undefined
                }
                showSelectedIcon
              />

              <CustomDropDownInput
                title="Relationship"
                placeholder="Select nominee's relationship with you"
                data={objectToDropDownLabelAndValues(
                  NOMINEE_RELATIONSHIP_TO_TITLE_MAP
                )}
                onChange={handleChange("relationship")}
                value={values.relationship}
                messages={
                  customErrors.relationship
                    ? [
                        {
                          id: "relationship",
                          text: customErrors.relationship,
                        },
                      ]
                    : undefined
                }
                showSelectedIcon
              />

              <CustomInputGroup
                name="phoneNumber"
                placeholder="Enter nominee's phone number"
                title="Phone Number"
                onChange={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                value={values.phoneNumber}
                messages={
                  customErrors.phoneNumber
                    ? [{ id: "phoneNumber", text: customErrors.phoneNumber }]
                    : undefined
                }
              />

              <CustomInputGroup
                name="email"
                placeholder="Enter nominee's email"
                title="Email"
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                messages={
                  customErrors.email
                    ? [{ id: "email", text: customErrors.email }]
                    : undefined
                }
                optional
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

export default NomineeForm;
