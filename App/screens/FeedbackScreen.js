import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BlueButton from "../components/Common/Button/BlueButton";
import { useTheme } from "../theme/ThemeProvider";
import CustomKeyboardAvoidingScrollView from "../components/Common/CustomKeyboardAvoidingScrollView";
import CustomInputGroup from "../components/Form/CustomInputGroup";
import { Formik } from "formik";
import { cleanObjectAndTrim } from "../utils/manipulators";
import { useAddFeedbackMutation } from "../services/api/feedbackApiSlice";

const FeedbackScreen = () => {
  const [globalErrorMessage, setGlobalErrorMessage] = useState("");
  const {
    theme: { spacing, colors, fontFamily, fontSize },
  } = useTheme();

  const [addFeedback, { isLoading }] = useAddFeedbackMutation();

  const pressHandler = async (values, resetForm) => {
    const cleanedValues = cleanObjectAndTrim({ ...values });

    if (!(cleanedValues.subject && cleanedValues.description)) {
      setGlobalErrorMessage("Missing entries");
      return;
    }

    try {
      await addFeedback({ ...cleanedValues });
      alert("Feedback added");
      resetForm();
      setGlobalErrorMessage("");
    } catch (error) {
      setGlobalErrorMessage(error?.data?.error?.message || error.message);
    }
  };

  const styles = StyleSheet.create({
    formContainer: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      backgroundColor: colors.white100,
    },
    container: {
      flex: 1,
      backgroundColor: colors.white100,
    },
    listContainer: {
      flex: 1,
      paddingTop: spacing.lg,
    },
    listHeader: {
      paddingTop: spacing.lg,
    },
    listContentContainer: {
      flexGrow: 1,
      paddingHorizontal: spacing.lg,
    },
    errorMessage: {
      marginTop: spacing.sm,
      marginHorizontal: spacing.xxs,
      fontSize: fontSize.sm,
      fontFamily: fontFamily.regular,
      color: colors.red,
      textAlign: "center",
    },
    footer: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
    },
  });

  return (
    <Formik
      initialValues={{
        subject: "",
        description: "",
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleChange, handleBlur, values, resetForm }) => {
        return (
          <CustomKeyboardAvoidingScrollView>
            <View style={styles.container}>
              <View style={styles.listContainer}>
                <View style={styles.formContainer}>
                  <CustomInputGroup
                    name="subject"
                    placeholder="Enter the subject"
                    title="Subject"
                    onChange={handleChange("subject")}
                    onBlur={handleBlur("subject")}
                    value={values.subject}
                    textTransformNormal
                  />

                  <CustomInputGroup
                    name="description"
                    placeholder="Enter the description"
                    title="Description"
                    onChange={handleChange("description")}
                    onBlur={handleBlur("description")}
                    value={values.description}
                    multiline
                    numberOfLines={10}
                    textTransformNormal
                  />
                </View>
              </View>
              <View style={styles.footer}>
                <BlueButton
                  title="Add"
                  isLoading={isLoading}
                  onPress={() => {
                    pressHandler(values, resetForm);
                  }}
                />
                {globalErrorMessage ? (
                  <Text style={styles.errorMessage}>{globalErrorMessage}</Text>
                ) : null}
              </View>
            </View>
          </CustomKeyboardAvoidingScrollView>
        );
      }}
    </Formik>
  );
};

export default FeedbackScreen;
