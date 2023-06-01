import { View, StyleSheet, Text, Keyboard } from "react-native";
import React, { useState, useRef } from "react";
import WillFormContainer from "./WillFormContainer";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../theme/ThemeProvider";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  cleanObjectAndTrim,
  objectToDropDownLabelAndValues,
} from "../../utils/manipulators";
import { Formik } from "formik";
import { willPersonalInfoValidator } from "../../utils/form/validators/will/willPersonalInfoValidator";
import CustomKeyboardAvoidingScrollView from "../Common/CustomKeyboardAvoidingScrollView";
import CustomDropDownInput from "../Common/CustomDropDownInput";
import { GENDER_MAP_TO_TITLE_MAP } from "../../constants/generalFormEntries";
import { toFormikValidationSchema } from "zod-formik-adapter";
import CustomInputGroup from "../Form/CustomInputGroup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { setPersonalInfoRedux } from "../../services/willForm/willFormSlice";
import { SCREEN_NAMES } from "../../constants/screenNames";

const WillPersonalInfoForm = ({ initialValues, defaultBody }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [customErrors, setCustomErrors] = useState({});
  const [globalErrorMessage, setGlobalErrorMessage] = useState("");
  const [datePickerOptions, setDatePickerOptions] = useState({
    show: false,
    property: "",
  });

  const formRef = useRef();

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

    if (!isValid) return;

    const cleanedValues = cleanObjectAndTrim({ ...values });
    cleanedValues.dateOfBirth = cleanedValues.dateOfBirth.toISOString();

    try {
      dispatch(setPersonalInfoRedux({ ...cleanedValues, ...defaultBody }));
      navigation.navigate(SCREEN_NAMES.willWitnessesScreen);
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
    marginBottomSmall: {
      marginBottom: spacing.sm,
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
    <WillFormContainer
      prevDisabled
      nextHandler={() =>
        onSubmit({
          values: formRef.current.values,
          validateForm: formRef.current.validateForm,
        })
      }
    >
      <Formik
        validationSchema={toFormikValidationSchema(willPersonalInfoValidator)}
        initialValues={{
          name: initialValues?.name || "",
          fathersName: initialValues?.fathersName || "",
          gender: initialValues?.gender || "",
          dateOfBirth: initialValues?.dateOfBirth
            ? new Date(initialValues?.dateOfBirth)
            : undefined,
          aadharNumber: initialValues?.aadharNumber || "",
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
        innerRef={formRef}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ handleChange, setFieldValue, handleBlur, values }) => {
          return (
            <CustomKeyboardAvoidingScrollView keyboardVerticalOffset={100}>
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
                  <Text style={styles.sectionTitle}>Testator's Details</Text>
                </View>
                <CustomInputGroup
                  name="name"
                  placeholder="Enter your Full Name"
                  title="Full Name"
                  onChange={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  messages={
                    customErrors.name
                      ? [{ id: "name", text: customErrors.name }]
                      : undefined
                  }
                  textTransformNormal
                />
                <CustomDropDownInput
                  title="Gender"
                  placeholder="Select your gender"
                  data={objectToDropDownLabelAndValues(GENDER_MAP_TO_TITLE_MAP)}
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
                <CustomInputGroup
                  name="fathersName"
                  placeholder="Enter your Father's Full Name"
                  title="Father's Name"
                  onChange={handleChange("fathersName")}
                  onBlur={handleBlur("fathersName")}
                  value={values.fathersName}
                  messages={
                    customErrors.fathersName
                      ? [{ id: "fathersName", text: customErrors.fathersName }]
                      : undefined
                  }
                  textTransformNormal
                />

                <CustomInputGroup
                  name="dateOfBirth"
                  placeholder="Enter the Date of Birth"
                  title="Date of Birth"
                  pointerEvents="none"
                  onFocus={() => {
                    Keyboard.dismiss();
                    setDatePickerOptions({
                      show: true,
                      property: "dateOfBirth",
                    });
                  }}
                  onBlur={handleBlur("dateOfBirth")}
                  value={
                    values.dateOfBirth
                      ? new Date(values.dateOfBirth).toLocaleDateString(
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
                    customErrors.dateOfBirth
                      ? [
                          {
                            id: "dateOfBirth",
                            text: customErrors.dateOfBirth,
                          },
                        ]
                      : undefined
                  }
                  textTransformNormal
                />
                <CustomInputGroup
                  name="aadharNumber"
                  placeholder="Enter your Aadhar number"
                  title="Aadhar Number"
                  onChange={handleChange("aadharNumber")}
                  onBlur={handleBlur("aadharNumber")}
                  value={values.aadharNumber}
                  messages={
                    customErrors.aadharNumber
                      ? [
                          {
                            id: "aadharNumber",
                            text: customErrors.aadharNumber,
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
                {globalErrorMessage ? (
                  <View style={styles.marginBottomSmall}>
                    <Text style={styles.errorMessage}>
                      {globalErrorMessage}
                    </Text>
                  </View>
                ) : null}
              </View>
            </CustomKeyboardAvoidingScrollView>
          );
        }}
      </Formik>
    </WillFormContainer>
  );
};

export default WillPersonalInfoForm;
