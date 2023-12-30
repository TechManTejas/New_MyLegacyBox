import { View, StyleSheet, Text, Keyboard } from "react-native";
import React, { useState, useRef } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { useCallback } from "react";
import {
  cleanObjectAndTrim,
  objectToDropDownLabelAndValues,
} from "../../utils/manipulators";
import { Formik } from "formik";
import CustomKeyboardAvoidingScrollView from "./CustomKeyboardAvoidingScrollView";
import CustomDropDownInput from "./CustomDropDownInput";
import { GENDER_MAP_TO_TITLE_MAP } from "../../constants/generalFormEntries";
import { toFormikValidationSchema } from "zod-formik-adapter";
import CustomInputGroup from "../Form/CustomInputGroup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { personalInfoUpdateValidator } from "../../utils/form/validators/personalInfoUpdateValidator";
import {
  useGetPersonalInfoQuery,
  useSavePersonalInfoMutation,
} from "../../redux/api/personalInfo/personalInfoApiSlice";
import BlueButton from "./Button/BlueButton";
import { useEffect } from "react";
import CustomActivityIndicator from "./CustomActivityIndicator";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../authentication/AuthProvider";

const PersonalInfoForm = () => {
  const navigation = useNavigation();

  const getPersonalInfoOptions = useGetPersonalInfoQuery();

  const { session } = useAuth();

  const {
    data,
    isLoading: getPersonalInfoLoading,
    isFetching,
  } = getPersonalInfoOptions;
  
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    setInitialValues(
      data?.data && typeof data.data === "object" ? data.data : {}
    );  
  }, [data]);

  const [savePersonalInfo, { isLoading }] = useSavePersonalInfoMutation();

  const [customErrors, setCustomErrors] = useState({});

  const [globalErrorMessage, setGlobalErrorMessage] = useState("");

  const [datePickerOptions, setDatePickerOptions] = useState({
    show: false,
    property: "",
  });

  console.log(datePickerOptions);
  

  const formRef = useRef();

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

    if (!isValid) return;

    const cleanedValues = cleanObjectAndTrim({ ...values });

    try {
      await savePersonalInfo({ ...cleanedValues }).unwrap();
      navigation.goBack();
    } catch (error) {
      setGlobalErrorMessage(error?.data?.error?.message || error.message);
    }
  }, []);

  const styles = StyleSheet.create({
    formikContainer: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      backgroundColor: colors.white100,
    },
    halfWidth: {
      width: "50%",
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
    container: {
      flex: 1,
      backgroundColor: colors.white100,
    },
    formContainer: {
      flexGrow: 1,
      marginBottom: spacing.xxxl,
    },

    footer: {
      position: "absolute",
      bottom: 0,
      backgroundColor: colors.white100,
      flexDirection: "column",
      paddingVertical: spacing.md,
      paddingBottom: spacing.lg,
      paddingHorizontal: spacing.lg,
      width: "100%",
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

  if (isFetching || getPersonalInfoLoading)
    return <CustomActivityIndicator />;

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Formik
          validationSchema={toFormikValidationSchema(
            personalInfoUpdateValidator
          )}
          initialValues={{
            fathersName: initialValues?.fathersName || "",
            gender: initialValues?.gender || "",
            dateOfBirth: initialValues?.dateOfBirth
              ? new Date(initialValues?.dateOfBirth)
              : undefined,
            aadharNumber: initialValues?.aadharNumber || "",
            address: {
              city: initialValues?.address?.city || "",
              state: initialValues?.address?.state || "",
              pinCode: initialValues?.address?.pinCode || "",
              street: initialValues?.address?.street || "",
              country: initialValues?.address?.country || "",
            },
          }}
          innerRef={formRef}
          validateOnChange={false}
          validateOnBlur={false}
          enableReinitialize
        >
          {({ handleChange, setFieldValue, handleBlur, values }) => {
            return (
              <CustomKeyboardAvoidingScrollView keyboardVerticalOffset={100}>
                <View style={styles.formikContainer}>
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
                          setFieldValue(
                            datePickerOptions.property,
                            selectedDate
                          );
                          return;
                        }
                      }}
                    />
                  )}

                  <CustomInputGroup
                    disabled
                    title="Full Name"
                    value={`${session?.identity?.traits.name.first} ${session?.identity?.traits.name.last}`}
                  />

                  <CustomInputGroup
                    disabled
                    title="Email Address"
                    value={session?.identity?.traits.email}
                  />
                  <CustomInputGroup
                    disabled
                    title="Phone Number"
                    value={session?.identity?.traits.phone}
                  />

                  <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitle}>Personal Details</Text>
                  </View>

                  <CustomDropDownInput
                    title="Gender"
                    placeholder="Select your gender"
                    data={objectToDropDownLabelAndValues(
                      GENDER_MAP_TO_TITLE_MAP
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

                  <CustomInputGroup
                    name="fathersName"
                    placeholder="Enter your Father's Full Name"
                    title="Father's Name"
                    onChangeText={handleChange("fathersName")}
                    onBlur={handleBlur("fathersName")}
                    value={values.fathersName}
                    isLogging
                    messages={
                      customErrors.fathersName
                        ? [
                            {
                              id: "fathersName",
                              text: customErrors.fathersName,
                            },
                          ]
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
                    onChangeText={handleChange("aadharNumber")}
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
                    <Text style={[styles.sectionSubTitle, styles.leftPadded]}>
                      optional
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
                </View>
              </CustomKeyboardAvoidingScrollView>
            );
          }}
        </Formik>
      </View>
      <View style={styles.footer}>
        <BlueButton
          title={"Confirm"}
          expandHorizontal
          onPress={() => {
            onSubmit({
              values: formRef.current.values,
              validateForm: formRef.current.validateForm,
            });
          }}
          disabled={isLoading}
          isLoading={isLoading}
        />
        {globalErrorMessage ? (
          <View style={styles.marginBottomSmall}>
            <Text style={styles.errorMessage}>{globalErrorMessage}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default PersonalInfoForm;
