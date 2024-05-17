import { View, StyleSheet, Linking, Text } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../../../testApp/theme/ThemeProvider";
import CustomInputGroup from "../../../../testApp/components/Form/CustomInputGroup";
import WillFormContainer from "../../../../testApp/components/Will/WillFormContainer";
import { useSelector } from "react-redux";
import { getWill } from "../../../../testApp/redux/form/willFormSlice";
import {
  generateWordFileWillByHashUrl,
  useAddOrUpdateWillMutation,
  useGenerateWordFileHashMutation,
} from "../../../../testApp/redux/api/will/willApiSlice";
import CustomActivityIndicator from "../../../../testApp/components/Common/CustomActivityIndicator";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";

const WillSignScreen = () => {
  const {
    theme: { colors, spacing, fontSize, fontFamily },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      backgroundColor: colors.white100,
    },
    content: {
      paddingHorizontal: spacing.lg,
    },
    actionContainer: {
      flexDirection: "row",
      padding: spacing.lg,
      borderWidth: spacing.xxxs,
      borderColor: colors.black200,
      borderRadius: spacing.md,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: spacing.lg,
    },
    actionContainerSuccess: {
      backgroundColor: colors.green100,
      borderColor: colors.green600,
    },
    actionContainerError: {
      backgroundColor: colors.red100,
      borderColor: colors.red600,
    },
    action: {
      flexGrow: 1,
    },
    actionName: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
    },
    actionNameSuccess: {
      color: colors.green600,
    },
    actionNameError: {
      color: colors.red600,
    },
    actionError: {
      borderWidth: spacing.xxxs,
      borderRadius: spacing.md,
      borderColor: colors.red600,
      padding: spacing.lg,
      marginBottom: spacing.lg,
    },

    icon: {
      fontSize: fontSize.xl,
      color: colors.green600,
    },
    iconError: {
      fontSize: fontSize.xl,
      color: colors.red600,
    },

    errorText: {
      textAlign: "center",
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.red400,
    },
  });

  const will = useSelector((state) => getWill(state));

  const [addOrUpdateWill, addOrUpdateWillOptions] =
    useAddOrUpdateWillMutation();
  const [generateWordFileHash, generateWordFileHashOptions] =
    useGenerateWordFileHashMutation();

  const {
    isLoading: addOrUpdateWillLoading,
    isError: addOrUpdateWillIsError,
    error: addOrUpdateWillError,
    isSuccess: addOrUpdateWillIsSuccess,
  } = addOrUpdateWillOptions;

  const {
    isLoading: generateWordFileHashLoading,
    isError: generateWordFileHashIsError,
    error: generateWordFileHashError,
    isSuccess: generateWordFileHashIsSuccess,
  } = generateWordFileHashOptions;

  const router = useRouter();

  const pressHandler = () => {
    router.canGoBack() ? router.push("/will") : null;
  };

  const generateDownloadLink = async () => {
    try {
      const result = await generateWordFileHash().unwrap();

      if (result.data && result.status === 200) {
        Linking.openURL(
          generateWordFileWillByHashUrl.replace(":hashedWillId", result.data)
        ).finally(pressHandler);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addWillToDbAndGenerateWord = async (will) => {
    try {
      await addOrUpdateWill({
        ...will,
        selectedAssets: undefined,
      }).unwrap();

      await generateDownloadLink();
    } catch (error) {
      console.error(error);
    }
  };

  const [declarationInfo, setDeclarationInfo] = useState({
    declaration: "",
    place: "",
  });

  const submit = () => {

    console.log(JSON.stringify({
      ...will,
      residualDistribution: will.residualDistData.map((data) => ({
        _id: data.beneficiary._id,
        allocation: data.percent,
      })),
      secondaryDistribution: will.secondaryDistData.map((data) => ({
        _id: data.beneficiary._id,
        isAssignedToLinealDescendant: data.distType === 1,
        beneficiaryDistribution:
          data.distType !== 1
            ? data.distribution.map((distData) => ({
                _id: distData.beneficiary._id,
                allocation: distData.percent,
              }))
            : [],
      })),
      declarationInfo: {
        place: declarationInfo.place,
        declaration: declarationInfo.declaration,
      },
    }, null, 1));

    addWillToDbAndGenerateWord({
      ...will,
      residualDistribution: will.residualDistData.map((data) => ({
        _id: data.beneficiary._id,
        allocation: data.percent,
      })),
      secondaryDistribution: will.secondaryDistData.map((data) => ({
        _id: data.beneficiary._id,
        isAssignedToLinealDescendant: data.distType === 1,
        beneficiaryDistribution:
          data.distType !== 1
            ? data.distribution.map((distData) => ({
                _id: distData.beneficiary._id,
                allocation: distData.percent,
              }))
            : [],
      })),
      declarationInfo: {
        place: declarationInfo.place,
        declaration: declarationInfo.declaration,
      },
    });
  };

  return (
    <WillFormContainer
      nextDisabled={
        declarationInfo.place === "" ||
        declarationInfo.declaration.trim().toUpperCase() !== "YES"
      }
      Handler={submit}
    >
      <View style={styles.container}>
        <CustomInputGroup
          placeholder="Enter the place"
          title="Place"
          value={declarationInfo.place}
          onChangeText={(val) =>
            setDeclarationInfo({ ...declarationInfo, place: val })
          }
        />
        <CustomInputGroup
          placeholder="Enter your declaration"
          title='Type "YES" to agree with the below declaration'
          subTitle="I maintain good health and possess a sound mind. This Will is made by me of my own independent decision and free volition. I have not been influenced, cajoled, or coerced in any manner whatsoever."
          value={declarationInfo.declaration}
          onChangeText={(val) =>
            setDeclarationInfo({ ...declarationInfo, declaration: val })
          }
        />
      </View>

      <View style={styles.content}>
        <View
          style={[
            styles.actionContainer,
            addOrUpdateWillIsError && styles.actionContainerError,
            addOrUpdateWillIsSuccess && styles.actionContainerSuccess,
          ]}
        >
          <View style={styles.action}>
            <Text
              style={[
                styles.actionName,
                addOrUpdateWillIsError && styles.actionNameError,
                addOrUpdateWillIsSuccess && styles.actionNameSuccess,
              ]}
            >
              Saving will
            </Text>
          </View>
          <View>
            {addOrUpdateWillLoading ? (
              <CustomActivityIndicator />
            ) : addOrUpdateWillIsError ? (
              <FontAwesome
                name="close"
                size={styles.iconError.fontSize}
                color={styles.iconError.color}
              />
            ) : addOrUpdateWillIsSuccess ? (
              <FontAwesome
                name="check-circle"
                size={styles.icon.fontSize}
                color={styles.icon.color}
              />
            ) : null}
          </View>
        </View>

        <View
          style={[
            styles.actionContainer,
            generateWordFileHashIsError && styles.actionContainerError,
            generateWordFileHashIsSuccess && styles.actionContainerSuccess,
          ]}
        >
          <View style={styles.action}>
            <Text
              style={[
                styles.actionName,
                generateWordFileHashIsError && styles.actionNameError,
                generateWordFileHashIsSuccess && styles.actionNameSuccess,
              ]}
            >
              Generating will document
            </Text>
          </View>

          <View>
            {generateWordFileHashLoading ? (
              <CustomActivityIndicator />
            ) : generateWordFileHashIsError ? (
              <FontAwesome
                name="close"
                size={styles.iconError.fontSize}
                color={styles.iconError.color}
              />
            ) : generateWordFileHashIsSuccess ? (
              <FontAwesome
                name="check-circle"
                size={styles.icon.fontSize}
                color={styles.icon.color}
              />
            ) : null}
          </View>
        </View>

        {addOrUpdateWillIsError ? (
          <View style={styles.actionError}>
            <Text style={styles.actionNameError}>
              Saving will error : {addOrUpdateWillError.data.error?.message}
            </Text>
          </View>
        ) : null}

        {generateWordFileHashError ? (
          <View style={styles.actionError}>
            <Text style={styles.actionNameError}>
              Generating will document error :
              {generateWordFileHashError.data.error?.message}
            </Text>
          </View>
        ) : null}
      </View>
    </WillFormContainer>
  );
};

export default WillSignScreen;
