import { View, Text, StyleSheet } from "react-native";
import React, { useState, useCallback, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../theme/ThemeProvider";
import { willAssetInfoValidator } from "../../utils/form/validators/will/willAssetInfoValidator";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import CustomKeyboardAvoidingScrollView from "../Common/CustomKeyboardAvoidingScrollView";
import CustomInputGroup from "../Form/CustomInputGroup";
import { SCREEN_NAMES } from "../../constants/screenNames";
import WillFormContainer from "./WillFormContainer";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedAssetsEntitiesSelector, setAssetRedux } from "../../services/willForm/willFormSlice";

const WillAssetInfoForm = ({ initialValues, sectionTitles }) => {
  const navigation = useNavigation();
  const [customErrors, setCustomErrors] = useState({});
  const [globalErrorMessage, setGlobalErrorMessage] = useState("");
  const formRef = useRef();

  const selectedAssetsEntities = useSelector((state) => getSelectedAssetsEntitiesSelector(state));

  const dispatch = useDispatch();

  const { theme: { colors, spacing, fontSize, fontFamily } } = useTheme()

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
    sectionDevider: {
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
    sectionAllocationTitleContainer: {
      marginBottom: spacing.sm,
    },
    sectionAllocationTitle: {
      fontFamily: fontFamily.semiBold,
      lineHeight: fontSize.xl,
      paddingBottom: spacing.xs,
      color: colors.blue400,
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
    sectionErrorMessage: {
      marginTop: spacing.xxs,
      marginHorizontal: spacing.xxs,
      fontSize: fontSize.sm,
      fontFamily: fontFamily.regular,
      color: colors.red,
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

    setGlobalErrorMessage("");

    try {
      validationErrors = await validateForm(values);
    } 
    catch (error) {
      setGlobalErrorMessage(error.message);
    }

    const isValid = customErrorWithValidation({ values, errors: validationErrors });

    if (!isValid) return;

    const allocationValues = Object.values(selectedAssetsEntities).map((asset) => ({ ...asset, allocations: values[asset._id] }));

    dispatch(setAssetRedux(allocationValues));

    navigation.navigate(SCREEN_NAMES.willInfoScreen)

  }, []);

  return (
    <WillFormContainer
      Handler={() =>
        onSubmit({
          values: formRef.current.values,
          validateForm: formRef.current.validateForm,
        })
      }
    >
      <Formik
        validationSchema={toFormikValidationSchema(willAssetInfoValidator)}
        initialValues={initialValues}
        innerRef={formRef}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ setFieldValue, handleBlur, values }) => {
          return (
            <CustomKeyboardAvoidingScrollView keyboardVerticalOffset={100}>
              <View style={styles.container}>
                {Object.entries(sectionTitles).map(([k, v]) => (
                  <React.Fragment key={`allocation-section-${k}`}>
                    <View style={styles.sectionTitleContainer}>
                      <Text style={styles.sectionTitle}>{k} allocation</Text>
                    </View>
                    {v.map(({ id, title }) => (
                      <View key={`allocation-section-${id}`}>
                        <View style={styles.sectionAllocationTitleContainer}>
                          <Text style={styles.sectionAllocationTitle}>
                            {title}
                          </Text>
                          {customErrors[id] &&
                          typeof customErrors[id] === "string" ? (
                            <Text style={styles.sectionErrorMessage}>
                              {customErrors[id]}
                            </Text>
                          ) : null}
                        </View>
                        {Object.entries(initialValues[id]).map(
                          ([name, allocation]) => (
                            <CustomInputGroup
                              key={`allocation-input-${id}-${name}`}
                              name={`${id}.${name}`}
                              placeholder={`Enter allocation for ${name}`}
                              title={`${name}'s allocation`}
                              onChange={(value) => {
                                const stringValue = String(value);

                                if (
                                  !value ||
                                  stringValue.charAt(stringValue.length - 1) ===
                                    "."
                                ) {
                                  setFieldValue(`${id}.${name}`, value);
                                } else {
                                  setFieldValue(`${id}.${name}`, +value);
                                }
                              }}
                              onBlur={handleBlur(`${id}.${name}`)}
                              value={values[id][name]}
                              keyboardType="numeric"
                              messages={
                                customErrors[id] && customErrors[id][name]
                                  ? [
                                      {
                                        id: "name",
                                        text: customErrors[id][name],
                                      },
                                    ]
                                  : undefined
                              }
                            />
                          )
                        )}

                        <View style={styles.sectionDevider}></View>
                      </View>
                    ))}
                  </React.Fragment>
                ))}
                {globalErrorMessage ? (
                  <Text style={styles.errorMessage}>{globalErrorMessage}</Text>
                ) : null}
              </View>
            </CustomKeyboardAvoidingScrollView>
          );
        }}
      </Formik>
    </WillFormContainer>
  );
};

export default WillAssetInfoForm;
