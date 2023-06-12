import { View, StyleSheet, Text, Keyboard } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../theme/ThemeProvider";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { cleanObjectAndTrim } from "../../utils/manipulators";
import { Formik } from "formik";
import CustomKeyboardAvoidingScrollView from "../Common/CustomKeyboardAvoidingScrollView";
import { toFormikValidationSchema } from "zod-formik-adapter";
import CustomInputGroup from "../Form/CustomInputGroup";
import {
  addBeneficiaryRedux,
  editBeneficiaryByIndexRedux,
} from "../../services/willForm/willFormSlice";
import { willBeneficiaryInfoValidator } from "../../utils/form/validators/will/willBeneficiaryInfoValidator";
import BlueButton from "../Common/Button/BlueButton";

const WillBeneficiaryInfoForm = ({ initialValues, defaultBody, index }) => {
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
            editBeneficiaryByIndexRedux({
              benefciary: { ...cleanedValues, ...defaultBody },
              index,
            })
          )
        : dispatch(addBeneficiaryRedux({ ...cleanedValues, ...defaultBody }));
      navigation.goBack();
    } catch (error) {
      setGlobalErrorMessage(error?.data?.error?.message || error.message);
    }
  }, []);

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
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
    buttonContainer: {
      marginTop: "auto",
    },
  });

  return (
    <Formik
      validationSchema={toFormikValidationSchema(willBeneficiaryInfoValidator)}
      initialValues={{
        name: initialValues?.name || "",
        age: initialValues?.age || undefined,
        relationshipWithTestator: initialValues?.relationshipWithTestator || "",
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleChange, setFieldValue, handleBlur, values, validateForm }) => {
        return (
          <CustomKeyboardAvoidingScrollView keyboardVerticalOffset={100}>
            <View style={styles.container}>
              <CustomInputGroup
                name="name"
                placeholder="Enter beneficiary's Full Name"
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
                name="age"
                placeholder="Enter beneficiary's age"
                title="Age"
                onChangeText={(value) => {
                  if (value==" " || value=="") setFieldValue("age")
                  else if (!isNaN(value)) setFieldValue("age", + value)
                }}
                onBlur={handleBlur("age")}
                value={values.age}
                textContentType="number"
                messages={
                  customErrors.age
                    ? [
                        {
                          id: "age",
                          text: customErrors.age,
                        },
                      ]
                    : undefined
                }
                textTransformNormal
              />
              <CustomInputGroup
                name="relationshipWithTestator"
                placeholder="Enter beneficiary's relationship with testator"
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

              <View style={styles.buttonContainer}>
                <BlueButton
                  title={
                    Object.keys(initialValues).length
                      ? "Edit Beneficiary"
                      : "Add Beneficiary"
                  }
                  onPress={() => onSubmit({ values, validateForm })}
                />
              </View>
            </View>
          </CustomKeyboardAvoidingScrollView>
        );
      }}
    </Formik>
  );
};

export default WillBeneficiaryInfoForm;
