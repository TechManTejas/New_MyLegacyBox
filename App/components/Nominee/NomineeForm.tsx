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
import { useNavigation, useRoute } from "@react-navigation/native";
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
  const route = useRoute();

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

    if (ctaCaption === "Confirm") delete cleanedValues["email"];

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
    sectionInfo: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.sm,
      lineHeight: fontSize.md,
      color: colors.black300,
      marginBottom: spacing.sm,
      marginTop: -spacing.xxs,
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
      validationSchema={toFormikValidationSchema(nomineeValidator)}
      initialValues={{
        fullName: initialValues?.fullName || "",
        gender: initialValues?.gender || "",
        relationship: initialValues?.relationship || "",
        phoneNumber: initialValues?.phoneNumber || "",
        email: initialValues?.email || "",
        age: initialValues?.age || "",
        aadharNumber: initialValues?.aadharNumber || "",
        fathersName: initialValues?.fathersName || "",
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
      {({ handleChange, setFieldValue, handleBlur, validateForm, values }) => {
        return (
          <CustomKeyboardAvoidingScrollView keyboardVerticalOffset={100}>
            <View style={styles.container}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>
                  {ctaCaption === "Confirm"
                    ? `${route.params.nominee.fullName}'s Details`
                    : "Member's Details"}
                </Text>
              </View>
              <CustomInputGroup
                name="fullName"
                placeholder="Enter member's full name"
                title="Full Name"
                onChangeText={handleChange("fullName")}
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
                placeholder="Select member's gender"
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
                placeholder="Select member's relationship with you"
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
                placeholder="Enter member's phone number"
                title="Phone Number"
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                value={values.phoneNumber}
                messages={
                  customErrors.phoneNumber
                    ? [{ id: "phoneNumber", text: customErrors.phoneNumber }]
                    : undefined
                }
              />

              <CustomInputGroup
                disabled={ctaCaption === "Confirm"}
                name="email"
                placeholder="Enter member's email"
                title="Email"
                onChangeText={(value) => {
                  setFieldValue("email", value.toLowerCase().trim());
                }}
                onBlur={handleBlur("email")}
                value={values.email}
                messages={
                  customErrors.email
                    ? [{ id: "email", text: customErrors.email }]
                    : undefined
                }
              />

              <View style={styles.sectionTitleContainer}>
                <View style={styles.row}>
                  <Text style={styles.sectionTitle}>
                    Additional Information
                  </Text>
                  <Text style={[styles.sectionSubTitle, styles.leftPadded]}>
                    optional
                  </Text>
                </View>
                <Text style={styles.sectionInfo}>
                  Required to be included in the Will
                </Text>
              </View>
              <CustomInputGroup
                optional
                name="age"
                placeholder="Enter member's age"
                title="Age"
                onChangeText={(value) => {
                  if (value == " " || value == "") setFieldValue("age", "");
                  else if (!isNaN(value)) setFieldValue("age", +value);
                }}
                onBlur={handleBlur("age")}
                value={String(values.age)}
                messages={
                  customErrors.age
                    ? [{ id: "age", text: customErrors.age }]
                    : undefined
                }
                subTitle="Required for Beneficiary/Executor/Witness, age must be 18+ for Executor/Witness"
              />

              <CustomInputGroup
                optional
                name="aadharNumber"
                placeholder="Enter member's Aadhar Number"
                title="Aadhar Number"
                onChangeText={handleChange("aadharNumber")}
                onBlur={handleBlur("aadharNumber")}
                value={values.aadharNumber}
                messages={
                  customErrors.aadharNumber
                    ? [{ id: "aadharNumber", text: customErrors.aadharNumber }]
                    : undefined
                }
                subTitle="Required for Witness"
              />

              <CustomInputGroup
                optional
                name="fathersName"
                placeholder="Enter member's father's name"
                title="Father's Name"
                onChangeText={handleChange("fathersName")}
                onBlur={handleBlur("fathersName")}
                value={values.fathersName}
                messages={
                  customErrors.fathersName
                    ? [{ id: "fathersName", text: customErrors.fathersName }]
                    : undefined
                }
                subTitle="Required for Executor/Witness"
              />

              <View style={styles.sectionTitleContainer}>
                <View style={styles.row}>
                  <Text style={styles.sectionTitle}>Address</Text>
                  <Text style={[styles.sectionSubTitle, styles.leftPadded]}>
                    optional
                  </Text>
                </View>
                <Text style={styles.sectionInfo}>
                  required for witness and executor
                </Text>
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
