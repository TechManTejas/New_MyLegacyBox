import { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import CustomInputGroup from "../../Form/CustomInputGroup";
import {
  cleanObjectAndTrim,
  objectToDropDownLabelAndValues,
} from "../../../utils/manipulators";
import { useTheme } from "../../../theme/ThemeProvider";
import BlueButton from "../../Common/Button/BlueButton";
import { useNavigation } from "@react-navigation/native";
import CustomKeyboardAvoidingScrollView from "../../Common/CustomKeyboardAvoidingScrollView";
import { providentFundHoldingValidator } from "../../../utils/form/validators/providentFundHoldingValidator";
import { PROVIDENT_FUND_TYPE_TO_TITLE_MAP } from "../../../constants/financialHoldings/providentFundHolding";
import CustomDropDownInput from "../../Common/CustomDropDownInput";

const ProvidentFundHoldingForm = ({
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
      validationSchema={toFormikValidationSchema(providentFundHoldingValidator)}
      initialValues={{
        pfType: initialValues?.pfType || "",
        uan: initialValues?.uan || "",
        employerName: initialValues?.employerName || "",
        amount: initialValues?.amount || undefined,
        nominee: initialValues?.nominee || undefined
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleChange, handleBlur, setFieldValue, validateForm, values }) => {
        return (
          <CustomKeyboardAvoidingScrollView>
            <View style={styles.container}>
              <CustomInputGroup
                name="uan"
                placeholder="Enter your UAN"
                title="UAN"
                onChange={handleChange("uan")}
                onBlur={handleBlur("uan")}
                value={values.uan}
                messages={
                  customErrors.uan
                    ? [
                        {
                          id: "uan",
                          text: customErrors.uan,
                        },
                      ]
                    : undefined
                }
                textTransformNormal
              />

              <CustomInputGroup
                name="employerName"
                placeholder="Enter Employer name"
                title="Employer Name"
                onChange={handleChange("employerName")}
                onBlur={handleBlur("employerName")}
                value={values.employerName}
                messages={
                  customErrors.employerName
                    ? [
                        {
                          id: "employerName",
                          text: customErrors.employerName,
                        },
                      ]
                    : undefined
                }
              />

              <CustomDropDownInput
                title="Provident Fund Type"
                placeholder="Select type of PF"
                data={objectToDropDownLabelAndValues(
                  PROVIDENT_FUND_TYPE_TO_TITLE_MAP
                )}
                onChange={handleChange("pfType")}
                value={values.pfType}
                messages={
                  customErrors.pfType
                    ? [
                        {
                          id: "pfType",
                          text: customErrors.pfType,
                        },
                      ]
                    : undefined
                }
                showSelectedIcon
              />

              <CustomInputGroup
                name="nominee"
                placeholder="Enter Nominee"
                title="Nominee"
                optional
                onChange={handleChange("nominee")}
                onBlur={handleBlur("nominee")}
                value={values.nominee}
                messages={
                  customErrors.nominee
                    ? [
                        {
                          id: "nominee",
                          text: customErrors.nominee,
                        },
                      ]
                    : undefined
                }
              />

              <CustomInputGroup
                name="amount"
                placeholder="Enter the Amount"
                title="Amount (in Rs)"
                onChange={(value) => {
                  if (value == " " || value == "")
                    setFieldValue("amount", +value);
                  else if (!isNaN(value)) setFieldValue("amount", +value);
                }}
                onBlur={handleBlur("amount")}
                value={values.amount}
                messages={
                  customErrors.amount
                    ? [
                        {
                          id: "amount",
                          text: customErrors.amount,
                        },
                      ]
                    : undefined
                }
                optional
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

export default ProvidentFundHoldingForm;
