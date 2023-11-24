import { View, StyleSheet, Linking, Text } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import CustomInputGroup from "../../components/Form/CustomInputGroup";
import WillFormContainer from "../../components/Will/WillFormContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getDeclarationSelector,
  getWill,
  setDeclarationInfoRedux,
} from "../../redux/form/willFormSlice";
import { useNavigation } from "@react-navigation/native";
import {
  generateWordFileWillByHashUrl,
  useAddOrUpdateWillMutation,
  useGenerateWordFileHashMutation,
} from "../../redux/api/will/willApiSlice";
import CustomActivityIndicator from "../../components/Common/CustomActivityIndicator";
import FontAwesome from "@expo/vector-icons/FontAwesome";

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

  const navigation = useNavigation();

  const pressHandler = () => {
    navigation.canGoBack() ? navigation.popToTop() : null;
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
      console.log(error);
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
      console.log(error);
    }
  };

  const [declarationInfo, setDeclarationInfo] = useState({
    declaration: "",
    place: "",
  });

  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const submit = () => {
    if (declarationInfo.declaration.trim().toUpperCase() === "YES") {
      dispatch(setDeclarationInfoRedux(declarationInfo));
    } else {
      setError(true);
    }
  };

  const gdi = useSelector((state) => getDeclarationSelector(state));

  const initRender = useRef(true);

  useEffect(() => {
    if (initRender.current) initRender.current = false;
    else
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
      });
  }, [gdi.declaration]);

  return (
    <WillFormContainer Handler={submit}>
      {error && (
        <View>
          <Text style={styles.errorText}>invalid inputs</Text>
        </View>
      )}
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
