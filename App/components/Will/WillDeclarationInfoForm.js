import { View, StyleSheet, Text } from "react-native";
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
import { setDeclarationInfoRedux } from "../../services/willForm/willFormSlice";
import BlueButton from "../Common/Button/BlueButton";
import { willDeclarationInfoValidator } from "../../utils/form/validators/will/willDeclarationInfoValidator";
import { SCREEN_NAMES } from "../../constants/screenNames";

const WillDeclarationInfoForm = ({ initialValues, defaultBody }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [customErrors, setCustomErrors] = useState({});

  const { theme: { colors, spacing, fontSize, fontFamily } } = useTheme();

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

  const customErrorWithValidation = useCallback(({ values, errors }) => {
    let customErrors;
    let isValid;

    customErrors = { ...errors };
    isValid = !Boolean(Object.keys(customErrors).length);

    setCustomErrors(customErrors);

    return isValid;
  }, []);

  const onSubmit = useCallback(async ({ values, validateForm }) => {
    let validationErrors;

    try {
      validationErrors = await validateForm(values);
    } catch (error) {
      setGlobalErrorMessage(error.message);
    }

    const isValid = customErrorWithValidation({ values, errors: validationErrors })

    if (!isValid) return

    const cleanedValues = cleanObjectAndTrim({ ...values })

    try {
      dispatch(setDeclarationInfoRedux(cleanedValues))
      navigation.goBack()
    } 
    catch (error) {
      setGlobalErrorMessage(error?.data?.error?.message || error.message)
    }

  }, [])

  return (
    <Formik
      validationSchema={toFormikValidationSchema(willDeclarationInfoValidator)}
      initialValues={{
        place: initialValues?.place || "",
        declaration: initialValues?.declaration || "",
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleChange, handleBlur, values, validateForm }) => {
        return (
          <CustomKeyboardAvoidingScrollView keyboardVerticalOffset={100}>
            <View style={styles.container}>
              <CustomInputGroup
                name="place"
                placeholder="Enter the place"
                title="Place"
                onChange={handleChange("place")}
                onBlur={handleBlur("place")}
                value={values.place}
                messages={
                  customErrors.place
                    ? [{ id: "place", text: customErrors.place }]
                    : undefined
                }
                textTransformNormal
              />
              <CustomInputGroup
                name="declaration"
                placeholder="Enter your declaration"
                title='Type "YES" to agree with the below declaration'
                subTitle="I maintain good health and possess a sound mind. This Will is made by me of my own independent decision and free volition. I have not been influenced, cajoled, or coerced in any manner whatsoever."
                onChange={handleChange("declaration")}
                onBlur={handleBlur("declaration")}
                value={values.declaration}
                messages={
                  customErrors.declaration
                    ? [
                        {
                          id: "declaration",
                          text: customErrors.declaration,
                        },
                      ]
                    : undefined
                }
                textTransformNormal
              />

              <View style={styles.buttonContainer}>
                <BlueButton
                  title="Done"
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

export default WillDeclarationInfoForm;
