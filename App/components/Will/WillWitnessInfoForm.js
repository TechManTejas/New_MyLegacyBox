import { View, StyleSheet, Text, Keyboard } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../theme/ThemeProvider";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  cleanObjectAndTrim,
  objectToDropDownLabelAndValues,
} from "../../utils/manipulators";
import { Formik } from "formik";
import CustomKeyboardAvoidingScrollView from "../Common/CustomKeyboardAvoidingScrollView";
import CustomDropDownInput from "../Common/CustomDropDownInput";
import { GENDER_MAP_TO_TITLE_MAP } from "../../constants/generalFormEntries";
import { toFormikValidationSchema } from "zod-formik-adapter";
import CustomInputGroup from "../Form/CustomInputGroup";
import {
  addWitnessRedux,
  editWitnessByIndexRedux,
} from "../../services/willForm/willFormSlice";
import { willWitnessInfoValidator } from "../../utils/form/validators/will/willWitnessInfoValidator";
import BlueButton from "../Common/Button/BlueButton";

const WillWitnessInfoForm = ({ initialValues, defaultBody, index }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [customErrors, setCustomErrors] = useState({});
  const [globalErrorMessage, setGlobalErrorMessage] = useState("");

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

    try {
      Object.keys(initialValues).length
        ? dispatch(
            editWitnessByIndexRedux({
              witness: { ...cleanedValues, ...defaultBody },
              index,
            })
          )
        : dispatch(addWitnessRedux({ ...cleanedValues, ...defaultBody }));
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
    <Formik
      validationSchema={toFormikValidationSchema(willWitnessInfoValidator)}
      initialValues={{
        name: initialValues?.name || "",
        fathersName: initialValues?.fathersName || "",
        gender: initialValues?.gender || "",
        relationshipWithTestator: initialValues?.relationshipWithTestator || "",
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
      {({ handleChange, setFieldValue, handleBlur, values, validateForm }) => {
        return (
          <CustomKeyboardAvoidingScrollView keyboardVerticalOffset={100}>
            <View style={styles.container}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Witness Details</Text>
              </View>
              <CustomInputGroup
                name="name"
                placeholder="Enter witness's Full Name"
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
              <CustomInputGroup
                name="fathersName"
                placeholder="Enter witness's Father's Full Name"
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
                name="relationshipWithTestator"
                placeholder="Enter witness's relationship with testator"
                title="Relationship with testator"
                onChange={handleChange("relationshipWithTestator")}
                onBlur={handleBlur("relationshipWithTestator")}
                value={values.relationshipWithTestator}
                messages={
                  customErrors.relationshipWithTestator
                    ? [
                        {
                          id: "relationshipWithTestator",
                          text: customErrors.relationshipWithTestator,
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
              <BlueButton
                title={
                  Object.keys(initialValues).length
                    ? "Edit Witness"
                    : "Add Witness"
                }
                onPress={() => onSubmit({ values, validateForm })}
              />
              {globalErrorMessage ? (
                <View style={styles.marginBottomSmall}>
                  <Text style={styles.errorMessage}>{globalErrorMessage}</Text>
                </View>
              ) : null}
            </View>
          </CustomKeyboardAvoidingScrollView>
        );
      }}
    </Formik>
  );
};

export default WillWitnessInfoForm;
